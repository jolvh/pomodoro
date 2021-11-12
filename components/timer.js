import { useEffect, useState } from 'react'
import { HStack, VStack, Heading, Button, IconButton, useBreakpointValue, useDisclosure } from '@chakra-ui/react'
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

        console.log(`Init time ${startTime}`)
    }

    function reset() {
        setIsBreak(false);
        setIsActive(false);
        setSeconds(workSeconds);
    }

    function save(e){
        e.preventDefault();
        setWorkSeconds(prettyToSeconds(e.target[1].value));
        setBreakSeconds(prettyToSeconds(e.target[2].value));
    }
    useEffect(() => {
        reset();
    },[workSeconds])

    function secondsToPretty(seconds) {
        return `${Math.floor(seconds / 60).toString().padStart(2, "0")}:${(seconds % 60).toString().padStart(2, "0")}`
    }

    function prettyToSeconds(seconds) {
        const lame = seconds.split(':');

        return parseInt(lame[0]) * 60 + parseInt(lame[1]);
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
        console.log(isBreak)
    }, [isBreak]);

    //{minutes < 10 ? '0': ''}{minutes}:{seconds < 10 ? '0' : ''}{seconds}

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
                        <ModalCloseButton />
                        <ModalBody>
                            <VStack spacing="1rem">
                                <FormControl>
                                    <FormLabel>Work</FormLabel>
                                    <Input id="work-time-input" type="text" maxLength="2" autoComplete="off" placeholder="25:00" onChange={e => {
                                        if (e.target.value.length >= 2) {
                                            document.getElementById("break-time-input").focus()
                                        }
                                    }}></Input>
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Break</FormLabel>
                                    <Input id="break-time-input" type="text" maxLength="2" autoComplete="off" placeholder="05:00" onChange={e => {
                                        if (e.target.value.length >= 2) {
                                            document.getElementById("submit-button").focus()
                                        }
                                    }}></Input>
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