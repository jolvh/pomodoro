import { ChakraProvider } from '@chakra-ui/react'

import theme from '../theme'
import '../theme/fonts.css'

import Navbar from '../components/navbar'

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Navbar />
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
