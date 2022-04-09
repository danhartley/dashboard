import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('The app', () => {

    test('has a title', () => {
        render(<App />);
        const title = screen.getByText(/Trustworthy AI/i);
        expect(title).toBeInTheDocument();
      });
});
