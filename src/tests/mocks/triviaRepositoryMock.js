import { HttpResponse } from '../../app/Http/httpResponse';
import { categoriesMock } from './categories';
import { getQuestions } from './questions';

export class TriviaRepositoryMock {
    async listCategories() {
        return new HttpResponse(categoriesMock, true);
    }

    async createToken() {
        return new HttpResponse('token', true);
    }

    async questions({ difficulty }) {
        const questions = getQuestions();
        return new HttpResponse(questions[difficulty], true);
    }
}