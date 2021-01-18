import { createQuestion } from '../../app/Trivia/triviaManager';

export class TriviaManagerMock {
    constructor(triviaRepository) {
        this.triviaRepository = triviaRepository;
        this.hasStarted = false;
        this.questionNumber = 1;
        this.player;
    }

    start() {
        this.hasStarted = true;
    }

    async loadNewQuestion() {
        return createQuestion({ 'category': 'Entertainment: Video Games', 'type': 'multiple', 'difficulty': 'medium', 'question': 'The mobile game &quot;Jetpack Joyride&quot; was released in what year? ', 'correct_answer': '2011', 'incorrect_answers': ['2012', '2009', '2014'] });
    }

    answerCurrentQuestion() {
        return;
    }
}