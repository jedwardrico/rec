import { render, screen, mockGeolocation, renderHook, AllTheProviders, waitFor, useFetchFoodTrucksMock } from '../../utils/test-utils';

import Home from '../Home';

// @ts-ignore
beforeEach(() => navigator.geolocation = mockGeolocation);

test('renders header text and button', async () => {
  const { result } = renderHook(() => useFetchFoodTrucksMock(), { wrapper: AllTheProviders });
  await waitFor(() => expect(result.current.isSuccess).toBe(true)); 
  render(<Home />)
  const header = screen.getByText('Food Trucks Near Me');
  expect(header).toBeInTheDocument();
  const button = screen.getByText('Find Food Trucks Open Now');
  expect(button).toBeInTheDocument();
});