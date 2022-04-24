export const total = (total, next) => {
  return total + next;
};

export const getSnapshotsWithTotals = (snapshot) => {
  const features = Array.from(new Set(snapshot.items.map((i) => i.name)));

  snapshot.items.forEach((i) => {
    i.honouring = i.pledges.map((p) => p.honouring).reduce(total, 0);
    i.breaking = i.pledges.map((p) => p.breaking).reduce(total, 0);
  });

  snapshot.totals = {
    honouring: snapshot.items.map((i) => i.honouring).reduce(total, 0),
    breaking: snapshot.items.map((i) => i.breaking).reduce(total, 0),
  };

  const items = features.map((f, i) => {
    return {
      id: i,
      name: f,
      value: snapshot.items.find((i) => i.name === f).value,
      epic: snapshot.items.find((i) => i.name === f).epic,
      honouring: snapshot.items
        .filter((i) => i.name === f)
        .map((i) => i.honouring)
        .reduce(total, 0),
      breaking: snapshot.items
        .filter((i) => i.name === f)
        .map((i) => i.breaking)
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
      honouring: orderedValues
        .filter((ov) => ov.value === sh)
        .map((v) => v.honouring)
        .reduce(total, 0),
      breaking: orderedValues
        .filter((ov) => ov.value === sh)
        .map((v) => v.breaking)
        .reduce(total, 0),
      features: Array.from(
        new Set(orderedValues.filter((ov) => ov.value === sh))
      ).length,
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
    totals: { ...snapshot.totals },
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

export const getPledgesWithChecklists = (snapshot) => {
  return snapshot.items
    .map((i) => {
      return {
        pledges: i.pledges.map((p) => {
          return {
            id: snapshot.id,
            snapshotId: snapshot.snapshotId,
            source: snapshot.source,
            itemId: i.id,
            pledge: p,
          };
        }),
      };
    })
    .map((i) => i.pledges)
    .flat()
    .filter((p) => p.pledge.checklist);
};

export const transformSourceName = str => {

  if(!str) return "";
  if(str === "") return "";

  if(str === str.toUpperCase()) return str;

  const parts = str.split("-");
  return parts.map(part => {
    return `${part.slice(0,1).toUpperCase()}${part.slice(1)}`
  }).join(" ");
};
