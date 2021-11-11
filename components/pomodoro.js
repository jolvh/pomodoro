import { VStack, HStack, Heading, Text,  useBreakpointValue } from '@chakra-ui/react'



import Timer from './timer'

export default function Pomodoro() {
    
    
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
            </VStack>

            
        </>
    )
}