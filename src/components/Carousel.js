import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AliceCarousel from "react-alice-carousel";
import { makeStyles } from "@material-ui/core";
import { fetchTrendingCoins } from "../config/api";
import { CryptoState } from "../context/Context";
import { numberWithCommas } from "../config/utils";

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
    fetchTrendingCoins(currency)
      .then((data) => setTrending(data))
      .catch((error) => console.log(error));
  }, [currency]);

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
      items: 3,
    },
    1024: {
      items: 4,
    },
    2048: {
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
