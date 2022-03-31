import { render, within } from '@testing-library/react';

import Dashboard from './dashboard';

describe('Dashboard', () => {
    
    test('Check the header', () => {
        const { getByRole } = render(<Dashboard></Dashboard>);
        const { getByText } = within(getByRole("heading", { level: 1 }));    
        expect(getByText('Trustworthy AI')).toBeInTheDocument();
    });
});