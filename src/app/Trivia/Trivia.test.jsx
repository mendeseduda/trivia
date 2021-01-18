import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import * as AppContext from '../App.context';
import { Trivia } from './Trivia';
import { TriviaRepositoryMock } from '../../tests/mocks/triviaRepositoryMock';
import { TriviaManagerMock } from '../../tests/mocks/triviaManagerMock';

describe('Trivia', () => {
    test('load question on mount', async () => {
        const triviaRepositoryMock = new TriviaRepositoryMock();
        const triviaManager = new TriviaManagerMock(triviaRepositoryMock);

        jest
            .spyOn(AppContext, 'useTriviaContext')
            .mockImplementation(() => triviaManager);
        jest
            .spyOn(AppContext, 'useHistory')
            .mockImplementation(() => ({ push() { return; } }));

        triviaManager.hasStarted = true;
        await act(async () => {
            render(<Trivia></Trivia>);
        });

        const options = screen.queryAllByRole('option');
        expect(options.length).toBe(4);
    });

    test('call trivia manager answer on option click', async () => {
        const triviaRepositoryMock = new TriviaRepositoryMock();
        const triviaManager = new TriviaManagerMock(triviaRepositoryMock);

        jest
            .spyOn(AppContext, 'useTriviaContext')
            .mockImplementation(() => triviaManager);
        jest
            .spyOn(AppContext, 'useHistory')
            .mockImplementation(() => ({ push() { return; } }));

        triviaManager.hasStarted = true;
        await act(async () => {
            render(<Trivia></Trivia>);
        });

        fireEvent.click(screen.queryAllByRole('option')[0]);

        setInterval(() => {
            expect(triviaManager.answerCurrentQuestion).toBeCalled();
        }, 0);
    });
});