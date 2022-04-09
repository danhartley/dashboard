import { total } from 'src/components/dashboard/shared/utils';

describe('Total reducer', () => {
    
    const table = [
        [1,2,3,4,5,15],
        [6,7,8,9,10,40],
        [11,12,13,14,15,65]
    ];
    
    test.each(table)('total([%i,%i,%i,%i,%i],0) = %i', (a, b, c, d, e, expected) => {
        const reduced = [a, b, c, d, e].reduce(total, 0);
        expect(reduced).toBe(expected);
    });
});