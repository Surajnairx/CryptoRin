export default async function handler(req, res) {
  const {
    currency = "usd",
    coinResult = " ",
    perPage = 7,
    sortBy = "market_cap_desc",
    page = 1,
  } = req.query;

  const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${coinResult}&price_change_percentage=1h,24h,7d&per_page=${perPage}&order=${sortBy}&page=${page}`;

  const response = await fetch(url);
  const data = await response.json();

  res.setHeader("Cache-Control", "s-maxage=120");
  res.status(200).json(data);
}
