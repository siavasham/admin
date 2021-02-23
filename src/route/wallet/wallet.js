import React, { useState, useEffect } from "react";
import Breadcrumb from "component/breadcrumb";
import Modal from "react-bootstrap/Modal";
import Coin from "./coin";
import { t } from "locales";
import { post } from "library/request";
import { QRCode } from "react-qr-svg";
import Clipboard from "react-clipboard.js";
import Alert from "react-bootstrap/Alert";
import Spinner from "component/spinner";
import InfoBox from "component/infobox";
import useStorage from "reducer";

export default function () {
  const [coins, setCoins] = useState([]);
  const [wallet, setWallet] = useState({});
  const [data, setData] = useState(null);
  const [copid, setCopid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const {
    setting: { name, token },
  } = useStorage();

  const onCopy = () => {
    setCopid(true);
    setTimeout(() => {
      setCopid(false);
    }, 5000);
  };
  useEffect(() => {
    setLoading(true);
    post("wallet", { token }).then((res) => {
      if (res?.success) {
        let temp = {};
        for (let i of res.success.wallet) {
          temp[i.coin] = i;
        }
        setWallet(temp);
        setCoins(res.success.coins);
      } else {
        setError(true);
      }
      setLoading(false);
    });
  }, []);

  return (
    <div>
      <Breadcrumb title="deposit" icon="mdi-wallet" />
      {loading && <Spinner forDiv />}
      {error && <InfoBox title={t("noData")} />}
      <div className="row">
        {coins?.map((coin, i) => (
          <div
            key={i}
            className={
              "col-xl-3 col-lg-4 col-md-4 col-sm-6 grid-margin stretch-card"
            }
          >
            <Coin
              coin={coin}
              wallet={wallet?.[coin.name] ?? {}}
              onData={setData}
            />
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
