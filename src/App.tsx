import { ReactQueryDevtools } from "react-query/devtools";
import { Routes, Route } from "react-router-dom";
import { useSnapshots } from "src/screens/dashboard/hooks/useSnapshots";
import { Error } from "src/shared/types";

import Layout from "src/screens/layout/layout";
import Dashboard from "src/screens/dashboard/dashboard";
import Navigation from "src/screens/dashboard/navigation";
import AddPledge from "src/screens/pledges/pledges-add";

const App = () => {
  const {
    data,
    isSuccess,
  }: {
    data: {
      id: number;
      snapshot: string;
      source: string;
      snapshotId: number;
    }[];
    isSuccess: boolean;
    error: Error;
  } = useSnapshots();

  if (isSuccess) {
    return data && data.length > 0 ? (
      <>
        <ReactQueryDevtools initialIsOpen={false} />
        <section>
          <section className="mx-auto w-11/12 flex flex-col">
            <Routes>
              <Route key="layout" path="/" element={<Layout />}>
                {data.map((snapshot) => {
                  return (
                    <>
                      <Route
                        key={`${snapshot.source}-${snapshot.snapshotId}`}
                        path="snapshots/:name/:id"
                        element={<Dashboard />}
                      />
                      <Route
                        key={`${snapshot.source}-default`}
                        path="snapshots/:name/"
                        element={<Dashboard />}
                      />
                    </>
                  );
                })}
                <Route
                  key="default"
                  path="/"
                  element={
                    <Navigation data={data} isSuccess={isSuccess}></Navigation>
                  }
                ></Route>
              </Route>
              <Route
                key="bar url"
                path="*"
                element={
                  <main style={{ padding: "1rem" }}>
                    <p>Nothing doing, sorry.</p>
                  </main>
                }
              ></Route>
              <Route
                key="add pldege"
                path="/add-pledge"
                element={<AddPledge></AddPledge>}
              ></Route>
            </Routes>
          </section>
        </section>
      </>
    ) : null;
  } else {
    return null;
  }
};

export default App;
