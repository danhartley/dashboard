import {
  total,
  getSnapshotsWithTotals,
  sortBy,
  getPledgesWithChecklists,
  transformSourceName,
} from "src/shared/utils";
import { IItem } from "src/shared/interfaces";

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
  test.todo("use table for multiple tests");
});

describe("Pledges with checklists", () => {
  test("Should return only pledges that have a checkist", () => {
    const pledges = [
      {
        name: "We pledge to work in ways that are transparent.",
        honouring: 1,
        breaking: 0,
      },
      {
        name: "We pledge to explain the methodologies we use.",
        honouring: 1,
        breaking: 0,
        checklist: [
          {
            id: 1,
            check: "Explain each methodology in detail on the website.",
            checked: true,
          },
          {
            id: 1,
            check: "Create a unique URL for each methodology.",
            checked: true,
          },
          {
            id: 1,
            check: "Link to supporting evidence.",
            checked: true,
          },
        ],
      },
      {
        name: "We pledge to provide tools for members to independently verify the impact of the projects they invest in.",
        honouring: 1,
        breaking: 0,
      },
    ];

    const snapshot = {
      id: 1,
      source: "natural-climate-solutions",
      snapshotId: 1,
      items: [
        {
          id: 1,
          pledges: pledges,
        },
      ],
    };

    expect(getPledgesWithChecklists(snapshot).length).toBe(1);
    expect(getPledgesWithChecklists(snapshot)[0].source).toBe(
      "natural-climate-solutions"
    );
  });
});

describe("Capitalise text", () => {
  test("should transform string", () => {
    expect(transformSourceName(null)).toBe("");
    expect(transformSourceName("")).toBe("");
    expect(transformSourceName("natural-climate-solutions")).toBe(
      "Natural Climate Solutions"
    );
    expect(transformSourceName("RTW")).toBe("RTW");
  });
});
