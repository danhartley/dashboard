import { total } from "src/screens/dashboard/shared/utils";
import {
  getSnapshotsWithTotals,
  sortBy,
} from "src/screens/dashboard/shared/utils";
import { IItem } from "src/screens/dashboard/shared/interfaces";

import db from "src/mocks/db.json";

const snapshots = db.snapshots;

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

describe("Add totals to pledges", () => {
  test("should add counts for honouring and breaking pledges", () => {
    const snapshot = snapshots[0];
    const snapShotWithTotals = getSnapshotsWithTotals(snapshot)
      .items[0] as IItem;
    expect(snapShotWithTotals.honouring).toBe(1);
    expect(snapShotWithTotals.breaking).toBe(2);
  });
});

describe("Sort array by property", () => {
  const items = [
    {
      a: 1,
      b: 2,
      c: 3,
    },
    {
      a: 12,
      b: 5,
      c: 9,
    },
    {
      a: 112,
      b: 5,
      c: 9,
    },
  ];
  test("returns objects ordered by a field descending", () => {
    expect(sortBy(items, "a", "desc")[0].a).toBe(112);
  });
});
