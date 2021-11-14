export async function getQuoteList() {
  const res = await fetch('https://animechan.vercel.app/api/quotes');
  const data = await res.json();

  if (data) {
    const temp = data.filter(q => q.quote.length < 128);
    if (data.length > 0) {
      return temp;
    }
  }

  return [{
    anime: "Shingeki no Kyojin",
    quote: "Nobody can foretell the outcome, each decision you make holds meaning only by affecting your next decision",
    character: "Erwin Smith"
  }];
}

export function getQuote(quoteList) {
  return quoteList[Math.floor(Math.random() * quoteList.length)]
}