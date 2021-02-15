import React, { useState, useEffect } from "react";
import Breadcrumb from "component/breadcrumb";
import Coin from "./coin";
import { t } from "locales";
const Coins = [
  { id: "BTC", name: "Bitcoin" },
  { id: "ETH", name: "Ethereum" },
  { id: "BCH", name: "Bitcoin Cash" },
  { id: "DOGE", name: "DogeCoin" },
  { id: "DASH", name: "Dash" },
  { id: "LTC", name: "Litecoin" },
  { id: "USDT", name: "Tether" },
];
export default function () {
  useEffect(() => {}, []);
  return (
    <div>
      <Breadcrumb title="deposit" icon="mdi-import" />
      <div className="row">
        {Coins.map((coin, i) => (
          <Coin key={i} coin={coin} />
        ))}
      </div>
    </div>
  );
}
