import { API_URL, TEST_URL } from '../utils/CONFIG';

export const fetchFoodTrucks = async () => {
  const url = process.env.NODE_ENV === 'development' ? TEST_URL : API_URL;
  const response = await fetch(url);
  const foodtrucks = await response.json();
  
  return foodtrucks;
};