import React, { useState, useEffect } from "react";
import Spinner from "component/spinner";
import { t } from "locales";
import { post } from "library/request";
import { toMoney } from "library/helper";
import Alert from "react-bootstrap/Alert";
import useStorage from "reducer";

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
  console.log(coin);
  return (
    <div className="card card-statistics">
      <div className="card-body">
        <div className="d-flex  justify-content-between">
          <div className="">
            <div className={"coin " + coin.name} />
          </div>
          <div className="">
            <p className="mb-3 text-left text-dark">{coin.fullname}</p>
            <div className="d-flex align-items-center justify-content-between">
              <p className="text-muted mb-0">
                {toMoney((wallet.balance ?? 0) * coin.price)}
                <i className="mdi mdi-currency-usd text-primary"></i>
              </p>
              <h3 className="font-weight-medium text-left  mb-0 text-dark mr-3">
                {wallet.balance ?? 0}
              </h3>
            </div>
          </div>
        </div>
        <div className="d-flex mt-5">
          <button type="button" class="btn btn-outline-primary btn-block">
            {t("deposit")} {wallet.balance && " / " + t("withdraw")}
          </button>
        </div>
        {loading && <Spinner forDiv />}
        <div className="inline-absolute text-center">
          <Alert variant="danger" bsPrefix="alert alert-fill" show={error}>
            {t("haveProblem")}
          </Alert>
        </div>
      </div>
    </div>
  );
}
