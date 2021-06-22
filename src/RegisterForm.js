import React from "react";
import { Redirect } from "react-router-dom";
import Joi from "joi-browser";
import Form from "./common/form";
import auth from "./services/authService";
import { apiUrl } from "./config.json";

class LoginForm extends Form {
  state = {
    data: { name: "", email: "", password: "" },
    errors: {},
  };

  schema = {
    name: Joi.string().required().label("name"),
    email: Joi.string().required().label("email"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      await auth.register(data.name, data.email, data.password);
      console.log("registered successful");
      // const { state } = this.props.location;
      // window.location = state ? state.from.pathname : "/";
      //   console.log("*********************my token*************", auth.getJwt());
      window.location = "/home";
    } catch (ex) {
      window.location = "/login";

      // if (ex.response && ex.response.status === 400) {
      //   const errors = { ...this.state.errors };
      //   errors.email = ex.response.data;
      //   this.setState({ errors });
      // }
    }
  };

  render() {
    // if (auth.getCurrentUser()) return <Redirect to="/" />;

    return (
      <>
        <div
          className="container d-flex justify-content-center align-items-center"
          style={{ height: "80vh" }}
        >
          <div>
            <div className="d-flex justify-content-center align-items-center mb-5">
              <button
                className="btn btn-secondary btn-lg mx-1"
                onClick={() => {
                  window.location = "/login";
                }}
              >
                LOGIN
              </button>
              <button
                className="btn btn-secondary btn-lg mx-1"
                onClick={() => {
                  window.location = "/register";
                }}
              >
                REGISTER
              </button>
            </div>
            <h1>Register</h1>
            <form onSubmit={this.handleSubmit}>
              {this.renderInput("name", "name")}
              {this.renderInput("email", "email")}
              {this.renderInput("password", "Password", "password")}
              {this.renderButton("Register")}
            </form>
          </div>
        </div>
      </>
    );
  }
}

export default LoginForm;
