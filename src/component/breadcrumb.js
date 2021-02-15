import React from "react";
import { t } from "locales";
export default function ({ title, icon }) {
  return (
    <div className="page-header">
      <h3 className="page-title">
        <span className="page-title-icon bg-gradient-primary text-white mr-2">
          <i className={"mdi " + icon}></i>
        </span>{" "}
        {t(title)}{" "}
      </h3>
      <nav aria-label="breadcrumb">
        <ul className="breadcrumb">
          <li className="breadcrumb-item active" aria-current="page">
            <span></span>{" "}
            <i className="mdi mdi-alert-circle-outline icon-sm text-primary align-middle"></i>
          </li>
        </ul>
      </nav>
    </div>
  );
}
