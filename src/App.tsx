import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Calendar } from './features/calendar';
import { CalendarContextProvider } from './features/calendar/context';

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CalendarContextProvider>
        <div className="App">
          <Calendar />
        </div>
      </CalendarContextProvider>
    </QueryClientProvider>
  );
}

export default App;
