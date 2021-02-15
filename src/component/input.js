import React from "react";
import { t } from "locales";

export default function ({
  type = "text",
  placeholder,
  value,
  onChange,
  error,
}) {
  return (
    <div className={"form-group " + (error ? "has-danger" : "")}>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete="off"
        className={
          "form-control form-control-lg " + (error ? "form-control-danger" : "")
        }
        placeholder={t(placeholder)}
      />
      <label className="error mt-2 text-danger">
        {typeof error == "object" ? error.map((e) => t(e) + " ") : t(error)}
      </label>
    </div>
  );
}
