import React, { useReducer, useContext, useEffect, useRef } from "react";
import { pledgeReducer } from "src/screens/pledges/reducers/pledges-reducer";
import Figure from "src/screens/dashboard/tables/figure/figure";

const Context = React.createContext(undefined);

const useEffectOnce = (cb) => {
  const didRun = useRef(false);
  if (!didRun.current) {
    cb();
    didRun.current = true;
  }
};

const AddPledge = () => {
  const [state, dispatch] = useReducer(pledgeReducer, []);

  useEffectOnce(() => {
    const raw = localStorage.getItem("data");
    dispatch({ type: "reset", payload: JSON.parse(raw) });
  });

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(state));
  }, [state]);

  return (
    <>
      <Figure title="The pledges page">
        <Context.Provider value={dispatch}>
          <section className="h-100v">
            <button
              className="my-4 border p-2"
              onClick={() => dispatch({ type: "add" })}
            >
              Add pledge
            </button>
            <PledgeList items={state}></PledgeList>
          </section>
        </Context.Provider>
      </Figure>
    </>
  );
};

export default AddPledge;

type PledgeType = {
  id: number;
  text: string;
  active?: boolean;
};

const PledgeList = ({ items }: { items: PledgeType[] }): JSX.Element => {
  const list = items.map((item) => {
    return <Pledge key={item.id} item={item} />;
  });
  return (
    <section>
      <h2 className="py-2">Pledges</h2>
      <ul>{list}</ul>
    </section>
  );
};

const Pledge = ({ item }: { item: PledgeType }): JSX.Element => {
  const dispatch = useContext(Context);
  return (
    <li>
      <input
        type="checkbox"
        className="mr-2"
        checked={item.active}
        onChange={() => dispatch({ type: "activated", payload: item.id })}
      />
      <input type="text" className="p-2" defaultValue={item.text}></input>
      <button
        className="my-4 ml-2 border p-2"
        onClick={() => dispatch({ type: "delete", payload: item.id })}
      >
        Delete
      </button>
    </li>
  );
};
