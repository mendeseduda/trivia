import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { TriviaManagerMock } from '../../tests/mocks/triviaManagerMock';
import { TriviaRepositoryMock } from '../../tests/mocks/triviaRepositoryMock';
import * as AppContext from '../App.context';
import { Home } from './Home';



describe('Home', () => {
    test('renders categories', async () => {
        const triviaRepositoryMock = new TriviaRepositoryMock();
        const triviaManager = new TriviaManagerMock(triviaRepositoryMock);
        jest
            .spyOn(AppContext, 'useTriviaContext')
            .mockImplementation(() => triviaManager);
        await act(async () => {
            render(<Home></Home>);
        });

        const categories = await screen.queryAllByRole('category');
        expect(categories.length).toBeGreaterThan(0);
    });

    test('start trivia on category selection', async () => {
        const triviaRepositoryMock = new TriviaRepositoryMock();
        const triviaManager = new TriviaManagerMock(triviaRepositoryMock);
        jest
            .spyOn(AppContext, 'useTriviaContext')
            .mockImplementation(() => triviaManager);

        jest
            .spyOn(AppContext, 'useHistory')
            .mockImplementation(() => ({ push() { return; } }));

        await act(async () => {
            render(<Home></Home>);
        });
        fireEvent.click(screen.queryAllByRole('category')[0]);
        setInterval(() => {
            expect(triviaManager.hasStarted).toBe(true);
        }, 0);
    });
});