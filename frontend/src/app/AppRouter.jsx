import React from "react";
import PropTypes from "prop-types";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import LoginPage from "../login/LoginPage";
import HomePage from "../general/HomePage";

export default class AppRouter extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      handleLogin,
      handleLogout,
      authenticated,
      getBeans,
      admin
    } = this.props;
    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/Login"
            render={() => <LoginPage handleLogin={handleLogin} />}
          />
          <ProtectedRoute
            path="/Home"
            getBeans={getBeans}
            authenticated={authenticated}
            render={() => {
              return <HomePage authenticated={authenticated} />;
            }}
          />
          <Route path="/">
            <Redirect to={{ pathname: "/login" }} />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

AppRouter.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  handleLogout: PropTypes.func.isRequired,
  // authenticated: PropTypes.bool.isRequired,
  admin: PropTypes.bool.isRequired
};