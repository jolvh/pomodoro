export async function getQuoteList() {
    const res = await fetch('https://animechan.vercel.app/api/quotes');
    const data = await res.json();
    
    if (!data) {
        return [{
            anime: "FAILED",
            quote: "FAILED",
            character: "FAILED"
          }]
    }
    return data;
}

export function getQuote(quoteList, fallback) {
    const temp = quoteList.filter(q => q.quote.length < 128);
  
    if (temp.length > 0) {
      return temp[Math.floor(Math.random() * temp.length)]
    }
  
    return fallback;
  }