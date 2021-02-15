import React, { useState, useEffect } from "react";
import Breadcrumb from "component/breadcrumb";
import { Bar, Doughnut } from "react-chartjs-2";
import { t } from "locales";

export default function () {
  const [trafficData, setTrafficData] = useState({});
  const [trafficOptions, setTrafficOptions] = useState({
    responsive: true,
    animation: {
      animateScale: true,
      animateRotate: true,
    },
    legend: false,
  });
  useEffect(() => {
    setTrafficData({
      datasets: [
        {
          data: [300, 30, 10],
          backgroundColor: ["#9a55ff", "#07cdae", "#fe7096"],
        },
      ],

      labels: [t('totalInvest'), t('totalProfit'), t('totalReferrals')],
    });
  }, []);
  return (
    <div>
      <Breadcrumb title="dashboard" icon="mdi-home" />
      <div className="row">
        <div className="col-md-4 stretch-card grid-margin">
          <div className="card bg-gradient-primary card-img-holder text-white">
            <div className="card-body">
              <img
                src={require("assets/images/dashboard/circle.svg")}
                className="card-img-absolute"
                alt="circle"
              />
              <h4 className="font-weight-normal mb-3">
                {t("totalInvest")}{" "}
                <i className="mdi  mdi-import mdi-24px float-right"></i>
              </h4>
              <h2 className="mb-5">$ 15,0000</h2>
              <h6 className="card-text">Increased by 60%</h6>
            </div>
          </div>
        </div>
        <div className="col-md-4 stretch-card grid-margin">
          <div className="card  bg-gradient-success card-img-holder text-white">
            <div className="card-body">
              <img
                src={require("assets/images/dashboard/circle.svg")}
                className="card-img-absolute"
                alt="circle"
              />
              <h4 className="font-weight-normal mb-3">
                {t("totalProfit")}{" "}
                <i className="mdi mdi-diamond-outline mdi-24px float-right"></i>
              </h4>
              <h2 className="mb-5">45,6334</h2>
              <h6 className="card-text">Decreased by 10%</h6>
            </div>
          </div>
        </div>
        <div className="col-md-4 stretch-card grid-margin">
          <div className="card bg-gradient-danger card-img-holder text-white">
            <div className="card-body">
              <img
                src={require("assets/images/dashboard/circle.svg")}
                className="card-img-absolute"
                alt="circle"
              />
              <h4 className="font-weight-normal mb-3">
                {t('totalReferrals')}{" "}
                <i className="mdi mdi-reply mdi-24px float-right"></i>
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
              <h4 className="card-title">{t('atGlance')}</h4>
              <Doughnut data={trafficData} options={trafficOptions} />
              <div
                id="traffic"
                className="rounded-legend legend-vertical legend-bottom-left pt-4"
              >
                <ul className="row">
                  <li className="col-4">
                    <span className="legend-dots bg-info"></span>{t('invest')}
                    <div className="text-center">80%</div>
                  </li>
                  <li className="col-4">
                    <span className="legend-dots bg-success"></span>{t('profit')}
                    <div className="text-center">30%</div>
                  </li>
                  <li className="col-4">
                    <span className="legend-dots bg-danger"></span>{t('referrals')}
                    <div className="text-center">10%</div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="col-6 grid-margin">
          <div className="card">
            <div className="card-body" style={{ minHeight: 430 }}>
              <h4 className="card-title">{t('recentTiket')}</h4>
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th> {t('subject')} </th>
                      <th> {t('status')} </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td> Fund is not recieved </td>
                      <td>
                        <label className="badge badge-gradient-success">
                          DONE
                          </label>
                      </td>
                    </tr>
                    <tr>
                      <td> High loading time </td>
                      <td>
                        <label className="badge badge-gradient-warning">
                          PROGRESS
                          </label>
                      </td>
                    </tr>
                    <tr>
                      <td> Website down for one week </td>
                      <td>
                        <label className="badge badge-gradient-info">
                          ON HOLD
                          </label>
                      </td>
                    </tr>
                    <tr>
                      <td> Loosing control on server </td>
                      <td>
                        <label className="badge badge-gradient-danger">
                          REJECTED
                          </label>
                      </td>
                    </tr>
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
