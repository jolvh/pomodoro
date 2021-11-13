import { useEffect, useState } from 'react'
import { HStack, Heading, Button, IconButton, useBreakpointValue, useDisclosure } from '@chakra-ui/react'
import { TimeIcon, RepeatClockIcon } from '@chakra-ui/icons'
import { motion } from 'framer-motion'

import IntervalForm from './intervalform'

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

    const MotionHeading = motion(Heading)
    const MotionRepeatClockIcon = motion(RepeatClockIcon);

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
            }, 500);
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
        audio.volume = 0.4;
        audio.play()   
    }

    return (
        <>
            <MotionHeading
                initial={{ opacity: .7 }}
                animate={{ opacity: 1 }}
                transition={{ duration: .5 }}
                fontFamily={`Red Hat Mono`} as="h2" variant="timer" fontSize={h2Size} color={isBreak ? "brand.red" : "brand.green"}
            >
                {secondsToPretty(seconds)}
            </MotionHeading>
            <HStack>
                <IconButton onClick={onOpen} icon={<TimeIcon boxSize="1.25em" />} aria-label="Click to open timer settings" />
                <Button onClick={toggle} variant="toggle" bg={isActive ? "brand.peachy" : "brand.green"} size={buttonSize}>{isActive ? "PAUSE" : "START"}</Button>
                <IconButton onClick={reset} icon={<MotionRepeatClockIcon whileHover={{ rotate: -360 }} transition={{ type: "spring", stiffness: 75 }} boxSize="1.25em"/>} aria-label="Click to reset the timer" />
                <IntervalForm save={save} isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
            </HStack>
        </>
    )
}