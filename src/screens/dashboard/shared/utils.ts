export const total = (total, next) => {
  return total + next;
};

export const getSnapshotsWithTotals = snapshot => {

  snapshot.items.forEach(i => {
    i.honoured = i.pledges.map(p => p.honoured).reduce(total, 0);
    i.broken = i.pledges.map(p => p.broken).reduce(total, 0);
  });

  snapshot.totals = {
    honoured: snapshot.items.map((i) => i.honoured).reduce(total, 0),
    broken: snapshot.items.map((i) => i.broken).reduce(total, 0),
  }

  return snapshot;

};

export const getValuesWithTotals = snapshot => {

  const snapshotValues = snapshot.items.map(i => i.value);
  const flattenedValues = snapshotValues.map(value => {
    return snapshot.items.filter(i => i.value === value).flat();    
  });

  const finalValues = flattenedValues.map(x => {

    const values = flattenedValues.flat().filter(y => y.value === x[0].value);

    const value = {
        id: values[0].id,
        name: values[0].value,
        honoured: values[0].honoured,
        broken: values[0].broken,
        features: 10,
        pledges: values[0].pledges
    };

    return value;

  });

  const values = {
    id: snapshot.id,
    source: snapshot.source,
    snapshot: snapshot.snapshot,
    items: finalValues,
    snapshots: snapshot.snapshots,
    totals: { ...snapshot.totals, features: 100 }
  }

  return values;
};