import {
    QueryClient,
    QueryClientProvider,
} from 'react-query';
  
import Dashboard from './components/dashboard/dashboard';

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <header>
      </header>
      <QueryClientProvider client={queryClient}>
        <Dashboard></Dashboard>
      </QueryClientProvider>
    </>
  );
}

export default App;
