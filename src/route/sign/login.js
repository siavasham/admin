import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { t } from "locales";
import Button from "component/button";
import { post } from "library/request";
import Input from "component/input";
import { validateEmail } from "library/helper";
import _ from "lodash";
import useStorage from "reducer";


const Login = () => {
  const { session, setSession, setSetting } = useStorage();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});

  const onChange = (name, value) => {
    setSession({ [name]: value })
  }
  const validate = () => {
    const { email, password } = session;
    const temp = {};
    if (!validateEmail(email)) {
      temp["email"] = "validation.email";
    }
    if (password.length < 5) {
      temp["password"] = "validation.min";
    }
    for (let i of [email, password]) {
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
      const { email, password } = session;
      post("login", { email, password }).then((data) => {
        setLoading(false);
        if (data.success) {
          setSetting({ login: data.success })
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
              <h4>{t("login")}</h4>
              <form className="pt-3" autoComplete="off" onSubmit={onSubmit}>
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
                <div className="mt-3">
                  <Button loading={loading} className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn">
                    {t("login")}
                  </Button>
                </div>
                <div className="text-center mt-4">
                  <Link to="/forget" className="text-info">
                    {t("forgetPassword")}
                  </Link>
                </div>
                <div className="text-center mt-4 font-weight-light">
                  {t("dontHaveAccount")} <Link to="/register" className="text-primary">{t("createAccount")}</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

