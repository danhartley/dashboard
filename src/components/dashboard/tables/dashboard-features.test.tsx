import { render, screen } from '@testing-library/react';

import { DashboardFeaturesTable } from './dashboard-features';

describe('DashboardFeaturesTable', () => {

    test("Should return null when there is no data", () => {
        render(<DashboardFeaturesTable data={null}></DashboardFeaturesTable>);
        expect(screen.getByText('No data!')).toBeTruthy();
    });
});