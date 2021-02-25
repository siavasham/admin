import React, { useState, useEffect } from "react";
import DonutChart from "component/donut";
import { t } from "locales";
import exactMath from "exact-math";

const list = [
  { text: "balance", type: "primary" },
  { text: "profit", type: "success" },
  { text: "referral", type: "danger" },
];
export default ({ wallet }) => {
  const handleSelected = (item) => {
    setSelected(item);
  };
  const allAmount = exactMath.add(
    wallet?.balance,
    wallet?.profit,
    wallet?.referral
  );
  const series = [
    {
      label: t("balance"),
      value: wallet.referral,
      data: wallet.balance,
      selected: false,
    },
    {
      label: t("profit"),
      value: wallet.referral,
      data: wallet.profit,
      selected: false,
    },
    {
      label: t("referral"),
      value: wallet.referral,
      data: wallet.referral,
      selected: false,
    },
  ];
  const [selected, setSelected] = useState(series[0]);
  return (
    <div className="card">
      <div className="card-body text-center">
        <DonutChart
          height={300}
          width={300}
          chartWidth={12.25}
          outerRadius={0.95}
          outerRadiusHover={20}
          innerRadius={0.85}
          innerRadiusHover={8}
          emptyWidth={0.06}
          startAngle={-45}
          defaultLabel={selected?.label}
          defaultValue={selected?.value}
          total={allAmount}
          series={series}
          onSelected={handleSelected}
        />
        <div
          id="traffic-chart-legend"
          className="rounded-legend legend-vertical legend-bottom-left pt-4"
        >
          <ul>
            {list.map((item, i) => (
              <li key={i} className="d-flex justify-content-between py-2">
                <span>
                  <span className={"legend-dots bg-" + item.type}></span>
                  {t(item.text)}
                </span>
                <span className="float-left">
                  {Math.round((wallet[item.text] / allAmount) * 100)}%
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
