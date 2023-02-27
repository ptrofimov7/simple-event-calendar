import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Calendar } from './features/calendar';

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Calendar />
      </div>
    </QueryClientProvider>
  );
}

export default App;
