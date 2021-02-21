import React, { useState, useEffect } from "react";
import Breadcrumb from "component/breadcrumb";
import { t } from "locales";
import TradingViewWidget, { Themes } from "react-tradingview-widget";
import { get } from "library/request";

export default function () {
  const [coins, setCoins] = useState([]);
  const [active, setActive] = useState("BTC");

  useEffect(() => {
    get("coins", { cache: true }).then((res) => {
      if (res?.success) {
        setCoins(res.success);
      }
    });
  }, []);
  return (
    <div>
      <Breadcrumb title="candle" icon="mdi-chart-line" />
      <div className="row">
        <div className="col-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body" style={{ height: "70vh" }}>
              <div className="d-sm-flex pb-4 mb-4 border-bottom">
                <ul className="nav nav-pills nav-pills-custom w-100">
                  {coins?.map((coin, i) =>
                    coin.name == "USDT" ? null : (
                      <li className="nav-item" key={i}>
                        <button
                          type="button"
                          onClick={() => setActive(coin.name)}
                          className={
                            "btn btn-rounded btn-" +
                            (active == coin.name ? "primary" : "dark")
                          }
                        >
                          {coin.name}
                        </button>
                      </li>
                    )
                  )}
                </ul>
              </div>
              <TradingViewWidget symbol={active + "USDT"} autosize />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
