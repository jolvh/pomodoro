import { Flex, IconButton, useColorMode, useColorModeValue } from '@chakra-ui/react'
import { SunIcon, MoonIcon,  } from '@chakra-ui/icons'

export default function Navbar() {
    const {colorMode, toggleColorMode} = useColorMode();
    const icon = useColorModeValue(<MoonIcon />, <SunIcon />);

    return (
        <Flex position="fixed" w="full" p="1rem" justifyContent="flex-end">
            <IconButton onClick={toggleColorMode} icon={icon}></IconButton>
        </Flex>
    )
}