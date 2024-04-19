import { useCallback, useEffect, useState } from 'react';
import haversine, { Coordinate } from 'haversine';
import { Button, Heading, SimpleGrid, Spinner, VStack, Image, CircularProgress, Text } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { fetchFoodTrucks } from './HomeAPI';
import FoodTruckCard from './FoodTruckCard';
import { FoodTruck } from './types';
import { DEV } from '../utils/CONFIG';
import FoodTruckHero from '../images/food-truck.png';

// downtown SF location for testing
const testLocation = {
  latitude: 37.7937, 
  longitude: -122.3965
}

const Home = () => {
  const [filteredTrucks, setFilteredTrucks] = useState<FoodTruck[]>([]);
  const [offset, setOffset] = useState<number>(0);
  const [hasFiltered, setHasFiltered] = useState<boolean>(false);
  const [currentLocation, setCurrentLocation] = useState<Coordinate>({ latitude: 0, longitude: 0 })

  const { isPending, isError, data: foodtrucks, error} = useQuery({ queryKey: ['foodtrucks'], queryFn: fetchFoodTrucks });

  useEffect(() => {
    if (!DEV) {
      const success = (position: { coords: { latitude: number; longitude: number; }; }) => {
        setCurrentLocation({ 
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        })
        setFilteredTrucks([]);
        setHasFiltered(false);
      };
  
      const error = (err: { code: any; message: any; }) => {
        console.warn(`ERROR(${err.code}): ${err.message}`);
        // for testing, we will set location to test location if user declines
        setCurrentLocation(testLocation);
        setFilteredTrucks([]);
        setHasFiltered(false);
      };
  
      navigator.geolocation.getCurrentPosition(success, error)
    } else {
      setCurrentLocation(testLocation);

    }
  }, [])

  // method to check date/time
  const isOpen = useCallback((truck: FoodTruck) => {
    const { dayorder, start24, end24 } = truck;
    const today = new Date();

    const currentHour = today.getHours();
    const open = parseInt(start24.slice(0,2));
    const close =  parseInt(end24.slice(0,2));
    const isOpenHours = currentHour >= open && currentHour < close;

    const currentDay = today.getDay();
    const isOpenDay = currentDay === parseInt(dayorder);

    return isOpenHours && isOpenDay;
  },[]);

  // method to check distance (default 5 miles). returns true if haversine distance is less than distance
  const calculateDistance = useCallback(async (location: { latitude: string; longitude: string; human_address: string;}) => {
    const { latitude, longitude } = location;

    const start = {
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude)
    }

    const end = currentLocation;

    return haversine(start, end, {unit: 'mile'});
  }, [currentLocation]);

  const filterFoodTrucks = useCallback(async (distance: number = 5) => {
    const filtered: FoodTruck[] = [];

    for (const truck of foodtrucks) {
      const haversineDistance =  await calculateDistance(truck?.location_2);
      if (haversineDistance <= distance && isOpen(truck)) {
        filtered.push({...truck, distance: haversineDistance});
      }
    };

    setFilteredTrucks(filtered);
    setHasFiltered(true);
    if (hasFiltered) setOffset(num => num + 3);
  }, [foodtrucks, calculateDistance, isOpen, hasFiltered]);


  if (isPending) {
    return (
      <VStack h='100vh' pos='relative'>
        <CircularProgress 
          isIndeterminate
          color='blue.500'
          size={240}
          thickness={4}
          pos='absolute'
          top='40%'
        />
      </VStack>
    )
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  const topThreeTrucks = filteredTrucks.slice(offset, offset + 3);
  const noTrucks = hasFiltered && filteredTrucks.length <= 0;

  return (
    <VStack pt={12} pb={12} h='100vh' pos='relative'>
      <Image boxSize={32} src={FoodTruckHero}/>
      <Heading mb={8}>Food Trucks Near Me</Heading>
      <SimpleGrid
        spacing={4}
        templateRows='1fr'
        templateColumns='repeat(auto-fill, 80vw)'
        pb={8}
        justifyContent='center'
        alignItems='start'
        width='80vw'
        minW='80vw'
      >
        {noTrucks
          ? <Text align='center'>No open food trucks found within 5 miles</Text>
          : topThreeTrucks.map((truck: FoodTruck, index) => (
              <FoodTruckCard key={truck?.locationid + index} truck={truck} distance={truck.distance} />
            )
          )
        }
      </SimpleGrid>
      <Button
        lineHeight='40px'
        size='md'
        pos={filteredTrucks.length > 1 ? 'relative' : 'absolute'}
        isDisabled={isPending || (hasFiltered && offset + 3 >= filteredTrucks.length) || noTrucks}
        onClick={() => filterFoodTrucks()}
        colorScheme='blue'
        top={filteredTrucks.length > 1 ? '0' : '50%'}
        mb={12}
      >
        {hasFiltered && !noTrucks ? 'Show me more' :  'Find Food Trucks Open Now'}
      </Button>
    </VStack>
  )
};

export default Home;