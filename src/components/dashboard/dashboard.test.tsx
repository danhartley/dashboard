import { render, within } from '@testing-library/react';

import Dashboard from './dashboard';

jest.mock('./tables/dashboard-features', () => ({}) => <>{<div>DashboardFeaturesTable</div>}</>);
jest.mock('./tables/dashboard-values', () => ({}) => <>{<div>DashboardValuesTable</div>}</>);

describe('The dashboard', () => {

    test('has an H1 header text', () => {
        const { getByRole } = render(<Dashboard></Dashboard>);
        const { getByText } = within(getByRole("heading", { level: 1 }));
        expect(getByText('Trustworthy AI')).toBeInTheDocument();
    });

    test('and two tables', () => {
        const { getByText } = render(<Dashboard></Dashboard>);
        expect(getByText('DashboardFeaturesTable')).toBeInTheDocument();
        expect(getByText('DashboardValuesTable')).toBeInTheDocument();
    });
});