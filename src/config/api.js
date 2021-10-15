import axios from "axios";

export const fetchCoinList = async (currency) => {
  try {
    const { data } = await axios.get(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchSingleCoin = async (id) => {
  try {
    const { data } = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${id}`
    );

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchMarketData = async (id, days = 365, currency) => {
  try {
    const { data } = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`
    );

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchTrendingCoins = async (currency) => {
  try {
    const { data } = await axios.get(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`
    );

    return data;
  } catch (error) {
    console.log(error);
  }
};
