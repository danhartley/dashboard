import React from 'react';
import { render, screen } from '@testing-library/react';

import Simple from './simple';

jest.mock('./simple-child', () => ({}) => <>{<span>I mock you not. I do, says Mocking Child.</span>}</>);

describe('Simple', () => {

    test('Check Simple message', () => {
        const { getByText } = render(<Simple></Simple>);
        expect(getByText('Hello from Simple!')).toBeInTheDocument();
    });

    test('Test for mocked Sinple Child message', () => {
        const { getByText } = render(<Simple></Simple>);
        expect(getByText('I mock you not. I do, says Mocking Child.')).toBeInTheDocument();
    });
});