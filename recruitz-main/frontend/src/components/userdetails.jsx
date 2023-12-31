'use client'

import { useState } from 'react'
import NavBar from '../components/navbar';
import {
  Progress,
  Box,
  ButtonGroup,
  Button,
  Heading,
  Flex,
  FormControl,
  GridItem,
  FormLabel,
  Input,
  Select,
  SimpleGrid,
  InputLeftAddon,
  InputGroup,
  Textarea,
  FormHelperText,
  InputRightElement,
} from '@chakra-ui/react'

import { useToast } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';
const Form1 = () => {
  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)

  return (
    <>
      <Heading w="100%" textAlign={'center'} fontWeight="normal" mb="2%">
        Job Details
      </Heading>
      
        <FormControl >
          <FormLabel htmlFor="first-name" >
            Job Preference
          </FormLabel>
          <Input id="first-name" placeholder="Enter Job Preference" />
        </FormControl>

       
      
      <FormControl mt="2%">
        <FormLabel htmlFor="email" >
          Known Stack
        </FormLabel>
        {/* <Input id="text" type="text" /> */}
        <Textarea
            placeholder="React.js"
            rows={3}
            shadow="sm"
            focusBorderColor="brand.400"
            fontSize={{
              sm: 'sm',
            }}
          />
        {/* <FormHelperText>We&apos;ll never share your email.</FormHelperText> */}
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="password"  mt="2%">
          Experience(in Years)
        </FormLabel>
        <InputGroup size="md">
          <Input
            pr="4.5rem"
            
            placeholder="Enter your Experience"
          />
          <InputRightElement width="4.5rem">
           
          </InputRightElement>
        </InputGroup>
      </FormControl>
    </>
  )
}

const Form2 = () => {
  return (
    <>
      <Heading w="100%" textAlign={'center'} fontWeight="normal" mb="2%">
        Academic Details
      </Heading>
      

      <FormControl as={GridItem} colSpan={6}>
        <FormLabel
          htmlFor="street_address"
        //   fontSize="sm"
        //   fontWeight="md"
        //   color="gray.700"
          _dark={{
            color: 'gray.50',
          }}
        //   fontWeight={'normal'}
          mt="2%">
          10th %
        </FormLabel>
        <Input
          type="text"
          name="street_address"
          id="street_address"
          autoComplete="street-address"
          focusBorderColor="brand.400"
          shadow="sm"
          size="sm"
          w="full"
          placeholder='(in percentage %)'
          rounded="md"
        />
      </FormControl>

      <FormControl as={GridItem} colSpan={[6, 6, null, 2]}>
        <FormLabel
          htmlFor="city"
        //   fontWeight={'normal'}  
        //   fontSize="sm"
        //   fontWeight="md"
        //   color="gray.700"
        //   _dark={{
        //     color: 'gray.50',
        //   }}
          mt="2%">
          12th %
        </FormLabel>
        <Input
          type="text"
          name="city"
          id="city"
          autoComplete="city"
          focusBorderColor="brand.400"
          shadow="sm"
          size="sm"
          w="full"
          placeholder='(in percentage %)'
          rounded="md"
        />
      </FormControl>

      <FormControl as={GridItem} colSpan={[6, 3, null, 2]}>
        <FormLabel
          htmlFor="state"
        //   fontWeight={'normal'}
        //   fontSize="sm"
        //   fontWeight="md"
        //   color="gray.700"
        //   _dark={{
        //     color: 'gray.50',
        //   }}
          mt="2%">
          CGPA
        </FormLabel>
        <Input
          type="text"
          name="state"
          id="state"
          autoComplete="state"
          focusBorderColor="brand.400"
          shadow="sm"
          size="sm"
          w="full"
          rounded="md"
          placeholder='(in percentage %)'
        />
      </FormControl>

      <FormControl as={GridItem} colSpan={[6, 3, null, 2]}>
        <FormLabel
          htmlFor="postal_code"
        //   fontWeight={'normal'}
        //   fontSize="sm"
        //   fontWeight="md"
        //   color="gray.700"
        //   _dark={{
        //     color: 'gray.50',
        //   }}
          mt="2%">
          Resume
        </FormLabel>
        <Input
          type="file"
          name="postal_code"
          id="postal_code"
          autoComplete="postal-code"
          focusBorderColor="brand.400"
          shadow="sm"
          size="sm"
          w="full"
          rounded="md"
          placeholder='Updloas'
        />
      </FormControl>
    </>
  )
}

const Form3 = () => {
  return (
    <>
      <Heading w="100%" textAlign={'center'} fontWeight="normal">
        Social Handles
      </Heading>
      <SimpleGrid columns={1} spacing={6}>
        <FormControl as={GridItem} colSpan={[3, 2]}>
          <FormLabel
            // fontSize="sm"
            // fontWeight="md"
            // color="gray.700"
            // _dark={{
            //   color: 'gray.50',
            >
            GitHub
          </FormLabel>
          <InputGroup size="sm">
            <InputLeftAddon
              bg="gray.50"
              _dark={{
                bg: 'gray.800',
              }}
              color="gray.500"
              rounded="md">
              http://
            </InputLeftAddon>
            <Input
              type="tel"
              placeholder="www.github.com/"
              focusBorderColor="brand.400"
              rounded="md"
            />
          </InputGroup><br/>
          <FormControl as={GridItem} colSpan={[3, 2]}>
        </FormControl>
            <FormLabel
                // fontSize="sm"
                // fontWeight="md"
                // color="gray.700"
                // _dark={{
                // color: 'gray.50',
                >
                LinkedIn
            </FormLabel>
            <InputGroup size="sm">
                <InputLeftAddon
                bg="gray.50"
                _dark={{
                    bg: 'gray.800',
                }}
                color="gray.500"
                rounded="md">
                http://
                </InputLeftAddon>
                <Input
                type="tel"
                placeholder="www.linkedin.com/"
                focusBorderColor="brand.400"
                rounded="md"
                />
            </InputGroup>
            </FormControl>

        <FormControl id="email" mt={1}>
          <FormLabel
            // fontSize="sm"
            // fontWeight="md"
            // color="gray.700"
            // _dark={{
            //   color: 'gray.50',
        >
            About 
          </FormLabel>
          <Textarea
            placeholder="Your self"
            rows={3}
            shadow="sm"
            focusBorderColor="brand.400"
            fontSize={{
              sm: 'sm',
            }}
          />
          <FormHelperText>
            Brief description for your profile. URLs are hyperlinked.
          </FormHelperText>
        </FormControl>
      </SimpleGrid>
    </>
  )
}

export default function Userdetails() {
  const toast = useToast()
  const [step, setStep] = useState(1)
  const [progress, setProgress] = useState(33.33)
  const navigate=useNavigate();

  return (
    <>
      <NavBar /><br/><br/>
      <Box
       
        borderWidth="1px"
        rounded="lg"
        shadow="1px 1px 3px rgba(0,0,0,0.3)"
        maxWidth={800}
        p={6}
        m="10px auto"
        as="form">
        <Progress hasStripe value={progress} mb="5%" mx="5%" isAnimated></Progress>
        {step === 1 ? <Form1 /> : step === 2 ? <Form2 /> : <Form3 />}
        <ButtonGroup mt="5%" w="100%">
          <Flex w="100%" justifyContent="space-between">
            <Flex>
              <Button
                onClick={() => {
                  setStep(step - 1)
                  setProgress(progress - 33.33)
                }}
                isDisabled={step === 1}
                colorScheme="teal"
                variant="solid"
                w="7rem"
                mr="5%">
                Back
              </Button>
              <Button
                w="7rem"
                isDisabled={step === 3}
                onClick={() => {
                  setStep(step + 1)
                  if (step === 3) {
                    setProgress(100)
                  } else {
                    setProgress(progress + 33.33)
                  }
                }}
                colorScheme="teal"
                variant="outline">
                Next
              </Button>
            </Flex>
            {step === 3 ? (
              <Button
                w="7rem"
                colorScheme="red"
                variant="solid"
                onClick={() => {
                  toast({
                    title: 'Account created.',
                    description: "We've created your account for you.",
                    status: 'success',
                    duration: 500,
                    isClosable: true,
                  })
                  navigate('/camera');
                }}>
                Submit
              </Button>
            ) : null}
          </Flex>
        </ButtonGroup>
      </Box>
    </>
  )
}