import { TitleManager } from './HeaderBar/titleManager';
import { TriviaRepository } from './Consumers/triviaRepository';
import React, { useContext } from 'react';
import { TriviaManager } from './Trivia/triviaManager';
import { useHistory as useRouteHistory} from 'react-router-dom';

export const TitleContext = React.createContext(new TitleManager());

export const triviaRepository = new TriviaRepository();
export const TriviaContext = React.createContext(new TriviaManager(triviaRepository));

export const useTitleContext = () => useContext(TitleContext);
export const useTriviaContext = () => useContext(TriviaContext);
export const useHistory = () => useRouteHistory();