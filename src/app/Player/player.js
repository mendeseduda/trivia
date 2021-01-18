import { capitalize } from '../Util/capitalize';

export class Player {
    constructor(sessionToken) {
        this.sessionToken = sessionToken;
        this.score = {
            easy: {
                correct: 0,
                answered: 0
            },
            medium: {
                correct: 0,
                answered: 0
            },
            hard: {
                correct: 0,
                answered: 0
            }
        };
    }

    static findByCategoryId(id) {
        const trivia = JSON.parse(localStorage.getItem('trivia')) || {};

        if (trivia[id] == null) {
            return null;
        }

        const player = new Player(trivia[id].sessionToken);
        player.score = trivia[id].score;
        return player;
    }

    getOverview() {
        return {
            correct: Object.values(this.score).reduce((total, current) => total + current.correct, 0),
            wrong: Object.values(this.score).reduce((total, current) => total + current.answered - current.correct, 0)
        };
    }

    getFullScore() {
        return Object.entries(this.score).map(([key, value]) => ({
            difficulty: capitalize(key),
            correct: value.correct,
            wrong: value.answered - value.correct
        }));
    }

    save(category) {
        const trivia = JSON.parse(localStorage.getItem('trivia')) || {};

        trivia[category.id] = this;

        localStorage.setItem('trivia', JSON.stringify(trivia));
    }
}