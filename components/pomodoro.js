import { VStack, HStack, Heading, Text, Button, IconButton, useBreakpointValue, useDisclosure } from '@chakra-ui/react'
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


import Timer from './timer'

export default function Pomodoro() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    
    const h1Size = useBreakpointValue({base: "base", sm: "sm", md: "md"})
    const pSize = useBreakpointValue({base: "base", md: "md"})

    return (
        <>
            <VStack h="100vh" justifyContent="center" spacing="6rem">
                <VStack spacing="0">
                    <Heading as="h1" size={h1Size}>POMODORO</Heading>
                    <Text as="p" size={pSize} textAlign="center">Lorem ipsum dolor sit amet</Text>
                </VStack>
                
                <Timer />

                <HStack>
                    <IconButton onClick={onOpen} icon={<TimeIcon />} />
                    <Button variant="toggle" size="small">START</Button>
                    <IconButton icon={<RepeatClockIcon />} />
                </HStack>
            </VStack>

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