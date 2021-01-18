import { Home } from './Home/Home';
import { Trivia } from './Trivia/Trivia';
import { Overview } from './Overview/Overview';

export const routes = {
    overview: {
        path: '/overview',
        component: Overview
    },
    trivia: {
        path: '/trivia',
        component: Trivia
    },
    home: {
        path: '/',
        component: Home
    }
};