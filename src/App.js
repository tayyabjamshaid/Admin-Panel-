import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import BackgroundColorWrapper from "./components/BackgroundColorWrapper/BackgroundColorWrapper";
import AdminLayout from "layouts/Admin/Admin.js";
import Login from "components/Login/Login";
import PublicGroup from "views/PublicGroup";
import PrivateGroup from "views/PrivateGroup";

export default function App() {
  return (
    <BackgroundColorWrapper>
      <BrowserRouter forceRefresh={true}>
        <Switch>
          <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
          <Route
            path="/admin/public"
            render={(props) => <PublicGroup {...props} />}
          />

          <Route
            path="/admin/private"
            render={(props) => <PrivateGroup {...props} />}
          />

          <Route path="/signIn" render={(props) => <Login {...props} />} />

          <Redirect from="/" to="/admin/tables" />
        </Switch>
      </BrowserRouter>
    </BackgroundColorWrapper>
  );
}
