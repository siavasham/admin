import React, { useState, useEffect } from "react";
import Breadcrumb from "component/breadcrumb";
import { t } from "locales";
import { get, post } from "library/request";
import Spinner from "component/spinner";
import InfoBox from "component/infobox";
import useStorage from "reducer";
import useTimeAgo from "library/timeAgo";
import Modal from "react-bootstrap/Modal";
import Button from "component/button";

const type = ["", "danger", "info", "success", "light", "primary"];

export default function () {
  const [invest, setInvest] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const {
    setting: { token },
  } = useStorage();
  const timeAgo = useTimeAgo();

  useEffect(() => {
    setLoading(true);
    post("invest-history", { token }).then((res) => {
      if (res?.success && res?.success?.length > 0) {
        setInvest(res?.success);
      } else {
        setError(true);
      }
      setLoading(false);
    });
  }, []);
  return (
    <div>
      <Breadcrumb title="history" icon="mdi-history" />
      {loading && <Spinner forDiv />}
      {error && <InfoBox title={t("noData")} />}
      {invest.length > 0 && (
        <div className="row">
          <div className="col-12 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title pb-3">{t("history")}</h4>
                {invest.map((ref, i) => (
                  <div className="row tickets-card mx-2" key={i}>
                    <div className="col d-flex mt-2 mb-2">
                      <div className="nowrap pl-3">
                        <p className="mb-2 font-weight-medium text-muted">
                          {t("planType")}
                        </p>
                        <h4
                          className={
                            "font-weight-semibold mb-0 text-" +
                            type[ref.plan_id]
                          }
                        >
                          {t(ref.plan.type)}
                        </h4>
                      </div>
                    </div>
                    <div className="col d-flex mt-2 mb-2">
                      <div className="nowrap pl-3">
                        <p className="mb-2 font-weight-medium text-muted">
                          {t("coinType")}
                        </p>
                        <h4 className="font-weight-semibold mb-0 text-secondary">
                          {t(ref.coin)}
                        </h4>
                      </div>
                    </div>
                    <div className="col d-flex mt-2 mb-2">
                      <div className="nowrap pl-3">
                        <p className="mb-2 font-weight-medium text-muted">
                          {t("status")}
                        </p>
                        <label
                          className={
                            "badge " +
                            (ref.status == "open"
                              ? "badge-success"
                              : "badge-danger")
                          }
                        >
                          {t(ref.status)}
                        </label>
                      </div>
                    </div>
                    <div className="col d-flex mt-2 mb-2">
                      <div className="nowrap pl-3">
                        <p className="mb-2 font-weight-medium text-muted">
                          {t("invest")}
                        </p>
                        <h4 className="font-weight-semibold mb-0">
                          {ref.amount}
                        </h4>
                      </div>
                    </div>
                    <div className="col d-flex mt-2 mb-2">
                      <div className="nowrap pl-3">
                        <p className="mb-2 font-weight-medium text-muted">
                          {t("profit")}
                        </p>
                        <h4 className="font-weight-semibold mb-0">-</h4>
                      </div>
                    </div>
                    <div className="col d-flex mt-2 mb-2">
                      <div className="nowrap pl-3">
                        <p className="mb-2 font-weight-medium text-muted">
                          {t("startDate")}
                        </p>
                        <span className="font-weight-semibold mb-0">
                          {timeAgo.format(new Date(ref.created_at).getTime())}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      <Button
        className="btn btn-info btn-lg font-weight-medium"
        onClick={handleShow}
      >
        Launch static backdrop modal
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <div className="share">
            <div className="invest">
              <span>{t("totalInvest")}</span>
              0.2 BTC
            </div>
            <div className="profit">
              <span>{t("profit")}</span>
              0.1 BTC
            </div>
            <div className="user">siavasham</div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn btn-info btn-lg font-weight-medium w-100">
            {t("share")}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
