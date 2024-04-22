import Home from './home';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <main style={{ paddingBottom: 10 }}>
         <Home/>
        </main>
      </QueryClientProvider>
    </ChakraProvider>
  );
};

export default App;
