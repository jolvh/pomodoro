import { useEffect, useState } from 'react'
import { HStack, VStack, Heading, Text, Button, IconButton, useBreakpointValue, useDisclosure } from '@chakra-ui/react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    FormControl,
    FormLabel,
    Input
  } from "@chakra-ui/react"
import { TimeIcon, RepeatClockIcon } from '@chakra-ui/icons'

export default function Timer() {
    const [workSeconds, setWorkSeconds] = useState(1500);
    const [breakSeconds, setBreakSeconds] = useState(300);
    const [isBreak, setIsBreak] = useState(false);

    const [startTime, setStartTime] = useState(0);
    const [startSeconds, setStartSeconds] = useState(workSeconds);
    const [seconds, setSeconds] = useState(startSeconds);
    const [isActive, setIsActive] = useState(false);

    const { isOpen, onOpen, onClose } = useDisclosure();
    const h2Size = useBreakpointValue({base: "4rem", sm: "6rem"});
    const buttonSize = useBreakpointValue({base: "small", md: "large"});

    function toggle() {
        setIsActive(!isActive);

        setStartTime(Date.now() / 1000);
        setStartSeconds(seconds);
    }

    function reset() {
        setIsBreak(false);
        setIsActive(false);
        setSeconds(workSeconds);
    }

    function save(e){
        e.preventDefault();
        setWorkSeconds(parseInt(e.target[0].value) * 60 + parseInt(e.target[1].value));
        setBreakSeconds(parseInt(e.target[2].value) * 60 + parseInt(e.target[3].value));
    }
    useEffect(() => {
        reset();
    },[workSeconds])

    function secondsToPretty(seconds) {
        return `${Math.floor(seconds / 60).toString().padStart(2, "0")}:${(seconds % 60).toString().padStart(2, "0")}`
    }

    function getDelta() {
        return Math.round(((Date.now() / 1000) - startTime));
    }

    useEffect(() => {
        let interval = null;

        if (isActive) {
            interval = setInterval(() => {
                if (seconds > 0) {
                    setSeconds(() => (startSeconds - getDelta()));
                } else if (seconds <= 0) {
                    setIsBreak(!isBreak);
                }
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isActive, seconds]);
    useEffect(() => {
        setSeconds(isBreak ? breakSeconds : workSeconds);
        setStartSeconds(isBreak ? breakSeconds : workSeconds);
        setStartTime(Date.now() / 1000);
        if (isActive && seconds === 0) {
            playSound();
        }
    }, [isBreak]);

    function playSound() {
        let audio = new Audio(isBreak ? '../sound/stopWork.wav' : '../sound/startWork.wav');
        audio.volume = 0.5;
        audio.play()   
    }

    return (
        <>
            <Heading fontFamily={`Red Hat Mono`} as="h2" variant="timer" fontSize={h2Size} color={isBreak ? "brand.red" : "brand.green"}>{secondsToPretty(seconds)}</Heading>
            <HStack>
                <IconButton onClick={onOpen} icon={<TimeIcon boxSize="1.25em" />} />
                <Button onClick={toggle} variant="toggle" bg={isActive ? "brand.peachy" : "brand.green"} size={buttonSize}>{isActive ? "PAUSE" : "START"}</Button>
                <IconButton onClick={reset} icon={<RepeatClockIcon boxSize="1.25em" />} />
            </HStack>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <form onSubmit={save}>
                        <ModalHeader>Set interval</ModalHeader>
                        <ModalBody alignItems="center">
                            <VStack py="1rem" spacing="1.5rem">
                                <FormControl w="fit-content">
                                    <FormLabel>Work</FormLabel>
                                        <HStack>
                                            <Input w="4rem" textAlign="center" id="work-minutes-input" type="number" autoComplete="off" placeholder="25" onChange={e => {
                                                if (e.target.value.length >= 2) {
                                                    document.getElementById("work-seconds-input").focus()
                                                }
                                            }}></Input>
                                            <Text>:</Text>
                                            <Input w="4rem" textAlign="center" id="work-seconds-input" type="number" autoComplete="off" placeholder="00" onChange={e => {
                                                if (e.target.value.length >= 2) {
                                                    document.getElementById("break-minutes-input").focus()
                                                }
                                            }}></Input>
                                        </HStack>
                                </FormControl>
                                <FormControl w="fit-content">
                                    <FormLabel>Break</FormLabel>
                                    <HStack>
                                        <Input w="4rem" textAlign="center" id="break-minutes-input" type="number" autoComplete="off" placeholder="05" onChange={e => {
                                            if (e.target.value.length >= 2) {
                                                document.getElementById("break-seconds-input").focus()
                                            }
                                        }}></Input>
                                        <Text>:</Text>
                                        <Input w="4rem" textAlign="center" id="break-seconds-input" type="number" autoComplete="off" placeholder="00" onChange={e => {
                                            if (e.target.value.length >= 2) {
                                                document.getElementById("submit-button").focus()
                                            }
                                        }}></Input>
                                    </HStack>
                                </FormControl>
                            </VStack>
                        </ModalBody>
                        <ModalFooter>
                            <Button variant="ghost" mr={3} onClick={onClose}>Cancel</Button>
                            <Button id="submit-button" type="submit" bg="brand.green" color="brand.white" mr={3} onClick={onClose}>Save</Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        </>
    )
}