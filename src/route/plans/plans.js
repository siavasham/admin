import React, { useState, useEffect } from "react";
import Breadcrumb from "component/breadcrumb";
import { t } from "locales";
import { get } from "library/request";
import Spinner from "component/spinner";
import InfoBox from "component/infobox";
const type = ["danger", "info", "success", "dark", "primary"];
export default function () {
  const [plans, setPlans] = useState([]);
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [active, setActive] = useState("BTC");
  useEffect(() => {
    setLoading(true);
    get("plans", { cache: true }).then((res) => {
      if (res?.success) {
        setPlans(res.success);
      } else {
        setError(true);
      }
      setLoading(false);
    });
    get("coins", { cache: true }).then((res) => {
      if (res?.success) {
        setCoins(res.success);
      }
    });
  }, []);
  return (
    <div>
      <Breadcrumb title="plans" icon="mdi-calculator" />
      {loading && <Spinner forDiv />}
      {error && <InfoBox title={t("noData")} />}
      {plans.length > 0 && (
        <>
          <InfoBox title={t("pickPlan")} text={t("pickDesc")} />
          <ul className="nav nav-pills nav-pills-custom">
            {coins?.map((coin, i) => (
              <li className="nav-item" key={i}>
                <button
                  type="button"
                  onClick={() => setActive(coin.name)}
                  className={
                    "btn btn-rounded btn-" +
                    (active == coin.name ? "primary" : "light")
                  }
                >
                  {coin.name}
                </button>
              </li>
            ))}
          </ul>
          <div className="row">
            <div className="col-12">
              <div className="row pricing-table">
                {plans.map((plan, i) => (
                  <div className=" col-sm-6  col-md-4 grid-margin stretch-card pricing-card">
                    <div
                      className={
                        "card border-" + type[i] + " border pricing-card-body"
                      }
                    >
                      <div className="text-center pricing-card-head">
                        <h2>{t(plan.type)}</h2>
                      </div>
                      <ul className="list-unstyled plan-features  p-3">
                        <li>
                          {t("planProfit")}
                          <h4 className="float-left font-weight-bold">
                            % {t(plan.profit)}
                          </h4>
                        </li>
                        <li>
                          {t("planInvest")}
                          <h4 className="float-left font-weight-bold text-success">
                            {t(plan.invest)}{" "}
                            <i className="mdi mdi-arrow-up"></i>
                          </h4>
                        </li>
                        <li>
                          {t("planCancelable")}
                          <span className="float-left font-weight-bold">
                            <label
                              className={
                                "badge " +
                                (plan.cancelable
                                  ? "badge-success"
                                  : "badge-danger")
                              }
                            >
                              {t(plan.cancelable ? "yes" : "no")}
                            </label>
                          </span>
                        </li>
                      </ul>
                      <div className="wrapper">
                        <a
                          href="#"
                          className={
                            "btn btn-outline-" + type[i] + " btn-block"
                          }
                        >
                          {t("start")}
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
