import { useEffect, useState } from 'react'
import Head from 'next/head'
import { Container } from '@chakra-ui/react'

import { getQuoteList, getQuote } from '../lib/quotes'
import Pomodoro from '../components/pomodoro'

const fallback = {
  anime: "Shingeki no Kyojin",
  quote: "Nobody can foretell the outcome, each decision you make holds meaning only by affecting your next decision",
  character: "Erwin Smith"
}

export default function Home({ quotes }) {
  const [quote, setQuote] = useState(fallback);

  useEffect(() => {
    setQuote(getQuote(quotes, fallback));
  }, [quotes])

  return (
    <>
    <Head>
      <title>Pomodoro</title>
      <meta property="og:title" content="My page title" key="title" />
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
