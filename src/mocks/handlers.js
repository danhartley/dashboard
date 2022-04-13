import { rest } from "msw";
import { getSnapshotsWithTotals, getValuesWithTotals } from 'src/screens/dashboard/shared/utils';

import snapshots from './snapshots.json';

export const handlers = [

  rest.get("snapshots.json", async (req, res, ctx) => {
    return res(
      ctx.json(snapshots)
    );
  }),
  rest.get("snapshots/1.json", async (req, res, ctx) => {
    return res(
      ctx.json([
        { ...getSnapshotsWithTotals(snapshots.find(s => s.id === 1)) }
      ])
    );
  }),
  rest.get("snapshots/2.json", async (req, res, ctx) => {
    return res(
      ctx.json([
        { ...getSnapshotsWithTotals(snapshots.find(s => s.id === 2)) }
      ])
    );
  }),
  rest.get("snapshots/3.json", async (req, res, ctx) => {
    return res(
      ctx.json([
        { ...getSnapshotsWithTotals(snapshots.find(s => s.id === 3)) }
      ])
    );
  }),
  rest.get("snapshots/500.json", async (req, res, ctx) => {
    return res(
      ctx.status(500),
      ctx.json({
        snapshots: `500 error`,
      })
    );
  }),
  rest.get("snapshots/0.json", async (req, res, ctx) => {
    console.log("handler for 0 snapshot");
    return res(
      ctx.status(200),
      ctx.json({
        snapshots: null,
      })
    );
  }),
  rest.get("values.json", async (req, res, ctx) => {
    return res(
      ctx.json({
        source: "Facebook",
        items: [
          {
            name: "Responsibility",
          },
          {
            name: "Safety",
          },
          {
            name: "Trust",
          },
          {
            name: "Transparency",
          },
          {
            name: "Fairness",
          },
          {
            name: "Sustainability",
          },
          {
            name: "Accountability",
            comments:
              "Including auditability, minimisation and reporting of negative impact, trade-offs and redress.",
          },
        ],
      })
    );
  }),
  rest.get("values/1.json", async (req, res, ctx) => {
    return res(
      ctx.json(
        { ...getValuesWithTotals(snapshots.find(s => s.id === 1)) }
      )
    );
  }),
  rest.get("values/2.json", async (req, res, ctx) => {
    return res(
      ctx.json(
        { ...getValuesWithTotals(snapshots.find(s => s.id === 2)) }
      )
    );
  }),
  rest.get("manifest.json", (req, res, ctx) => {
    return res(
      ctx.json(
        { ...getValuesWithTotals(snapshots.find(s => s.id === 3)) }
      )
    );
  }),
];
