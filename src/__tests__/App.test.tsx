import { render, mockGeolocation, screen } from '../utils/test-utils';
import App from '../App';

// @ts-ignore
beforeAll(() => navigator.geolocation = mockGeolocation) 

test('renders loading spinner', () => {
  render(<App />);
  const loader = screen.getByText('Loading...');
  expect(loader).toBeInTheDocument();
});
