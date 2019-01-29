/* eslint-disable */
import React from "react";
import PropTypes from "prop-types";
import { Switch, Route, Redirect } from "react-router-dom";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import Sidebar from "../../components/Sidebar/Sidebar.jsx";

import {
  dashboardRoutes,
  authDashboardRoutes
} from "../../routes/dashboard.jsx";

import { connect } from "react-redux";
import {
  authRequested,
  authSucceed,
  authFailed
} from "../../redux/actions/auth.js";

import dashboardStyle from "../../assets/jss/material-dashboard-react/layouts/dashboardStyle.jsx";

import image from "../../assets/img/sidebar-2.jpg";
import logo from "../../assets/img/reactlogo.png";
import axios from "axios";
import { API_HOST } from "../../config";

class AppComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileOpen: false
    };
    this.resizeFunction = this.resizeFunction.bind(this);
  }
  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };
  getRoute() {
    return this.props.location.pathname !== "/maps";
  }
  resizeFunction() {
    if (window.innerWidth >= 960) {
      this.setState({ mobileOpen: false });
    }
  }
  componentDidMount() {
    axios
      .get(`${API_HOST}user-data`)
      .then(({ data: { email, token } }) => {
        //console.log(res);
        this.props.authSucceed(email, token);
      })
      .catch(error => console.log(error)); //TODO: what to do with errors?

    if (navigator.platform.indexOf("Win") > -1) {
      const ps = new PerfectScrollbar(this.refs.mainPanel);
    }
    window.addEventListener("resize", this.resizeFunction);
  }
  componentDidUpdate(e) {
    if (e.history.location.pathname !== e.location.pathname) {
      this.refs.mainPanel.scrollTop = 0;
      if (this.state.mobileOpen) {
        this.setState({ mobileOpen: false });
      }
    }
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.resizeFunction);
  }
  render() {
    const { classes, ...rest } = this.props;
    const loggedIn = this.props.auth.loggedIn;
    const switchRoutes = (
      <Switch>
        {(loggedIn ? dashboardRoutes : authDashboardRoutes).map((prop, key) => {
          if (prop.redirect)
            return <Redirect from={prop.path} to={prop.to} key={key} />;
          return (
            <Route path={prop.path} component={prop.component} key={key} />
          );
        })}
      </Switch>
    );
    return (
      <div className={classes.wrapper}>
        <Sidebar
          routes={loggedIn ? dashboardRoutes : authDashboardRoutes}
          logoText={"Fit trainer"}
          logo={logo}
          image={image}
          handleDrawerToggle={this.handleDrawerToggle}
          open={this.state.mobileOpen}
          color="blue"
          {...rest}
        />
        <div className={classes.mainPanel} ref="mainPanel">
          <Switch>
            {(loggedIn ? dashboardRoutes : authDashboardRoutes).map(
              (prop, key) => {
                if (prop.redirect) return null;

                return (
                  <Route
                    path={prop.path}
                    render={routerProps => {
                      return (
                        <Header
                          routes={
                            loggedIn ? dashboardRoutes : authDashboardRoutes
                          }
                          handleDrawerToggle={this.handleDrawerToggle}
                          {...routerProps}
                        />
                      );
                    }}
                    key={key}
                  />
                );
              }
            )}
          </Switch>
          {/* On the /maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
          {this.getRoute() ? (
            <div className={classes.content}>
              <div className={classes.container}>{switchRoutes}</div>
            </div>
          ) : (
            <div className={classes.map}>{switchRoutes}</div>
          )}
          {this.getRoute() ? <Footer /> : null}
        </div>
      </div>
    );
  }
}

AppComponent.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = ({ auth }) => ({ auth });

const mapDispatchToProps = dispatch => ({
  authRequested: () => dispatch(authRequested()),
  authSucceed: (email, token) => dispatch(authSucceed(email, token)),
  authFailed: error => dispatch(authFailed(error))
});

const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppComponent);

export default withStyles(dashboardStyle)(App);
