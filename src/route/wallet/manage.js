import React, { useState, useEffect } from "react";
import Breadcrumb from "component/breadcrumb";
import { t } from "locales";
import { post } from "library/request";

import Spinner from "component/spinner";
import InfoBox from "component/infobox";
import useStorage from "reducer";
import Withdraw from "./withdraw";
import Deposit from "./deposit";
import Donut from "./donut";

const list = [
  { text: "balance", icon: "mdi-bank" },
  { text: "freezed", icon: "mdi-shield-outline" },
  { text: "profit", icon: "mdi-diamond-outline" },
];
export default function ({ match }) {
  const coin = match.params.coin ?? null;
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const {
    setting: { name, token },
  } = useStorage();

  useEffect(() => {
    setLoading(true);
    post("wallet-coin", { token, coin }).then((res) => {
      setLoading(false);
      if (res?.success) {
        setData(res.success);
      } else {
        setError(true);
      }
    });
  }, []);

  const withdrawable =
    data?.wallet?.balance + data?.wallet?.profit - data?.wallet?.freezed;
  if (error) {
    return <InfoBox title={t("noData")} />;
  }
  return (
    <div>
      <Breadcrumb title="withdrawAndDeposit" icon="mdi-wallet" />
      {loading && <Spinner forDiv />}

      <div className="row">
        <div className="col-lg-4 col-md-4 col-sm-6 grid-margin stretch-card">
          <Deposit coin={coin} address={data?.wallet?.address ?? "-"} />
        </div>
        <div className="col-lg-4 col-md-4 col-sm-6 grid-margin stretch-card">
          <Withdraw coin={coin} balance={withdrawable} />
        </div>
        <div className="col-lg-4 col-md-12 col-sm-12 grid-margin stretch-card">
          <Donut />
        </div>
        <div class="col-12 grid-margin">
          <div class="card card-statistics">
            <div class="row">
              {list.map((item, i) => (
                <div key={i} class="card-col col-xl-3 col-lg-3 col-md-3 col-6">
                  <div class="card-body">
                    <div class="d-flex align-items-center justify-content-center flex-column flex-sm-row">
                      <i
                        class={
                          "mdi " + item.icon + " text-primary mx-4 icon-lg"
                        }
                      ></i>
                      <div class="wrapper text-center">
                        <p class="card-text mb-2 text-dark">{t(item.text)}</p>
                        <div class="fluid-container">
                          <h2 class="mb-0 font-weight-medium text-dark">
                            {data?.wallet?.[item.text]}
                          </h2>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div class="card-col col-xl-3 col-lg-3 col-md-3 col-6">
                <div class="card-body">
                  <div class="d-flex align-items-center justify-content-center flex-column flex-sm-row">
                    <i class="mdi mdi-upload text-primary mx-4 icon-lg"></i>
                    <div class="wrapper text-center text-sm-left">
                      <p class="card-text mb-2 text-dark">
                        {t("withdrawable")}
                      </p>
                      <div class="fluid-container">
                        <h2 class="mb-0 font-weight-medium text-dark">
                          {withdrawable}
                        </h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
