import { Heading, useBreakpointValue } from '@chakra-ui/react'

export default function Timer() {
    const h2Size = useBreakpointValue({base: "4rem", sm: "6rem"})

    return (
        <Heading as="h2" variant="timer" fontSize={h2Size} color="brand.green">12:34</Heading>
    )
}