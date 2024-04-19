import React, {ReactElement} from 'react'
import {render, RenderOptions} from '@testing-library/react'
import { ChakraProvider } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
import testTrucks from '../home/__tests__/testTruckData.json';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const AllTheProviders = ({children}: {children: React.ReactNode}) => {
  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </ChakraProvider>
  )
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, {wrapper: AllTheProviders, ...options})

const mockGeolocation = {
  getCurrentPosition: jest.fn().mockImplementation((success) =>
    Promise.resolve(
      success({
        coords: {
          latitude: 37.7937, 
          longitude: -122.3965
        }
      })
    )
  )
}

function useFetchFoodTrucksMock(){
  return useQuery({ queryKey: ['foodtrucks'], queryFn: () => testTrucks});
}

export * from '@testing-library/react'
export {customRender as render, mockGeolocation, AllTheProviders, useFetchFoodTrucksMock}