import { getRandomInt } from '../Util/getRandomInt';

export class TriviaManager {
    constructor(triviaRepository) {
        this.triviaRepository = triviaRepository;
        this.hasStarted = false;
    }

    start(category, player) {
        this.currentCategory = category;
        this.player = player;
        this.currentQuestion = null;
        this.questionsHistory = [];
        this.questionsCache = [];
        this.questionNumber = 1;
        this.currentDifficulty = difficulties.MEDIUM;
        this.hasStarted = true;
    }

    answerCurrentQuestion(answer) {
        if (this.currentQuestion == null) {
            return;
        }

        const difficulty = this.currentQuestion.difficulty;
        this.player.score[difficulty].answered++;
        this.questionNumber++;

        if (answer.isCorrect) {
            this.currentQuestion.answeredCorrectly = true;
            this.player.score[difficulty].correct++;
        }

        if (this.shouldUpdateDifficulty()) {
            answer.isCorrect ? this.increaseDifficulty() : this.decreaseDifficulty();
        }

        this.questionsHistory.push(this.currentQuestion);
    }

    async loadNewQuestion() {
        const difficulty = difficultiesList[this.currentDifficulty];

        const index = this.questionsCache.findIndex(item => item.difficulty === difficulty);
        if (index !== -1) {
            const question = this.questionsCache.splice(index, 1)[0];
            return this.currentQuestion = createQuestion(question);
        }

        const response = await this.triviaRepository.questions({
            amount: 5,
            category: this.currentCategory.id,
            difficulty: difficulty,
            token: this.player.sessionToken
        });

        if (response.isSuccess) {
            const newQuestions = response.data.results;
            this.currentQuestion = createQuestion(newQuestions.shift());
            this.questionsCache.push(...newQuestions);
        }
        return this.currentQuestion;
    }

    increaseDifficulty() {
        if (this.currentDifficulty + 1 <= difficulties.HARD) {
            this.currentDifficulty++;
        }
    }

    decreaseDifficulty() {
        if (this.currentDifficulty - 1 >= difficulties.EASY) {
            this.currentDifficulty--;
        }
    }

    shouldUpdateDifficulty() {
        if (!this.currentQuestion || this.questionsHistory.length == 0) {
            return false;
        }

        const lastQuestion = this.questionsHistory[this.questionsHistory.length - 1];
        return this.currentQuestion.answeredCorrectly === lastQuestion.answeredCorrectly &&
            this.currentQuestion.difficulty === lastQuestion.difficulty;
    }
}

export function createQuestion(question) {
    const corrrectAnswerIndex = getRandomInt(0, question['incorrect_answers'].length + 1);
    const answers = question['incorrect_answers'].map(answer => ({ answer, isCorrect: false }));
    answers.splice(corrrectAnswerIndex, 0, { answer: question['correct_answer'], isCorrect: true });
    return {
        answeredCorrectly: false,
        category: question.category,
        difficulty: question.difficulty,
        answers,
        question: question.question
    };
}

export const difficultiesList = ['easy', 'medium', 'hard'];
export const difficulties = {
    EASY: 0,
    MEDIUM: 1,
    HARD: 2
};