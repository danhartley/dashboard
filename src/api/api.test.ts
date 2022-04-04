import api from './api';

describe.skip('Test api', () => {
    test('Returns data', async () => {
        const data = await api.getData("23 Jan 2022");
        expect(data).toEqual({})
        expect(1).toBe(1);
    });
});