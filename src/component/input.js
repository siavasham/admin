import React from "react";
import { t } from "locales";

export default function ({ type = "text", name, value, onChange, error }) {
  return (
    <div className={"form-group " + (error ? "has-danger" : "")}>
      <label for={name}>{t(name)}</label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete="off"
        dir="auto"
        className={
          "form-control form-control-lg " + (error ? "form-control-danger" : "")
        }
      />
      <label className="error mt-2 text-danger">
        {typeof error == "object" ? error.map((e) => t(e) + " ") : t(error)}
      </label>
    </div>
  );
}
