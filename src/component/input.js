import React from "react";
import { t } from "locales";

export default function ({
  type = "text",
  name,
  multiLine = false,
  data = null,
  value,
  onChange,
  error,
  ...rest
}) {
  return (
    <div className={"form-group " + (error ? "has-danger" : "")}>
      <label htmlFor={name}>{t(name)}</label>
      {data ? (
        <select
          id={name}
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={
            "form-control form-control-lg " +
            (error ? "form-control-danger" : "")
          }
          {...rest}
        >
          {data.map((val, i) => (
            <option value={val}> {t(val)}</option>
          ))}
        </select>
      ) : !multiLine ? (
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
          {...rest}
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
          {...rest}
        />
      )}
      {"info" in rest && (
        <label className="info mt-2 text-info w-100">{rest.info}</label>
      )}
      <label className="error mt-2 text-danger">
        {typeof error == "object" ? error.map((e) => t(e) + " ") : t(error)}
      </label>
    </div>
  );
}
