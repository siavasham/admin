import React, { Suspense, lazy } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import useStorage from "reducer";

import Spinner from "./app/shared/Spinner";

const Dashboard = lazy(() => import("route/dashboard/dashboard"));
const Register = lazy(() => import("route/sign/register"));
const Activate = lazy(() => import("route/sign/activate"));
const Login = lazy(() => import("route/sign/login"));

const Buttons = lazy(() => import("./app/basic-ui/Buttons"));
const Dropdowns = lazy(() => import("./app/basic-ui/Dropdowns"));
const Typography = lazy(() => import("./app/basic-ui/Typography"));

const BasicElements = lazy(() => import("./app/form-elements/BasicElements"));

const BasicTable = lazy(() => import("./app/tables/BasicTable"));

const Mdi = lazy(() => import("./app/icons/Mdi"));

const ChartJs = lazy(() => import("./app/charts/ChartJs"));

const Error404 = lazy(() => import("./app/error-pages/Error404"));
const Error500 = lazy(() => import("./app/error-pages/Error500"));


const BlankPage = lazy(() => import("./app/general-pages/BlankPage"));


const AppRoutes = (props) => {
  const { setting: { isLoged } } = useStorage();
  return (
    <Suspense fallback={<Spinner />}>
      <Switch>
        {!isLoged
          ?
          <>
            <Route path="/register" component={Register} />
            <Route path="/activate" component={Activate} />
            <Route path="/login" component={Login} />

            <Redirect to="/login" />
          </>
          :
          <>
            <Route exact path="/dashboard" component={Dashboard} />
            <Route path="/basic-ui/buttons" component={Buttons} />
            <Route path="/basic-ui/dropdowns" component={Dropdowns} />
            <Route path="/basic-ui/typography" component={Typography} />

            <Route path="/basic-elements" component={BasicElements} />

            <Route path="/tables/basic-table" component={BasicTable} />

            <Route path="/mdi" component={Mdi} />

            <Route path="/charts/chart-js" component={ChartJs} />

            <Route path="/error-pages/error-404" component={Error404} />
            <Route path="/error-pages/error-500" component={Error500} />

            <Route path="/general-pages/blank-page" component={BlankPage} />

            <Redirect to="/dashboard" />
          </>
        }
      </Switch>
    </Suspense>
  );
}

export default AppRoutes;
