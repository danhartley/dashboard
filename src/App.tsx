import { ReactQueryDevtools } from "react-query/devtools";
import { Routes, Route } from "react-router-dom";
import { useSnapshots } from "src/screens/dashboard/hooks/useSnapshots";

import Navigation from "src/screens/navigation/navigation";
import Dashboard from "src/screens/dashboard/dashboard";

const Footer = () => {
  return (
    <section className="container mx-auto max-w-4xl pb-4">
      <div>
        Dashboard{" "}
        <a
          className="class-pointer border-b pb-1 hover:border-slate-900 focus:border-slate-900"
          href="https://github.com/danhartley/dashboard"
        >
          repository
        </a>{" "}
        on GitHub
      </div>
    </section>
  );
};

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
        <header></header>
        <ReactQueryDevtools initialIsOpen={false} />
        <section className="min-h-screen flex flex-col justify-between container mx-auto w-4/5">
          <section className="container mx-auto max-w-4xl">
            <Routes>
              <Route key="navigation" path="/" element={<Navigation />}>
                {data.map((snapshot) => {
                  return (
                    <Route
                      key={`${snapshot.source}-${snapshot.snapshotId}`}
                      path="snapshots/:name/:id"
                      element={<Dashboard />}
                    />
                  );
                })}
              </Route>
              <Route
                path="*"
                element={
                  <main style={{ padding: "1rem" }}>
                    <p>Nothing doing, sorry.</p>
                  </main>
                }
              ></Route>
            </Routes>
          </section>
          <Footer></Footer>
        </section>
      </>
    ) : null;
  } else {
    return <div>Nothing doing!</div>;
  }
};

export default App;
