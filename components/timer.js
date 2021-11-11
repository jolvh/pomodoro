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
    const [minutes, setMinutes] = useState(1);
    const [seconds, setSeconds] = useState(10);
    const [isActive, setIsActive] = useState(false);

    const { isOpen, onOpen, onClose } = useDisclosure();
    const h2Size = useBreakpointValue({base: "4rem", sm: "6rem"});
    const buttonSize = useBreakpointValue({base: "small", md: "large"});

    useEffect(() => {
        let interval = null;

        if (isActive) {
            interval = setInterval(() => {
                if (seconds > 0) {
                setSeconds(seconds => seconds - 1);
                } else {
                    setMinutes(minutes => minutes - 1);
                    setSeconds(59);
                }
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isActive, seconds]);

    console.log("render");

    return (
        <>
            <Heading fontFamily={`Red Hat Mono`} as="h2" variant="timer" fontSize={h2Size} color="brand.green">{minutes < 10 ? '0': ''}{minutes}:{seconds < 10 ? '0' : ''}{seconds}</Heading>
            <HStack>
                <IconButton onClick={onOpen} icon={<TimeIcon boxSize="1.25em" />} />
                <Button variant="toggle" size={buttonSize}>START</Button>
                <IconButton icon={<RepeatClockIcon boxSize="1.25em" />} />
            </HStack>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <form onSubmit={(e) => {e.preventDefault(); console.log("SUBMIT")}}>
                        <ModalHeader>Set interval</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            
                                <VStack spacing="1rem">
                                    <FormControl>
                                        <FormLabel>Work</FormLabel>
                                        <Input type="number" placeholder="50:00"></Input>
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>Break</FormLabel>
                                        <Input type="number" placeholder="10:00"></Input>
                                    </FormControl>
                                    
                                </VStack>
                        </ModalBody>
                        <ModalFooter>
                            <Button variant="ghost" mr={3} onClick={onClose}>Cancel</Button>
                            <Button type="submit" bg="brand.green" color="brand.white" mr={3} onClick={onClose}>Save</Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        </>
    )
}