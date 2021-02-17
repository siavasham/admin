import React, { useState, useEffect } from "react";
import Breadcrumb from "component/breadcrumb";
import { t } from "locales";
import { get } from "library/request";

const type = ["danger", "info", "success", "dark", "primary"];
export default function () {
  const [data, setData] = useState([]);

  useEffect(() => {
    get("plans").then((data) => {
      setData(data.success);
    });
  }, []);
  return (
    <div>
      <Breadcrumb title="plans" icon="mdi-calculator" />
      <div className="row">
        <div className="col-12 mb-3">
          <div className="card card-warning">
            <div className="card-body">
              <div className="container text-center">
                <h3 className="mb-3">{t("pickPlan")}</h3>
                <p className="w-75 mx-auto mb-3">{t("pickDesc")}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12">
          <div className="row pricing-table">
            {data.map((plan, i) => (
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
                        {t(plan.profit)}
                      </h4>
                    </li>
                    <li>
                      {t("planInvest")}
                      <h4 className="float-left font-weight-bold text-success">
                        {t(plan.invest)} <i class="mdi mdi-arrow-up"></i>
                      </h4>
                    </li>
                    <li>
                      {t("planCancelable")}
                      <span className="float-left font-weight-bold">
                        <label
                          class={
                            "badge " +
                            (plan.cancelable ? "badge-success" : "badge-danger")
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
                      className={"btn btn-outline-" + type[i] + " btn-block"}
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
    </div>
  );
}
