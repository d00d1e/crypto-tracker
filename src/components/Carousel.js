import React, { useEffect, useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core";
import { TrendingCoins } from "../config/api";
import { CryptoState } from "../context/Context";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  carousel: {
    height: "50%",
    display: "flex",
    alignItems: "center",
  },
  carouselItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    cursor: "pointer",
    textTransform: "uppercase",
    color: "white",
  },
});

export default function Carousel() {
  const [trending, setTrending] = useState([]);

  const classes = useStyles();
  const { currency, symbol } = CryptoState();

  useEffect(() => {
    const fetchTrendingCoins = async () => {
      const { data } = await axios.get(TrendingCoins(currency));
      setTrending(data);
    };

    fetchTrendingCoins();
  }, [currency]);

  console.log(trending);

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const items = trending.map((coin) => {
    let profit = coin.price_change_24h >= 0;

    return (
      <Link to={`/coins/${coin.id}`} className={classes.carouselItem}>
        <img
          src={coin?.image}
          alt={coin?.name}
          height="80"
          style={{ marginBottom: 10 }}
        />
        <span>
          {coin?.symbol} &nbsp;
          <span style={{ color: profit > 0 ? "rgb(14, 203, 129" : "red" }}>
            {profit && "+"} {coin?.price_change_percentage_24h?.toFixed(2) || 0}
            %
          </span>
        </span>
        <span style={{ fontSize: 22, fontWeight: 500 }}>
          {symbol} {numberWithCommas(coin?.current_price?.toFixed(2))}
        </span>
      </Link>
    );
  });

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 5,
    },
  };

  return (
    <div className={classes.carousel}>
      <AliceCarousel
        mouseTracking
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        items={items}
        autoPlay
        infinite
      />
    </div>
  );
}
