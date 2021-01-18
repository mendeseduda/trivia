import { Player } from '../app/Player/player';
import { difficulties, TriviaManager } from '../app/Trivia/triviaManager';
import { categoriesMock } from './mocks/categories';
import { TriviaRepositoryMock } from './mocks/triviaRepositoryMock';

let triviaRepository;
let triviaManager;
let player;
describe('trivia manager', () => {
    beforeEach(() => {
        triviaRepository = new TriviaRepositoryMock();
        triviaManager = new TriviaManager(triviaRepository);
        player = new Player('token');
        triviaManager.start(categoriesMock['trivia_categories'][0], player);
    });

    test('increases player score on correct answer', async () => {
        const question = await triviaManager.loadNewQuestion();
        const correctAnswer = question.answers.find(answer => answer.isCorrect);
        triviaManager.answerCurrentQuestion(correctAnswer);

        expect(player.score.medium.correct).toBe(1);
        expect(player.score.medium.answered).toBe(1);
    });

    test('increases difficulty after two succesfull answers', async () => {
        for (let i = 0; i < 2; i++) {
            const question = await triviaManager.loadNewQuestion();
            const correctAnswer = question.answers.find(answer => answer.isCorrect);
            triviaManager.answerCurrentQuestion(correctAnswer);
        }

        expect(triviaManager.currentDifficulty).toBe(difficulties.HARD);
    });

    test('decreases difficulty after two wrong answers', async () => {
        for (let i = 0; i < 2; i++) {
            const question = await triviaManager.loadNewQuestion();
            const correctAnswer = question.answers.find(answer => !answer.isCorrect);
            triviaManager.answerCurrentQuestion(correctAnswer);
        }

        expect(triviaManager.currentDifficulty).toBe(difficulties.EASY);
    });
});