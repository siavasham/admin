import React, { useState, useEffect } from "react";
import Spinner from "component/spinner";
import { t } from "locales";
import { post } from "library/request";
import Alert from "react-bootstrap/Alert";
import { QRCode } from "react-qr-svg";
import Clipboard from "react-clipboard.js";
import useStorage from "reducer";

export default function ({ coin }) {
  const {
    setting: { token },
  } = useStorage();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState(null);
  const [copid, setCopid] = useState(false);

  const onCopy = () => {
    setCopid(true);
    setTimeout(() => {
      setCopid(false);
    }, 5000);
  };
  const getInfo = () => {
    setLoading(true);
    post("address", { coin: coin.id, token }).then((data) => {
      setLoading(false);
      if (data.success) {
        setData(data.success);
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
    <div
      className={
        "col-md-4 col-sm-6 mb-4 " + (data == null ? "cursor-pointer" : "")
      }
      onClick={() => (data == null ? getInfo() : null)}
    >
      <div className="card position-relative coin-box">
        <div className="card-body text-center">
          {data == null ? (
            <>
              <div className={"coin " + coin.id} />
              <p className="text-muted mt-3 mb-0">{coin.name}</p>
            </>
          ) : (
            <>
              <div class="mb-2">
                <QRCode
                  bgColor="#FFFFFF"
                  fgColor="#000000"
                  level="Q"
                  style={{ width: "67%" }}
                  value={data.address}
                />
              </div>
              <div class="input-group">
                <div class="input-group-prepend cursor-pointer">
                  <Clipboard
                    component="span"
                    data-clipboard-text={data.address}
                    onSuccess={onCopy}
                    className="input-group-text text-primary mdi mdi-content-copy"
                  ></Clipboard>
                </div>
                <input
                  value={data.address}
                  readOnly
                  type="text"
                  class="form-control form-control"
                />
              </div>
            </>
          )}
        </div>
        {loading && <Spinner forDiv />}
        <div className="inline-absolute text-center">
          <Alert variant="danger" bsPrefix="alert alert-fill" show={error}>
            {t("haveProblem")}
          </Alert>
          <Alert variant="primary" bsPrefix="alert alert-fill" show={copid}>
            {t("addressCopid")}
          </Alert>
        </div>
      </div>
    </div>
  );
}
