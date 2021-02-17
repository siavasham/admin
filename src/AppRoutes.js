import React, { Suspense, lazy } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import useStorage from "reducer";

import Spinner from "component/spinner";

const Dashboard = lazy(() => import("route/dashboard/dashboard"));
const Deposit = lazy(() => import("route/deposit/deposit"));
const Plans = lazy(() => import("route/plans/plans"));
const Register = lazy(() => import("route/sign/register"));
const Activate = lazy(() => import("route/sign/activate"));
const Login = lazy(() => import("route/sign/login"));

// const Buttons = lazy(() => import("./app/basic-ui/Buttons"));
// const Dropdowns = lazy(() => import("./app/basic-ui/Dropdowns"));
// const Typography = lazy(() => import("./app/basic-ui/Typography"));

// const BasicElements = lazy(() => import("./app/form-elements/BasicElements"));

// const BasicTable = lazy(() => import("./app/tables/BasicTable"));

// const Mdi = lazy(() => import("./app/icons/Mdi"));

const Error404 = lazy(() => import("./app/error-pages/Error404"));
const Error500 = lazy(() => import("./app/error-pages/Error500"));
const BlankPage = lazy(() => import("./app/general-pages/BlankPage"));

const AppRoutes = (props) => {
  const {
    setting: { isLoged },
  } = useStorage();
  return (
    <Suspense fallback={<Spinner />}>
      <Switch>
        {!isLoged ? (
          <>
            <Route path="/register" component={Register} />
            <Route path="/activate" component={Activate} />
            <Route path="/login" component={Login} />
          </>
        ) : (
          <>
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/deposit" component={Deposit} />
            <Route exact path="/plans" component={Plans} />
          </>
        )}
      </Switch>
    </Suspense>
  );
};

export default AppRoutes;
