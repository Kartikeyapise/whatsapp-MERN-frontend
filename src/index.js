// import React from 'react';
import { Route, Redirect, Switch } from "react-router-dom";
import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.css";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <React.Fragment>
        <Switch>
          <Route path="/home" component={App} />
          <Route path="/login" component={LoginForm} />
          <Route path="/register" component={RegisterForm} />

          {/* <ProtectedRoute path="/movies/:id" component={MovieForm} />
        <Route
          path="/movies"
          render={props => <Movies {...props} user={this.state.user} />}
        /> */}
          <Redirect from="/" exact to="/login" />

          <Redirect to="/not-found" />
        </Switch>
      </React.Fragment>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
