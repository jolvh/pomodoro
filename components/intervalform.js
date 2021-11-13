import {
    VStack,
    HStack,
    Text,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    FormControl,
    FormLabel,
    Input
  } from "@chakra-ui/react"

export default function IntervalForm(props) {
    return (
        <>
            <Modal isOpen={props.isOpen} onClose={props.onClose}>
                <ModalOverlay />
                <ModalContent>
                    <form onSubmit={props.save}>
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
                            <Button variant="ghost" mr={3} onClick={props.onClose}>Cancel</Button>
                            <Button id="submit-button" type="submit" bg="brand.green" color="brand.white" mr={3} onClick={props.onClose}>Save</Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        </>
    )
}