import { total } from "src/screens/dashboard/shared/utils";
import { getSnapshotsWithTotals } from 'src/screens/dashboard/shared/utils';
import { IItem } from 'src/screens/dashboard/shared/interfaces';
 
import snapshots from 'src/mocks/snapshots.json';

describe("Total reducer", () => {
  const table = [
    [1, 2, 3, 4, 5, 15],
    [6, 7, 8, 9, 10, 40],
    [11, 12, 13, 14, 15, 65],
  ];

  test.each(table)(
    "total([%i,%i,%i,%i,%i],0) = %i",
    (a, b, c, d, e, expected) => {
      const reduced = [a, b, c, d, e].reduce(total, 0);
      expect(reduced).toBe(expected);
    }
  );
});

describe('Add totals to pledges', () => {
  test("should add counts for honoured and broken pledges", () => {
    const snapshot = snapshots[0];
    const snapShotWithTotals = getSnapshotsWithTotals(snapshot).items[0] as IItem;
    expect(snapShotWithTotals.honoured).toBe(1);
    expect(snapShotWithTotals.broken).toBe(2);
  });
  test.todo("show values");
});
