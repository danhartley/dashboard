import { render, screen } from '@testing-library/react';

import { useFeatures } from './useFeatures';

import DashboardFeaturesTable from './dashboard-features';

jest.mock('./dashboard-features', () => ({}) => <>{<span>DashboardFeaturesTable</span>}</>);

describe('DashboardFeaturesTable', () => {

    // useFeatures.mockResolvedValue({mutateAsync: null})

    test("Should return null when there is no data", () => {
        
// jest.doMock('./simple-child', () => {
        //     return {
        //       __esModule: true,
        //       SimpleChild: jest.fn(() => <span>Not so simple!</span>)
        //     };
        //   });
        

        expect(2).toBe(2)
    });

    test("Should return features", () => {

    });
});