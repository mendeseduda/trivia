import { HttpResponse } from '../Http/httpResponse';

export class TriviaRepository {
    constructor() {
        this.request = async (path) => await request('https://opentdb.com/' + path);
    }

    async listCategories() {
        const response = await this.request('api_category.php');
        response.isSuccess = response.data['trivia_categories'] != null;
        return response;
    }

    async questions({ amount, category, difficulty }) {
        const path = `api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`;
        return await this.request(path);
    }

    async createToken() {
        return await this.request('api_token.php?command=request');
    }

    async resetToken(token) {
        return await this.request('api_token.php?command=reset&token=' + token);
    }
}

async function request(path) {
    try {
        const response = await fetch(path);
        const data = await response.json();
        const isSuccess = data.response_code == null ? false : data.response_code === 0;

        return new HttpResponse(data, isSuccess);
    } catch (ex) {
        return new HttpResponse(ex);
    }
}
