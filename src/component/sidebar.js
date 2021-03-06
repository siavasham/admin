import React, { useState, useEffect } from "react";
import { withRouter, useLocation, Link } from "react-router-dom";
import { Collapse } from "react-bootstrap";
import { t } from "locales";
import useStorage from "reducer";

const Sidebar = (props) => {
  const {
    setting: { name },
  } = useStorage();
  const [state, setState] = useState({});
  const location = useLocation();

  const toggleMenuState = (menuState) => {
    if (state[menuState]) {
      setState({ [menuState]: false });
    } else if (Object.keys(state).length === 0) {
      setState({ [menuState]: true });
    } else {
      Object.keys(state).forEach((i) => {
        setState({ [i]: false });
      });
      setState({ [menuState]: true });
    }
  };

  useEffect(() => {
    onRouteChanged();
  }, [location]);

  useEffect(() => {
    const body = document.querySelector("body");
    document.querySelectorAll(".sidebar .nav-item").forEach((el) => {
      el.addEventListener("mouseover", function () {
        if (body.classList.contains("sidebar-icon-only")) {
          el.classList.add("hover-open");
        }
      });
      el.addEventListener("mouseout", function () {
        if (body.classList.contains("sidebar-icon-only")) {
          el.classList.remove("hover-open");
        }
      });
    });
  }, []);

  const onRouteChanged = () => {
    document.querySelector("#sidebar").classList.remove("active");
    Object.keys(state).forEach((i) => {
      setState({ [i]: false });
    });

    const dropdownPaths = [{ path: "/apps", state: "appsMenuOpen" }];

    dropdownPaths.forEach((obj) => {
      if (isPathActive(obj.path)) {
        setState({ [obj.state]: true });
      }
    });
  };
  const isPathActive = (path) => {
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="sidebar sidebar-offcanvas" id="sidebar">
      <ul className="nav">
        <li className="nav-item nav-profile">
          <a
            href="!#"
            className="nav-link"
            onClick={(evt) => evt.preventDefault()}
          >
            <div className="nav-profile-image">
              <i className=" mdi mdi-account-circle user-avatar"></i>
              <span className="login-status online"></span>{" "}
              {/* change to offline or busy as needed */}
            </div>
            <div className="nav-profile-text">
              <span className="font-weight-bold mb-2">{name}</span>
              <span className="text-secondary text-small">{t("levelOne")}</span>
            </div>
            <i className="mdi mdi-bookmark-check text-success nav-profile-badge"></i>
          </a>
        </li>
        <li
          className={
            isPathActive("/dashboard") ? "nav-item active" : "nav-item"
          }
        >
          <Link className="nav-link" to="/dashboard">
            <span className="menu-title">{t("dashboard")}</span>
            <i className="mdi mdi-home-outline menu-icon"></i>
          </Link>
        </li>
        <li
          className={isPathActive("/wallet") ? "nav-item active" : "nav-item"}
        >
          <Link className="nav-link" to="/wallet">
            <span className="menu-title">{t("wallet")}</span>
            <i className="mdi mdi mdi-wallet menu-icon"></i>
          </Link>
        </li>
        {/* <li
          className={isPathActive("/withdraw") ? "nav-item active" : "nav-item"}
        >
          <Link className="nav-link" to="/withdraw">
            <span className="menu-title">{t("withdraw")}</span>
            <i className="mdi mdi-export menu-icon"></i>
          </Link>
        </li> */}
        <li className={isPathActive("/plans") ? "nav-item active" : "nav-item"}>
          <Link className="nav-link" to="/plans">
            <span className="menu-title">{t("plans")}</span>
            <i className="mdi mdi mdi-calculator menu-icon"></i>
          </Link>
        </li>
        <li
          className={isPathActive("/history") ? "nav-item active" : "nav-item"}
        >
          <Link className="nav-link" to="/history">
            <span className="menu-title">{t("history")}</span>
            <i className="mdi mdi mdi-history menu-icon"></i>
          </Link>
        </li>
        <li
          className={isPathActive("/referral") ? "nav-item active" : "nav-item"}
        >
          <Link className="nav-link" to="/referral">
            <span className="menu-title">{t("referral")}</span>
            <i className="mdi mdi-reply menu-icon"></i>
          </Link>
        </li>
        <li
          className={isPathActive("/ticket") ? "nav-item active" : "nav-item"}
        >
          <Link className="nav-link" to="/ticket">
            <span className="menu-title">{t("ticket")}</span>
            <i className="mdi mdi-message-text menu-icon"></i>
          </Link>
        </li>
        <li
          className={isPathActive("/candle") ? "nav-item active" : "nav-item"}
        >
          <Link className="nav-link" to="/candle">
            <span className="menu-title">{t("candle")}</span>
            <i className="mdi mdi-chart-line menu-icon"></i>
          </Link>
        </li>
        <li
          className={isPathActive("/profile") ? "nav-item active" : "nav-item"}
        >
          <Link className="nav-link" to="/profile">
            <span className="menu-title">{t("profile")}</span>
            <i className="mdi mdi-account menu-icon"></i>
          </Link>
        </li>

        {/* <li
            className={
              isPathActive("/basic-ui") ? "nav-item active" : "nav-item"
            }
          >
            <div
              className={
                state.basicUiMenuOpen
                  ? "nav-link menu-expanded"
                  : "nav-link"
              }
              onClick={() => toggleMenuState("basicUiMenuOpen")}
              data-toggle="collapse"
            >
              <span className="menu-title">
                <Trans>Basic UI Elements</Trans>
              </span>
              <i className="menu-arrow"></i>
              <i className="mdi mdi-crosshairs-gps menu-icon"></i>
            </div>
            <Collapse in={state.basicUiMenuOpen}>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      isPathActive("/basic-ui/buttons")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/basic-ui/buttons"
                  >
                    <Trans>Buttons</Trans>
                  </Link>
                </li>
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      isPathActive("/basic-ui/dropdowns")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/basic-ui/dropdowns"
                  >
                    <Trans>Dropdowns</Trans>
                  </Link>
                </li>
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      isPathActive("/basic-ui/typography")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/basic-ui/typography"
                  >
                    <Trans>Typography</Trans>
                  </Link>
                </li>
              </ul>
            </Collapse>
          </li>
          <li
            className={
              isPathActive("/form-elements")
                ? "nav-item active"
                : "nav-item"
            }
          >
            <div
              className={
                state.formElementsMenuOpen
                  ? "nav-link menu-expanded"
                  : "nav-link"
              }
              onClick={() => toggleMenuState("formElementsMenuOpen")}
              data-toggle="collapse"
            >
              <span className="menu-title">
                <Trans>Form Elements</Trans>
              </span>
              <i className="menu-arrow"></i>
              <i className="mdi mdi-format-list-bulleted menu-icon"></i>
            </div>
            <Collapse in={state.formElementsMenuOpen}>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      isPathActive("/form-elements/basic-elements")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/form-elements/basic-elements"
                  >
                    <Trans>Basic Elements</Trans>
                  </Link>
                </li>
              </ul>
            </Collapse>
          </li>
          <li
            className={
              isPathActive("/tables") ? "nav-item active" : "nav-item"
            }
          >
            <div
              className={
                state.tablesMenuOpen
                  ? "nav-link menu-expanded"
                  : "nav-link"
              }
              onClick={() => toggleMenuState("tablesMenuOpen")}
              data-toggle="collapse"
            >
              <span className="menu-title">
                <Trans>Tables</Trans>
              </span>
              <i className="menu-arrow"></i>
              <i className="mdi mdi-table-large menu-icon"></i>
            </div>
            <Collapse in={state.tablesMenuOpen}>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      isPathActive("/tables/basic-table")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/tables/basic-table"
                  >
                    <Trans>Basic Table</Trans>
                  </Link>
                </li>
              </ul>
            </Collapse>
          </li>
          <li
            className={
              isPathActive("/icons") ? "nav-item active" : "nav-item"
            }
          >
            <div
              className={
                state.iconsMenuOpen ? "nav-link menu-expanded" : "nav-link"
              }
              onClick={() => toggleMenuState("iconsMenuOpen")}
              data-toggle="collapse"
            >
              <span className="menu-title">
                <Trans>Icons</Trans>
              </span>
              <i className="menu-arrow"></i>
              <i className="mdi mdi-contacts menu-icon"></i>
            </div>
            <Collapse in={state.iconsMenuOpen}>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      isPathActive("/icons/mdi")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/icons/mdi"
                  >
                    <Trans>Material</Trans>
                  </Link>
                </li>
              </ul>
            </Collapse>
          </li>
          <li
            className={
              isPathActive("/charts") ? "nav-item active" : "nav-item"
            }
          >
            <div
              className={
                state.chartsMenuOpen
                  ? "nav-link menu-expanded"
                  : "nav-link"
              }
              onClick={() => toggleMenuState("chartsMenuOpen")}
              data-toggle="collapse"
            >
              <span className="menu-title">
                <Trans>Charts</Trans>
              </span>
              <i className="menu-arrow"></i>
              <i className="mdi mdi-chart-bar menu-icon"></i>
            </div>
            <Collapse in={state.chartsMenuOpen}>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      isPathActive("/charts/chart-js")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/charts/chart-js"
                  >
                    <Trans>Chart Js</Trans>
                  </Link>
                </li>
              </ul>
            </Collapse>
          </li>
          <li
            className={
              isPathActive("/user-pages") ? "nav-item active" : "nav-item"
            }
          >
            <div
              className={
                state.userPagesMenuOpen
                  ? "nav-link menu-expanded"
                  : "nav-link"
              }
              onClick={() => toggleMenuState("userPagesMenuOpen")}
              data-toggle="collapse"
            >
              <span className="menu-title">
                <Trans>User Pages</Trans>
              </span>
              <i className="menu-arrow"></i>
              <i className="mdi mdi-lock menu-icon"></i>
            </div>
            <Collapse in={state.userPagesMenuOpen}>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      isPathActive("/user-pages/login-1")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/user-pages/login-1"
                  >
                    <Trans>Login</Trans>
                  </Link>
                </li>
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      isPathActive("/user-pages/register-1")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/user-pages/register-1"
                  >
                    <Trans>Register</Trans>
                  </Link>
                </li>
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      isPathActive("/user-pages/lockscreen")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/user-pages/lockscreen"
                  >
                    <Trans>Lockscreen</Trans>
                  </Link>
                </li>
              </ul>
            </Collapse>
          </li>
          <li
            className={
              isPathActive("/error-pages") ? "nav-item active" : "nav-item"
            }
          >
            <div
              className={
                state.errorPagesMenuOpen
                  ? "nav-link menu-expanded"
                  : "nav-link"
              }
              onClick={() => toggleMenuState("errorPagesMenuOpen")}
              data-toggle="collapse"
            >
              <span className="menu-title">
                <Trans>Error Pages</Trans>
              </span>
              <i className="menu-arrow"></i>
              <i className="mdi mdi-security menu-icon"></i>
            </div>
            <Collapse in={state.errorPagesMenuOpen}>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      isPathActive("/error-pages/error-404")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/error-pages/error-404"
                  >
                    404
                  </Link>
                </li>
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      isPathActive("/error-pages/error-500")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/error-pages/error-500"
                  >
                    500
                  </Link>
                </li>
              </ul>
            </Collapse>
          </li>
          <li
            className={
              isPathActive("/general-pages")
                ? "nav-item active"
                : "nav-item"
            }
          >
            <div
              className={
                state.generalPagesMenuOpen
                  ? "nav-link menu-expanded"
                  : "nav-link"
              }
              onClick={() => toggleMenuState("generalPagesMenuOpen")}
              data-toggle="collapse"
            >
              <span className="menu-title">
                <Trans>General Pages</Trans>
              </span>
              <i className="menu-arrow"></i>
              <i className="mdi mdi-medical-bag menu-icon"></i>
            </div>
            <Collapse in={state.generalPagesMenuOpen}>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      isPathActive("/general-pages/blank-page")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/general-pages/blank-page"
                  >
                    <Trans>Blank Page</Trans>
                  </Link>
                </li>
              </ul>
            </Collapse>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              href="http://bootstrapdash.com/demo/purple-react-free/documentation/documentation.html"
              rel="noopener noreferrer"
              target="_blank"
            >
              <span className="menu-title">
                <Trans>Documentation</Trans>
              </span>
              <i className="mdi mdi-file-document-box menu-icon"></i>
            </a>
          </li>
         */}
      </ul>
    </nav>
  );
};

export default withRouter(Sidebar);
