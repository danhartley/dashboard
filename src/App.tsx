import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import Dashboard from "./screens/dashboard/dashboard";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <header></header>
      <QueryClientProvider client={queryClient}>
        <Dashboard></Dashboard>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}

export default App;
