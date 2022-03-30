import React from 'react';
import { render, screen } from '@testing-library/react';

import Simple from './simple';

describe('simple test', () => {

    test('does', () => {
        const { container } = render(<Simple></Simple>);
    });
});