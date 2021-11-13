import { VStack, Heading, Text,  useBreakpointValue } from '@chakra-ui/react'
import { motion } from 'framer-motion'

import Timer from './timer'

export default function Pomodoro(props) {
    const h1Size = useBreakpointValue({base: "base", sm: "sm", md: "md"})
    const pSize = useBreakpointValue({base: "base", md: "md"})

    const MotionHeader = motion(Heading);
    const MotionText = motion(Text);

    return (
        <>
            <VStack h="100vh" justifyContent="center" spacing="5rem">
                <VStack spacing="0" maxW="500px">
                    <MotionHeader
                        initial={{ x: "-50%", opacity: 0 }}
                        animate={{ x: "0", opacity: 1 }}
                        transition={{ type: "spring", stiffness: 75}}
                        as="h1" size={h1Size}
                    >
                        POMODORO
                    </MotionHeader>

                    <MotionText
                        initial={{ x: "-50%", opacity: 0 }}
                        animate={{ x: "0", opacity: 1 }}
                        transition={{ type: "spring", stiffness: 75, delay: .1}}
                        as="p" size={pSize} textAlign="center"
                    >
                        &quot;{props.quote.quote}&quot;
                    </MotionText>

                    <MotionText
                        initial={{ x: "-50%", opacity: 0 }}
                        animate={{ x: "0", opacity: 1 }}
                        transition={{ type: "spring", stiffness: 50, delay: 1.4}}
                        as="p" size={pSize} px="1.5rem" alignSelf="flex-end" textAlign="right"
                    >
                        - {props.quote.character}
                    </MotionText>
                </VStack>
                <Timer />
            </VStack>

            
        </>
    )
}