import React, { useState, useEffect } from "react";
import Spinner from "component/spinner";
import { t } from "locales";
import { post } from "library/request";
import Alert from "react-bootstrap/Alert";
import useStorage from "reducer";

export default function ({ coin, onData }) {
  const {
    setting: { token },
  } = useStorage();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const getInfo = () => {
    setLoading(true);
    post("address", { coin: coin.name, token }).then((data) => {
      setLoading(false);
      if (data.success) {
        onData(data.success);
      } else if (data.error) {
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 5000);
      }
    });
  };
  useEffect(() => {}, []);
  return (
    <div className="card cursor-pointer" onClick={getInfo}>
      <div className="card-body text-center">
        <div className={"coin " + coin.name} />
        <p className="text-muted mt-3 mb-0">{coin.fullname}</p>
      </div>
      {loading && <Spinner forDiv />}
      <div className="inline-absolute text-center">
        <Alert variant="danger" bsPrefix="alert alert-fill" show={error}>
          {t("haveProblem")}
        </Alert>
      </div>
    </div>
  );
}
