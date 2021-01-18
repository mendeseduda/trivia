import React from 'react';
import { act, render } from '@testing-library/react';
import { TriviaManagerMock } from '../../tests/mocks/triviaManagerMock';
import { TriviaRepositoryMock } from '../../tests/mocks/triviaRepositoryMock';
import * as AppContext from '../App.context';
import { Overview } from './Overview';
import { Player } from '../Player/player';

describe('Overview', () => {
    test('player score is save on mount', async () => {
        const triviaRepositoryMock = new TriviaRepositoryMock();
        const triviaManager = new TriviaManagerMock(triviaRepositoryMock);
        const player = new Player('token');
        triviaManager.player = player;

        jest
            .spyOn(AppContext, 'useTriviaContext')
            .mockImplementation(() => triviaManager);

        jest
            .spyOn(AppContext, 'useHistory')
            .mockImplementation(() => ({ push() { return; } }));

        const saveMethod = jest.spyOn(player, 'save').mock;

        await act(async () => {
            render(<Overview></Overview>);
        });

        setInterval(() => {
            expect(saveMethod.calls.length).toBe(1);
        }, 0);
    });
});