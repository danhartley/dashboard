import ReactDOM from 'react-dom/client';
import { render, within, screen } from '@testing-library/react';
import { act } from "react-dom/test-utils";
import { mocked } from 'jest-mock';
import { useFeatures } from './tables/useFeatures';

import Dashboard from './dashboard';

jest.mock('./tables/dashboard-features', () => ({}) => <>{<span>DashboardFeaturesTable</span>}</>);
jest.mock('./tables/dashboard-values', () => ({}) => <>{<span>DashboardValuesTable</span>}</>);

// jest.mock("./tables/useFeatures", () => ({
//     useFeatures: jest.fn().mockImplementation(() => Promise.resolve({data: []}))
// }));

describe('Dashboard', () => {

    beforeEach(() => {
        jest.resetModules();
    });

    test('Check the Dashboard H1 header text', () => {
        const { getByRole } = render(<Dashboard></Dashboard>);
        const { getByText } = within(getByRole("heading", { level: 1 })); 
        expect(getByText('Trustworthy AI')).toBeInTheDocument();
    });

    test('Check for tables', () => {
        const { getByText } = render(<Dashboard></Dashboard>);
        expect(getByText('DashboardFeaturesTable')).toBeInTheDocument();
        expect(getByText('DashboardValuesTable')).toBeInTheDocument();
    });
});