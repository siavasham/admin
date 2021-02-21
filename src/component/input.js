import React from "react";
import { t } from "locales";

export default function ({
  type = "text",
  name,
  multiLine = false,
  value,
  onChange,
  error,
}) {
  return (
    <div className={"form-group " + (error ? "has-danger" : "")}>
      <label htmlFor={name}>{t(name)}</label>
      {!multiLine ? (
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          autoComplete="off"
          dir="auto"
          className={
            "form-control form-control-lg " +
            (error ? "form-control-danger" : "")
          }
        />
      ) : (
        <textarea
          id={name}
          name={name}
          dir="auto"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={
            "form-control form-control-lg " +
            (error ? "form-control-danger" : "")
          }
          rows={5}
        />
      )}
      <label className="error mt-2 text-danger">
        {typeof error == "object" ? error.map((e) => t(e) + " ") : t(error)}
      </label>
    </div>
  );
}
