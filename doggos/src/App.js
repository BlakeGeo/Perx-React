import React, {useState, useEffect} from 'react';
import './App.css';
import Axios from 'axios';
import {SimpleGrid, 
  Box, 
  Heading, 
  Flex, 
  VStack, 
  Text, 
  Image, 
  Spinner,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton} from '@chakra-ui/react';
function App() {
  const [dogs, setDogs] = useState([]);
  const [loading, setLoading] = useState(false);

  const url = 'https://api.thedogapi.com/v1/images/search?limit=20&order=RANDOM&api_key=91181943-5a3a-4929-937c-7cb7b9fa32f9';

  const getDogInfo = async () => {
    const result = await Axios.get(url);
    setLoading(true);
    const dogData = result.data.map((dog) => ({
      dogId: dog.id,
      breed: dog.breeds.name,
      // unable to obtain the array within breeds for manipulation, this is where the breed name lies.
      // I was under the impression dog.breeds[0].name should work but to no avail
      height: dog.height,
      width: dog.width,
      image: dog.url,
    }));

    setDogs(dogData);
    console.log(result.data);
  }

  useEffect(() => {
    getDogInfo();
  }, []);

  return (
    <Box w='100%' minH='100vh' py={2} px={5}>
      <Flex py={10}>
        <VStack w='full' h='full' p={4} spacing={10}>
          <Heading textAlign='center'>Welcome to Pure Happiness</Heading>
          <Text textAlign='center'>Click on a good boi for some cool stats</Text>
            {loading ? (getDogInfo) : <Spinner size='xl' color='red.500' />}
          <SimpleGrid columns={{sm: 2, md: 3, lg: 4}} spacing={5}>
            {dogs.map((dog) => {
              return (
                <Flex key={dog.dogId} p={4} borderRadius='xl' bg='gray.100'>
                  <VStack w='full' h='full' spacing={4} px={5}>
                    <Popover orientation='vertical'>
                      <PopoverTrigger>
                        <Image borderRadius='lg' h='90%' w='90%' src={dog.image} className='dogImage'
                          alt={`Photo of ${dog.breed}`}
                          />
                      </PopoverTrigger>
                      <PopoverContent>
                        <PopoverArrow />
                        <PopoverCloseButton />
                        <PopoverHeader>Good Boi Stats</PopoverHeader>
                        <PopoverBody>
                            Image height: {dog.height}px
                            Image width: {dog.width}px
                             {dog.breed ? `${dog.breed}` : ' Breed Unknown'}
                        </PopoverBody>
                      </PopoverContent>
                    </Popover>
                  </VStack>
                </Flex>
              )
            })}
          </SimpleGrid>
        </VStack>
      </Flex>
    </Box>
  );
}

export default App;
