import React, { Suspense, lazy } from "react";
import {
  Switch,
  Route,
  Redirect,
  useHistory,
  useLocation,
} from "react-router-dom";
import useStorage from "reducer";

import Spinner from "component/spinner";
import { useEffect } from "react";

const Dashboard = lazy(() => import("route/dashboard/dashboard"));
const Deposit = lazy(() => import("route/deposit/deposit"));
const Plans = lazy(() => import("route/plans/plans"));
const Referral = lazy(() => import("route/referral/referral"));
const Register = lazy(() => import("route/sign/register"));
const Activate = lazy(() => import("route/sign/activate"));
const Login = lazy(() => import("route/sign/login"));

// const Buttons = lazy(() => import("./app/basic-ui/Buttons"));
// const Dropdowns = lazy(() => import("./app/basic-ui/Dropdowns"));
// const Typography = lazy(() => import("./app/basic-ui/Typography"));

// const BasicElements = lazy(() => import("./app/form-elements/BasicElements"));

// const BasicTable = lazy(() => import("./app/tables/BasicTable"));

// const Mdi = lazy(() => import("./app/icons/Mdi"));

// const Error404 = lazy(() => import("./app/error-pages/Error404"));
// const Error500 = lazy(() => import("./app/error-pages/Error500"));
// const BlankPage = lazy(() => import("./app/general-pages/BlankPage"));

const route = {
  home: [
    { path: "/dashboard", component: Dashboard },
    { path: "/deposit", component: Deposit },
    { path: "/plans", component: Plans },
    { path: "/referral", component: Referral },
  ],
  sign: [
    { path: "/register", component: Register },
    { path: "/activate", component: Activate },
    { path: "/login", component: Login },
  ],
};
const AppRoutes = (props) => {
  const history = useHistory();
  const location = useLocation();
  const {
    setting: { isLoged },
  } = useStorage();
  const list = route[isLoged ? "home" : "sign"];
  const isRoute = list.find((e) => e.item == location.pathname);

  return (
    <Suspense fallback={<Spinner />}>
      <Switch>
        {list.map((route, i) => (
          <Route key={i} exact path={route.path} component={route.component} />
        ))}
        {!isRoute && <Redirect to={isLoged ? "/dashboard" : "/login"} />}
      </Switch>
    </Suspense>
  );
};

export default AppRoutes;
