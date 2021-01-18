import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders App', async () => {
    render(<App />);
    const app = await screen.getByRole('app');
    expect(app).toBeInTheDocument();
});
