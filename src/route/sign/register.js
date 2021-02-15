import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { t } from "locales";
import Button from "component/button";
import { post } from "library/request";
import Input from "component/input";
import { validateEmail } from "library/helper";
import _ from "lodash";
import useStorage from "reducer";


const Register = () => {
  const { session, setSession } = useStorage();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});

  const onChange = (name, value) => {
    setSession({ [name]: value })
  }
  const validate = () => {
    const { name, email, password } = session;
    const temp = {};
    if (name.length < 5) {
      temp["name"] = "validation.min";
    }
    if (!validateEmail(email)) {
      temp["email"] = "validation.email";
    }
    if (password.length < 5) {
      temp["password"] = "validation.min";
    }
    for (let i of [name, email, password]) {
      if (i == "") temp[i] = "validation.empty";
    }
    const res = _.isEmpty(temp) ? null : temp;
    setError(res);
    return res;
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (validate() == null) {
      setLoading(true);
      const { name, email, password, referral } = session;
      post("register", { name, email, password, referral }).then((data) => {
        setLoading(false);
        if (data.success) {
          history.push("/activate");
        } else if (data.error) {
          const temp = {};
          for (let i in data.error) {
            temp[i] = [i, data.error[i][0]];
          }
          setError(temp);
        }
      });
    }
  };
  return (
    <div>
      <div className="d-flex align-items-center auth px-0">
        <div className="row w-100 mx-0">
          <div className="col-lg-4 mx-auto">
            <div className="auth-form-light  py-5 px-4 px-sm-5">
              <div className="brand-logo text-center">
                <img src={require("assets/images/logo.svg")} alt="logo" />
              </div>
              <h4>{t("signUp")}</h4>
              <form className="pt-3" autoComplete="off" onSubmit={onSubmit}>
                <Input
                  placeholder={"name"}
                  value={session?.name}
                  onChange={v => onChange('name', v)}
                  error={error?.name}
                />
                <Input
                  placeholder={"email"}
                  value={session?.email}
                  onChange={v => onChange('email', v)}
                  error={error?.email}
                />
                <Input
                  type="password"
                  placeholder={"password"}
                  value={session?.password}
                  onChange={v => onChange('password', v)}
                  error={error?.password}
                />
                <Input
                  placeholder={"referralCode"}
                  value={session?.referral}
                  onChange={v => onChange('referral', v)}
                />
                <div className="mt-3">
                  <Button loading={loading} className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn">
                    {t("signUp")}
                  </Button>
                </div>
                <div className="text-center mt-4 font-weight-light">
                  {t("haveAccount")}{" "}
                  <Link to="/login" className="text-primary">
                    {t("login")}
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
