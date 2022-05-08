import { ReactQueryDevtools } from "react-query/devtools";
import { Routes, Route } from "react-router-dom";
import { useSnapshots } from "src/screens/dashboard/hooks/useSnapshots";

import Layout from "src/screens/layout/layout";
import Dashboard from "src/screens/dashboard/dashboard";
import Navigation from "src/screens/dashboard/navigation";

const App = () => {
  type Error = {
    message?: string;
  };

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
                    // <main className="w-3/3 lg:w-2/3 bg-red-100 p-4 min-h-85v"></main>
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
