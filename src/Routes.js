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

const Dashboard = lazy(() => import("route/dashboard/dashboard"));
const Wallet = lazy(() => import("route/wallet/wallet"));
const WalletMng = lazy(() => import("route/wallet/manage"));
const Plans = lazy(() => import("route/plans/plans"));
const Referral = lazy(() => import("route/referral/referral"));
const Candle = lazy(() => import("route/candle/candle"));
const Profile = lazy(() => import("route/profile/profile"));
const Ticket = lazy(() => import("route/ticket/ticket"));
const NewTicket = lazy(() => import("route/ticket/newTicket"));
const ViewTicket = lazy(() => import("route/ticket/viewTicket"));
const Register = lazy(() => import("route/sign/register"));
const Activate = lazy(() => import("route/sign/activate"));
const Login = lazy(() => import("route/sign/login"));
const Forget = lazy(() => import("route/sign/forget"));

const route = {
  home: [
    { path: "/dashboard", component: Dashboard },
    { path: "/wallet", component: Wallet },
    { path: "/wallet/:coin", component: WalletMng },
    { path: "/plans", component: Plans },
    { path: "/referral", component: Referral },
    { path: "/candle", component: Candle },
    { path: "/ticket", component: Ticket },
    { path: "/profile", component: Profile },
    { path: "/ticket/new", component: NewTicket },
    { path: "/ticket/view/:id", component: ViewTicket },
  ],
  sign: [
    { path: "/register", component: Register },
    { path: "/activate", component: Activate },
    { path: "/login", component: Login },
    { path: "/forget", component: Forget },
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
