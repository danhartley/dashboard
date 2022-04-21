export const total = (total, next) => {
  return total + next;
};

export const getSnapshotsWithTotals = (snapshot) => {
  const features = Array.from(new Set(snapshot.items.map((i) => i.name)));

  snapshot.items.forEach((i) => {
    i.honoured = i.pledges.map((p) => p.honoured).reduce(total, 0);
    i.broken = i.pledges.map((p) => p.broken).reduce(total, 0);
  });

  snapshot.totals = {
    honoured: snapshot.items.map((i) => i.honoured).reduce(total, 0),
    broken: snapshot.items.map((i) => i.broken).reduce(total, 0),
  };

  const items = features.map((f, i) => {
    return {
      id: i,
      name: f,
      value: snapshot.items.find((i) => i.name === f).value,
      epic: snapshot.items.find((i) => i.name === f).epic,
      honoured: snapshot.items
        .filter((i) => i.name === f)
        .map((i) => i.honoured)
        .reduce(total, 0),
      broken: snapshot.items
        .filter((i) => i.name === f)
        .map((i) => i.broken)
        .reduce(total, 0),
      pledges: snapshot.items
        .filter((i) => i.name === f)
        .map((v) => v.pledges)
        .flat(),
    };
  });

  snapshot.items = items;

  return snapshot;
};

export const getValuesWithTotals = (snapshot) => {
  const snapshotValues = Array.from(
    new Set(snapshot.items.map((i) => i.value))
  );
  const flattenedValues = snapshotValues
    .map((value) => {
      return snapshot.items.filter((i) => i.value === value);
    })
    .flat();
  const orderedValues = sortBy(flattenedValues, "value");

  const items = snapshotValues.map((sh) => {
    return {
      name: sh,
      honoured: orderedValues
        .filter((ov) => ov.value === sh)
        .map((v) => v.honoured)
        .reduce(total, 0),
      broken: orderedValues
        .filter((ov) => ov.value === sh)
        .map((v) => v.broken)
        .reduce(total, 0),
      features: 10,
      pledges: orderedValues
        .filter((ov) => ov.value === sh)
        .map((v) => v.pledges)
        .flat(),
    };
  });

  const values = {
    id: snapshot.id,
    snapshotId: snapshot.snapshotId,
    source: snapshot.source,
    snapshot: snapshot.snapshot,
    items: items,
    snapshots: snapshot.snapshots,
    totals: { ...snapshot.totals, features: 100 },
  };

  return values;
};

export const sortBy = (arr, prop, dir = "asc") => {
  return dir === "asc"
    ? arr.sort((a, b) => parseFloat(a[prop]) - parseFloat(b[prop]))
    : arr.sort((a, b) => parseFloat(b[prop]) - parseFloat(a[prop]));
};

// https://stackoverflow.com/questions/14446511/most-efficient-method-to-groupby-on-an-array-of-objects

export const groupBy = function (xs, key) {
  return xs.reduce(function (rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};

export const getSummary = snapshots => {
  return Array.from(new Set(snapshots.map(s => {
    return {
      id: s.snapshotId,
      snapshot: s.snapshot,
      snapshotId: s.snapshotId,
      source: s.source
    }
  })))
};
