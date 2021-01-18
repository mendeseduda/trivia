import { act, render, screen } from '@testing-library/react';
import React from 'react';
import * as AppContext from '../App.context';
import { HeaderBar } from './HeaderBar';
import { TitleManager } from './titleManager';

describe('HeaderBar', () => {
    test('update title', async () => {
        const titleManager = new TitleManager();

        jest
            .spyOn(AppContext, 'useTitleContext')
            .mockImplementation(() => titleManager);

        await act(async () => {
            render(<HeaderBar></HeaderBar>);
            titleManager.setTitle('Test');
        });

        setInterval(() => {
            expect(screen.getByText('Test')).toBeInTheDocument();
        }, 0);
    });
});