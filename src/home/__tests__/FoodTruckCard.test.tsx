import { render, screen } from '../../utils/test-utils';
import FoodTruckCard from '../FoodTruckCard';
import testTrucks from './testTruckData.json';

test('renders truck info', () => {
  render(<FoodTruckCard truck={testTrucks[0]} distance={testTrucks[0].distance} />);
  const title = screen.getByText('Reecees Soulicious');
  expect(title).toBeInTheDocument();
  const subtitle = screen.getByText('Fried Chicken, Fried Fish, Greens, Mac & Cheese, Peach Cobbler, and String beans');
  expect(subtitle).toBeInTheDocument();
  const distance = screen.getByText('4.4 miles away');
  expect(distance).toBeInTheDocument();
});