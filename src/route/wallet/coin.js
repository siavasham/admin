import React, { useState, useEffect } from "react";
import Spinner from "component/spinner";
import { t } from "locales";
import { post } from "library/request";
import { toMoney } from "library/helper";
import Alert from "react-bootstrap/Alert";
import useStorage from "reducer";
import { Link } from "react-router-dom";
import exactMath from "exact-math";

export default function ({ coin, wallet, onData }) {
  const {
    setting: { token },
  } = useStorage();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const getInfo = () => {
    setLoading(true);
    post("address", { coin: coin.name, token }).then((data) => {
      setLoading(false);
      if (data.success) {
        onData(data.success);
      } else if (data.error) {
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 5000);
      }
    });
  };
  useEffect(() => {}, []);
  return (
    <div className="card card-statistics">
      <div className="card-body">
        <div className="d-flex  justify-content-between">
          <div className="">
            <div className={"coin " + coin.name} />
          </div>
          <div className="">
            <p className="mb-3 text-left ">{coin.fullname}</p>
            <div className="d-flex align-items-center justify-content-between">
              <p className="text-muted mb-0">
                {toMoney(exactMath.mul(wallet.balance ?? 0, coin.price))}
                <i className="mdi mdi-currency-usd text-primary"></i>
              </p>
              <h3 className="font-weight-medium text-left  mb-0  mr-3">
                {wallet.balance ?? 0}
              </h3>
            </div>
          </div>
        </div>
        <div className="d-flex mt-5">
          <Link
            to={"wallet/" + coin.name}
            class="btn btn-outline-primary btn-block"
          >
            {t("deposit")} {wallet.balance > 0 && " / " + t("withdraw")}
          </Link>
        </div>
      </div>
    </div>
  );
}
