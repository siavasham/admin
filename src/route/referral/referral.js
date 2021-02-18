import React, { useState, useEffect } from "react";
import Breadcrumb from "component/breadcrumb";
import { t } from "locales";
import { post } from "library/request";
import Spinner from "component/spinner";
import InfoBox from "component/infobox";
import Clipboard from "react-clipboard.js";
import Alert from "react-bootstrap/Alert";
import useStorage from "reducer";

export default function () {
  const [refferals, setReferrals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [copid, setCopid] = useState(false);
  const {
    setting: { name },
  } = useStorage();

  const address = window.location.origin + "/register?ref=" + name;
  const onCopy = () => {
    setCopid(true);
    setTimeout(() => {
      setCopid(false);
    }, 5000);
  };
  useEffect(() => {
    // setLoading(true);
    // get("plans").then((res) => {
    //   if (res?.success) {
    //     setPlans(res.success);
    //   } else {
    //     setError(true);
    //   }
    //   setLoading(false);
    // });
  }, []);
  return (
    <div>
      <Breadcrumb title="referral" icon="mdi-reply" />
      {loading && <Spinner forDiv />}
      <InfoBox text={t("referralDesc")} />
      <div className="row">
        <div className="col-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title pb-3">{t("yourReferral")}</h4>
              <p className="card-description">{t("referralHelp")}</p>
              <div className="input-group">
                <div className="input-group-prepend cursor-pointer">
                  <Clipboard
                    component="span"
                    data-clipboard-text={address}
                    onSuccess={onCopy}
                    className="input-group-text text-primary mdi mdi-content-copy"
                  ></Clipboard>
                </div>
                <input
                  value={address}
                  dir="auto"
                  type="text"
                  className="form-control form-control"
                />
              </div>
              <div className="inline-absolute center text-center">
                <Alert
                  variant="primary"
                  bsPrefix="alert alert-fill"
                  show={copid}
                >
                  {t("addressCopid")}
                </Alert>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
