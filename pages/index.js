import { useEffect, useState } from 'react'
import Head from 'next/head'
import { Container } from '@chakra-ui/react'

import { getQuoteList, getQuote } from '../lib/quotes'
import Pomodoro from '../components/pomodoro'

export default function Home({ quotes }) {
  const [quote, setQuote] = useState("");

  useEffect(() => {
    setQuote(getQuote(quotes));
  }, [quotes])

  return (
    <>
    <Head>
      <title>Pomodoro</title>
      <meta property="og:title" content="Pomodoro" key="title" />
      <meta name="description" content="A extensive timer designed for the pomodoro technique, a time management method where you break work into intervals"/>
    </Head>
    <Container maxW="container.lg">
      <Pomodoro quote={quote} />
    </Container>
    </>
  )
}

export async function getStaticProps(context) {
  const quotes = await getQuoteList();

  return {
      props: { quotes }
  };
}
