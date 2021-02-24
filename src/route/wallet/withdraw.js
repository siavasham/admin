import React, { useState, useEffect } from "react";
import Button from "component/button";
import Input from "component/input";
import { post } from "library/request";
import useStorage from "reducer";
import _ from "lodash";
import { t } from "locales";
import Alert from "react-bootstrap/Alert";

export default (props) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [success, setSuccess] = useState(false);
  const {
    setting: { token },
  } = useStorage();
  const [data, setData] = useState({
    address: "",
    amount: "",
  });
  const onChange = (name, value) => {
    setData({ ...data, [name]: value });
  };
  const validate = () => {
    const temp = {};
    if (data.address.length < 5) {
      temp["address"] = "validation.min";
    }
    if (data.amount.length < 1) {
      temp["amount"] = "validation.min";
    }
    for (let i in data) {
      if (data[i] == "") temp[i] = "validation.empty";
    }
    const res = _.isEmpty(temp) ? null : temp;
    setError(res);
    return res;
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (validate() == null) {
      setLoading(true);
      post("withdraw", { ...data, token }).then((data) => {
        setLoading(false);
        if (data.success) {
        } else if (data.error) {
          setError(data.error);
        }
      });
    }
  };
  return (
    <div className="card">
      <div className="card-body">
        <h4 className="card-title pb-2 border-bottom">{t("withdraw")}</h4>
        <form className="pt-3" autoComplete="off" onSubmit={onSubmit}>
          <Input
            name={"walletAddress"}
            value={data?.address}
            onChange={(v) => onChange("address", v)}
            error={error?.address}
          />
          <Input
            name={"amount"}
            value={data?.amount}
            onChange={(v) => onChange("amount", v)}
            error={error?.amount}
            info={
              <div
                className="d-flex justify-content-between cursor-pointer"
                onClick={() => onChange("amount", props.balance)}
              >
                <span>{t("withdrawable")}</span>
                <span>{props.balance}</span>
              </div>
            }
          />
          <div className="mt-3">
            <Button
              loading={loading}
              className="btn btn-block btn-success btn-lg font-weight-medium auth-form-btn"
            >
              {t("withdrawRequest")}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
