import { Card, CardBody, Text, Stack, Heading, Icon, Badge, HStack } from '@chakra-ui/react'
import { MdRestaurant, MdPinDrop } from 'react-icons/md';
import { FoodTruck } from './types'
import { useMemo } from 'react';

type FoodTruckCardProps = {
  truck: FoodTruck,
  distance: number,
}

const FoodTruckCard = ({ truck, distance }: FoodTruckCardProps) => {

  const formatDistance = useMemo(() => {
    if (distance < 0.11) { // show feet if ~500ft
      const feet = distance * 5280;
      return `${10 * Math.round(feet/10)} feet`;
    } else {
      return `${distance.toFixed(1)} miles`;
    }
  }, [distance])

  const closingSoon = useMemo(() => {
    const today = new Date();
    const currentHour = today.getHours();
    const close =  parseInt(truck.end24.slice(0,2));
    
    return close - currentHour <= 1;
  }, [truck.end24])

  return (
    <Card
      direction={{ base: 'column', sm: 'row' }}
      variant='outline'
      size='lg'
      justify='start'
      overflow='hidden'
    >
      <Stack>
        <CardBody>
          <Heading size='md'>{truck.applicant}</Heading>
          <HStack>
            <Badge colorScheme={closingSoon ? 'red' : 'gray'}>
              {closingSoon ? 'Closing Soon' : 'Open'}
            </Badge>
            <Text py='2'> {truck.starttime} - {truck.endtime}</Text>
          </HStack>
          <HStack><Text pb='2' fontSize='sm'>{formatDistance} away</Text></HStack>
          <HStack alignItems='start'><Icon as={MdRestaurant} mt='0.75em'/><Text py='2'>{truck.optionaltext}</Text></HStack>
          <HStack><Icon as={MdPinDrop} /><Text py='2'>{truck.location}</Text></HStack>
        </CardBody>
      </Stack>
    </Card>
)}

export default FoodTruckCard;