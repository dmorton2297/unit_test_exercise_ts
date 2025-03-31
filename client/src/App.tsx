import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SnakeToCamelCaseForm } from "./forms";
import { useState } from "react";
import { FormResultHistory } from "./components";
const queryClient = new QueryClient();

function App() {
  const [resultHistroy, setResultHistory] = useState<
    { input: string; output: string }[]
  >([]);
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <h1>Welcome to Link 2025!</h1>
        <SnakeToCamelCaseForm
          onSubmitSuccess={(params) =>
            setResultHistory([...resultHistroy, params])
          }
        />
        <FormResultHistory history={resultHistroy} />
      </div>
    </QueryClientProvider>
  );
}

export default App;
