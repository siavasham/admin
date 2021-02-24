import React, { useState, useEffect } from "react";
import Breadcrumb from "component/breadcrumb";
import { t } from "locales";
import { post } from "library/request";
import useStorage from "reducer";

const types = {
  open: "badge-gradient-success",
  progress: "badge-gradient-warning",
  "on-hold": "badge-gradient-info",
  done: "badge-gradient-dark",
  rejected: "badge-gradient-danger",
};

export default function () {
  const [tickets, setTickets] = useState([]);
  const {
    setting: { token },
  } = useStorage();

  useEffect(() => {
    post("tickets", { token }, { cache: true }).then((res) => {
      if (res?.success) {
        setTickets(res.success);
      }
    });
  }, []);
  return (
    <div>
      <Breadcrumb title="dashboard" icon="mdi-home" />
      <div className="row">
        <div className="col-md-4 stretch-card grid-margin">
          <div className="card bg-gradient-primary card-img-holder text-white overflow-hidden">
            <div className="card-body">
              <img
                src={require("assets/images/dashboard/circle.svg")}
                className="card-img-absolute"
                alt="circle"
              />
              <h4 className="font-weight-normal mb-3">
                {t("totalInvest")}{" "}
                <i className="mdi  mdi-import mdi-24px float-left"></i>
              </h4>
              <h2 className="mb-5">$ 15,0000</h2>
              <h6 className="card-text">Increased by 60%</h6>
            </div>
          </div>
        </div>
        <div className="col-md-4 stretch-card grid-margin">
          <div className="card  bg-gradient-success card-img-holder text-white  overflow-hidden">
            <div className="card-body">
              <img
                src={require("assets/images/dashboard/circle.svg")}
                className="card-img-absolute"
                alt="circle"
              />
              <h4 className="font-weight-normal mb-3">
                {t("totalProfit")}{" "}
                <i className="mdi mdi-diamond-outline mdi-24px float-left"></i>
              </h4>
              <h2 className="mb-5">45,6334</h2>
              <h6 className="card-text">Decreased by 10%</h6>
            </div>
          </div>
        </div>
        <div className="col-md-4 stretch-card grid-margin">
          <div className="card bg-gradient-danger card-img-holder text-white  overflow-hidden">
            <div className="card-body">
              <img
                src={require("assets/images/dashboard/circle.svg")}
                className="card-img-absolute"
                alt="circle"
              />
              <h4 className="font-weight-normal mb-3">
                {t("totalReferrals")}{" "}
                <i className="mdi mdi-reply mdi-24px float-left"></i>
              </h4>
              <h2 className="mb-5">9</h2>
              <h6 className="card-text">Increased by 5%</h6>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">{t("atGlance")}</h4>
              <div className="multi-graph mx-auto">
                <div
                  className="graph"
                  dataName={t("totalInvest")}
                  style={{ "--percentage": 100, "--fill": "#198ae3" }}
                ></div>
                <div
                  className="graph"
                  dataName={t("totalProfit")}
                  style={{ "--percentage": 30, "--fill": "#00b050" }}
                ></div>
                <div
                  className="graph"
                  dataName={t("totalReferrals")}
                  style={{ "--percentage": 20, "--fill": "#fe7096" }}
                ></div>
              </div>
              <div className="rounded-legend legend-vertical legend-bottom-left pt-4 ">
                <ul className="row ">
                  <li className="col-4 text-center">
                    <span className="legend-dots bg-info"></span>
                    {t("invest")}
                  </li>
                  <li className="col-4 text-center">
                    <span className="legend-dots bg-success"></span>
                    {t("profit")}
                  </li>
                  <li className="col-4 text-center">
                    <span className="legend-dots bg-danger "></span>
                    {t("referrals")}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="col-6 grid-margin">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">{t("recentTicket")}</h4>
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th> {t("subject")} </th>
                      <th> {t("status")} </th>
                    </tr>
                  </thead>
                  <tbody>
                    {tickets?.map((ticket, i) => (
                      <tr key={i}>
                        <td>{ticket.title} </td>
                        <td>
                          <label className={"badge " + types[ticket.status]}>
                            {t(ticket.status)}
                          </label>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
