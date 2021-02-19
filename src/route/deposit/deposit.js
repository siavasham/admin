import React, { useState, useEffect } from "react";
import Breadcrumb from "component/breadcrumb";
import Modal from "react-bootstrap/Modal";
import Coin from "./coin";
import { t } from "locales";
import { get } from "library/request";
import { QRCode } from "react-qr-svg";
import Clipboard from "react-clipboard.js";
import Alert from "react-bootstrap/Alert";
import Spinner from "component/spinner";
import InfoBox from "component/infobox";

export default function () {
  const [coins, setCoins] = useState([]);
  const [data, setData] = useState(null);
  const [copid, setCopid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const onCopy = () => {
    setCopid(true);
    setTimeout(() => {
      setCopid(false);
    }, 5000);
  };
  useEffect(() => {
    setLoading(true);
    get("coins", { cache: true }).then((res) => {
      if (res?.success) {
        setCoins(res.success);
      } else {
        setError(true);
      }
      setLoading(false);
    });
  }, []);

  return (
    <div>
      <Breadcrumb title="deposit" icon="mdi-import" />
      {loading && <Spinner forDiv />}
      {error && <InfoBox title={t("noData")} />}
      <div className="row">
        {coins?.map((coin, i) => (
          <div key={i} className={"col-md-3 col-sm-6 mb-4 "}>
            <Coin coin={coin} onData={setData} />
          </div>
        ))}
      </div>
      {data && (
        <Modal
          show={!!data}
          onHide={() => setData(null)}
          dialogClassName="modal-70w"
        >
          <Modal.Body>
            <Alert variant="dark" bsPrefix="alert alert-fill">
              {t("depositInfo")}
            </Alert>
            <div className="text-center">
              <div className="mb-2">
                <QRCode
                  bgColor="#FFFFFF"
                  fgColor="#000000"
                  level="Q"
                  style={{ width: "67%" }}
                  value={data.address}
                />
              </div>
              <div className="input-group">
                <div className="input-group-prepend cursor-pointer">
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
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
}
