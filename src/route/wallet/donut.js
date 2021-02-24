import React, { useState, useEffect } from "react";
import DonutChart from "component/donut";
import { t } from "locales";
const list = [
  { text: "balance", icon: "mdi-bank" },
  { text: "freezed", icon: "mdi-shield-outline" },
  { text: "profit", icon: "mdi-diamond-outline" },
];
export default (props) => {
  const handleSelected = (props) => {
    console.log(props);
  };
  return (
    <div className="card">
      <div className="card-body text-center">
        <DonutChart
          height={300}
          width={300}
          chartWidth={12.25}
          outerRadius={0.95}
          outerRadiusHover={2}
          innerRadius={0.85}
          innerRadiusHover={0.85}
          emptyWidth={0.06}
          startAngle={0}
          defaultLabel={t("balance")}
          onSelected={(item) => {}}
          defaultValue="$0.3"
          total={0.4}
          series={[
            {
              label: t("balance"),
              value: "0.3",
              data: 0.3,
              selected: false,
            },
            {
              label: t("freezed"),
              value: "$0.1",
              data: 0.1,
              selected: false,
            },
          ]}
          onSelected={handleSelected}
        />
      </div>
    </div>
  );
};
