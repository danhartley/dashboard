import { rest } from "msw";
import {
  getSnapshotsWithTotals,
  getValuesWithTotals,
  getSummary
} from "src/screens/dashboard/shared/utils";

import db from "./db.json";

const snapshots = db.snapshots;

export const handlers = [
  rest.get("snapshots", async (req, res, ctx) => {
    return res(ctx.json(snapshots));
  }),
  rest.get("snapshots/summary", async (req, res, ctx) => {
    return res(ctx.json(db.summary));    
  }),
  rest.get("snapshots/RTW/1", async (req, res, ctx) => {
    return res(
      ctx.json({ ...getSnapshotsWithTotals(snapshots.find((s) => s.id === 1)) })
    );
  }),
  rest.get("snapshots/RTW/2", async (req, res, ctx) => {
    return res(
      ctx.json({ ...getSnapshotsWithTotals(snapshots.find((s) => s.id === 2)) })
    );
  }),
  rest.get("snapshots/RTW/3", async (req, res, ctx) => {
    return res(
      ctx.json({ ...getSnapshotsWithTotals(snapshots.find((s) => s.id === 3)) })
    );
  }),
  rest.get("snapshots/MossyEarth/1", async (req, res, ctx) => {
    return res(
      ctx.json({
        ...getSnapshotsWithTotals(snapshots.find((s) => s.id === 10)),
      })
    );
  }),
  rest.get("snapshots/500", async (req, res, ctx) => {
    return res(
      ctx.status(500),
      ctx.json({
        snapshots: `500 error`,
      })
    );
  }),
  rest.get("snapshots/0", async (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        snapshots: null,
      })
    );
  }),
  rest.get("manifest.json", (req, res, ctx) => {
    return res(
      ctx.json({ ...getValuesWithTotals(snapshots.find((s) => s.id === 3)) })
    );
  }),
];
