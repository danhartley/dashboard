import { ReactQueryDevtools } from "react-query/devtools";
import { Routes, Route } from "react-router-dom";
import { useSnapshots } from "src/screens/dashboard/hooks/useSnapshots";

import Navigation from "src/screens/navigation/navigation";
import Dashboard from "src/screens/dashboard/dashboard";

const App = () => {
  type Error = {
    message?: string;
  };

  const {
    data,
    isSuccess,
    error
  }: {
    data: { id: number; snapshot: string; source: string, snapshotId: number }[];
    isSuccess: boolean;
    error: Error;
    
  } = useSnapshots();

  if (isSuccess) {
    return (     
      data && data.length > 0 ?  
      <>
        <header></header>
          <ReactQueryDevtools initialIsOpen={false} />
          <Routes>
            <Route key="navigation" path="/" element={<Navigation />}>
              {
                  data.map(snapshot => {
                    return (
                      <Route key={`${snapshot.source}-${snapshot.snapshotId}`} path="snapshots/:name/:id" element={<Dashboard />} />
                    )
                  })
              }
              </Route>
              <Route
                path="*"
                element={
                  <main style={{ padding: "1rem" }}>
                    <p>Nothing doing, sorry.</p>
                  </main>
                }
              >
            </Route>
          </Routes>
      </>
      : null
    );
  } else {
    return (
      <div></div>
    )
  }
};

export default App;
