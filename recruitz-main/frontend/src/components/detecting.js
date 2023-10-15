import React, { useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import { FaVideo ,FaCircle,FaExpand,FaArrowRight} from 'react-icons/fa';
import NavBar from '../components/navbar';
import {FcNews} from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';
import {
  Box, useColorModeValue, Button, HStack, Text, Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Center,
  useDisclosure,
  Checkbox,
  CheckboxGroup,
} from '@chakra-ui/react';
import { Spinner } from '@chakra-ui/react';
const CameraApp = () => {
  const Navigate=useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const bgColor = useColorModeValue('gray.100', 'gray.700');
  const [showComponent, setShowComponent] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const chunksRef = React.useRef([]);
  const [startTime, setStartTime] = useState(0); // Track recording start time
  const [elapsedTime, setElapsedTime] = useState(0); // Track elapsed time
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [error,setError]=useState('');
  const handleAgreementChange = () => {
    setError('');
    setAgreed(!agreed);
  };

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      setShowComponent(true);
    }, 300);

    return () => {
      clearTimeout(delay);
    };
  }, []);

  useEffect(() => {
    let interval;
    if (isCameraOpen) {
      interval = setInterval(() => {
        const currentTime = Date.now();
        const elapsedMilliseconds = currentTime - startTime;
        const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000);
        setElapsedTime(elapsedSeconds);
      }, 1000);
    } else {
      clearInterval(interval);
      setElapsedTime(0);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isCameraOpen, startTime]);
  const handleStartCamera = () => {
    // Open the modal
    onOpen();
  };
  
  const stopCamera = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      mediaRecorder.stream.getTracks().forEach(track => track.stop());
    }
    setIsCameraOpen(false);
  };
  const handleSubmitVideo = () => {
    // Check if there are chunks to send
    if (chunksRef.current.length > 0) {
      const videoBlob = new Blob(chunksRef.current, { type: 'video/webm' });
      sendVideoToBackend(videoBlob);
      chunksRef.current = [];
      Navigate('/result');
    } else {
      console.log('No video data to submit');
    }
  };
  const startCamera =async()=>{
    if(agreed){
      startCamera1();
    }
    else{
         setError('Please Agree Terms And Conditions')
    }
  }
  const startCamera1 = async () => {
    onClose();
    const stream = await navigator.mediaDevices.getUserMedia({ video: true ,audio:true});
      
    const recorder = new MediaRecorder(stream, {
      mimeType: 'video/webm',
    });

    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        chunksRef.current.push(event.data);
      }
    };

    // recorder.onstop = () => {
    //   const videoBlob = new Blob(chunksRef.current, { type: 'video/webm' });
    //   sendVideoToBackend(videoBlob);
    //   chunksRef.current = [];
    // };

    setMediaRecorder(recorder);
    setStartTime(Date.now()); // Set recording start time
    recorder.start();
    setIsCameraOpen(true);
  };

  const sendVideoToBackend = async (videoBlob) => {
    try {
        const formData = new FormData();
        formData.append('videoData', videoBlob);

      const response = await fetch('http://localhost:5000/upload_video_new', {
            method: 'POST',
            body: formData,
        });

        const responseData = await response.json();
        console.log(responseData);
    } catch (error) {
        console.error('Error sending data to backend:', error);
    }
};


  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;

    return `${hours.toString().padStart(2, '0')} : ${minutes.toString().padStart(2, '0')} : ${seconds.toString().padStart(2, '0')}`;
  };

  if (!showComponent) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spinner
          thickness='4px'
          speed='0.65s'
          emptyColor='gray.200'
          color='teal.500'
          size='xl'
        />
        <p style={{ fontSize: '20px' }}> &nbsp;Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <NavBar /><br/><br/>
      {/* <Text fontFamily={'cursive'} fontSize={'2xl'} width={'100%'} align={'center'} p={2}>Recruitz: Discover Your Inner Self  .!</Text> */}
      <div bg={bgColor} style={{display:'flex'}}>
        
      <div style={{marginLeft:"4%",width:'22%',alignItems:'center',justifyContent:'center',boxShadow:'0px 0px 5px 0px rgba(0, 0, 0, 0.3)',borderRadius:10, width: '100%',
        maxWidth: '350px',backgroundColor:'#edf2f7'}}>
          <Center>
          <div style={{marginTop:"30%"}} >
        {/* <Text fontFamily={'cursive'} fontSize={'20px'} width={'100%'} align={'left'}  p={2}>Tell about yourself{'(1-2) mins'}</Text> */}
        <Text fontWeight="bold" fontSize="1.2rem" marginBottom="0.5rem">
              Intoduction :
            </Text>
            <Text fontSize="1rem" marginBottom="1.5rem">
              Tell about yourself{'(1-3) mins'}
            </Text>
        <Text fontWeight="bold" fontSize="1.2rem" marginBottom="0.5rem">
              Projects : 
            </Text>
            <Text fontSize="1rem" marginBottom="1.5rem">
              Tell about your projects{'(2-3) mins'}
            </Text>
          
            <Text fontWeight="bold" fontSize="1.2rem" marginBottom="0.5rem">
            Academics : 
            </Text>
            <Text fontSize="1rem" marginBottom="1.5rem">
            Tell about your academics{'(2-4) mins'}
            </Text>

            </div>
            </Center>
      </div>
            
      <Box  bg={bgColor}style={{
        position: 'relative',
        width: '100%',
        maxWidth: '800px', // Adjust the max width as needed
        margin: '0 auto',
        // marginLeft : '25%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:10,
        boxShadow:'0px 0px 5px 0px rgba(0, 0, 0, 0.3)',
        
        height: isCameraOpen ? 'auto' : '500px', // Adjust the height when the camera is open or closed
      }}>
        
       
        {isCameraOpen ? (
  <div style={{ position: 'relative', width: '100%', paddingBottom: '62.5%' }}>
    <Webcam
      audio={true}
      videoConstraints={{ facingMode: 'user' }}
      mirrored={true}
      audioConstraints={{
        echoCancellation: true,
        noiseSuppression: true,
      }}
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        objectFit: 'cover',
      }}
    />
    
    <div
      style={{
        position: 'absolute',
        top: '0%',
        left: '0%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        color: 'white',
        padding: '0.25rem 0.5rem',
        borderRadius: '4px',
      }}
    >
      <div style={{ display: 'flex' }}>
        <FaCircle style={{ marginRight: '0.5rem', marginTop: '0.2rem', color: 'red' }} />
        {formatTime(elapsedTime)}
      </div>
    </div>
    
    <div
      style={{
        position: 'absolute',
        bottom: '5px',
        right: '5px',
        zIndex: 1,
        cursor: 'pointer',
      }}
      onClick={toggleFullScreen}
    >
      <FaExpand size={24} />
   
    </div>
  </div>
) : (
  <FaVideo size={100} />
  
)}

      </Box>
      </div>

      <HStack spacing={40} pt={5} justifyContent={'center'}>
        <Button onClick={isCameraOpen ? stopCamera : handleStartCamera} variant={'outline'} color={'teal'} borderColor={'teal'}>
          {isCameraOpen ? 'Stop Camera' : 'Start Test'}
        </Button>
        <Button onClick={handleSubmitVideo} variant={'solid'} backgroundColor={'teal'} isDisabled={chunksRef.current.length === 0}>
            End Test
          </Button>
      </HStack>
      <Modal isCentered onClose={onClose} isOpen={isOpen} motionPreset='slideInBottom'>
        <ModalOverlay />
        <ModalContent maxW="1000px">
          <ModalHeader display="flex" alignItems="center" >
           <FcNews/> &nbsp;Note :
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* Replace this with your desired content */}
            <Text fontWeight="bold" fontSize="1.2rem" marginBottom="0.5rem">
              Mindset and Confidence:
            </Text>
            <Text fontSize="1rem" marginBottom="1.5rem">
              Approach the interview with a positive mindset and confidence. Remember that the mock interview is an opportunity to learn and improve.
            </Text>

            <Text fontWeight="bold" fontSize="1.2rem" marginBottom="0.5rem">
              Body Language:
            </Text>
            <Text fontSize="1rem" marginBottom="1.5rem">
              Maintain good eye contact, sit up straight, and use appropriate hand gestures. Good body language can enhance your communication.
            </Text>

            <Text fontWeight="bold" fontSize="1.2rem" marginBottom="0.5rem">
              Stay Calm:
            </Text>
            <Text fontSize="1rem" marginBottom="1.5rem">
              If you get stuck on a question, take a deep breath and don't be afraid to ask for clarification. It's okay to take a moment to gather your thoughts.
            </Text>
            <Text fontWeight="bold" fontSize="1.2rem" marginBottom="0.5rem" color={'red'}>
              Terms and Conditions:
            </Text>
            <Text fontSize="1rem" marginBottom="1.5rem">
              By proceeding, you agree to the following terms and conditions:
            </Text>
            <Text fontSize="0.9rem" marginBottom="1.5rem" pl="2rem">
              - The mock interview assessment is for learning and practice purposes only.
            </Text>
            <Text fontSize="0.9rem" marginBottom="1.5rem" pl="2rem">
              - Any video recordings or data generated during the assessment will not be shared or used for any other purpose without your consent.
            </Text>
            <Text fontSize="0.9rem" marginBottom="1.5rem" pl="2rem">
              - You are responsible for ensuring your surroundings and behavior during the assessment are appropriate and professional.
            </Text>
            <CheckboxGroup>
              <Checkbox isChecked={agreed} onChange={handleAgreementChange}>
                I have read and agree to the terms and conditions.
              </Checkbox>
              <p style={{color:'red'}}>
              {error}
              </p>
            </CheckboxGroup>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='' variant='ghost'mr={700} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme='teal' onClick={startCamera}>Proceed <FaArrowRight/></Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default CameraApp;


