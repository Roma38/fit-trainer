import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import CustomInput from "../../components/CustomInput/CustomInput";
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import CardBody from "../../components/Card/CardBody";
import Paper from "@material-ui/core/Paper";

import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  authRequested,
  authSucceed,
  authFailed
} from "../../redux/actions/auth.js";
import axios from "axios";
import { API_HOST } from "../../config";

import {
  cardCategoryWhite,
  cardTitleWhite,
  alert,
  uiButton
} from "../../styles/styles.js";

const styles = {
  cardCategoryWhite,
  cardTitleWhite,
  alert,
  uiButton
};

class SignInComponent extends React.Component {
  state = {
    alert: { display: "none", text: "" },
    userData: { email: "", password: "", repeatPassword: "" }
  };

  showAlert = text => {
    this.setState({ alert: { display: "block", text } });
    setTimeout(() => {
      this.setState({
        alert: { display: "none", text: "" }
      });
    }, 2000);
  };

  handleChange = event => {
    this.setState({
      userData: {
        ...this.state.userData,
        [event.target.name]: event.target.value
      }
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { password, repeatPassword } = this.state.userData;
    if (password !== repeatPassword) {
      return this.showAlert("Password fields doesn't match!!!");
    }
    this.props.authRequested();
    axios
      .post(`${API_HOST}sign-up`, this.state.userData)
      .then(({ data }) => {
        localStorage.setItem("token", data.token);
        this.props.authSucceed(data.email, data.token);
      })
      .catch(({ response: { data: { error } } }) => {
        this.showAlert(error);
        this.props.authFailed(error);
      });
  };

  render() {
    const { classes } = this.props;
    const { alert } = this.state;

    return (
      <React.Fragment>
        <Paper
          className={classes.alert}
          elevation={1}
          style={{ display: alert.display, color: "red" }}
        >
          <p>{alert.text}</p>
        </Paper>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>
              Register with Fit Trainer App
            </h4>
            <p className={classes.cardCategoryWhite}>
              Please, enter your email and password
            </p>
          </CardHeader>
          <CardBody>
            <form
              className={classes.root}
              autoComplete="off"
              onSubmit={this.handleSubmit}
            >
              <CustomInput
                labelText="Email address"
                id="email"
                formControlProps={{ fullWidth: true }}
                inputProps={{
                  name: "email",
                  onChange: this.handleChange,
                  type: "email",
                  required: true
                }}
              />
              <CustomInput
                labelText="Password"
                id="password"
                formControlProps={{ fullWidth: true }}
                inputProps={{
                  name: "password",
                  onChange: this.handleChange,
                  type: "password",
                  required: true
                }}
              />
              <CustomInput
                labelText="Repeat password"
                id="repeatPassword"
                formControlProps={{ fullWidth: true }}
                inputProps={{
                  name: "repeatPassword",
                  onChange: this.handleChange,
                  type: "password",
                  required: true
                }}
              />
              <Link to="/sign-in">already have an account? sign-in</Link>
              <br />
              <button className={classes.uiButton}>ok</button>
            </form>
          </CardBody>
        </Card>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  authRequested: () => dispatch(authRequested()),
  authSucceed: (email, token) => dispatch(authSucceed(email, token)),
  authFailed: error => dispatch(authFailed(error))
});

const SignIn = connect(
  null,
  mapDispatchToProps
)(SignInComponent);

export default withStyles(styles)(SignIn);
