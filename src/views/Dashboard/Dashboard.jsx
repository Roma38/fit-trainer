import React from "react";
import PropTypes from "prop-types";
// react plugin for creating charts
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import {
  Calendar,
  withMultipleDates,
  defaultMultipleDateInterpolation
} from "react-infinite-calendar";
import InfiniteCalendar from "react-infinite-calendar";
import "react-infinite-calendar/styles.css";

import {
  workoutsLoadStart,
  workoutsLoadSucceed,
  workoutsLoadFailed
} from "../../redux/actions/workouts";
import { axios } from "../../utils/axios/axios";
import { connect } from "react-redux";

import dashboardStyle from "../../assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

class DashboardComponent extends React.Component {
  onSelect(val) {
    console.log(val.getTime());
  }

  componentDidMount() {
    const { workoutsLoadStart, workoutsLoadSucceed } = this.props;
    workoutsLoadStart();
    axios
      .get("/workouts")
      .then(workouts => {
        workoutsLoadSucceed(workouts);
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const today = new Date();
    return (
      <InfiniteCalendar
        Component={withMultipleDates(Calendar)}
        width={400}
        height={600}
        selected={this.props.workouts.items.map(item => new Date(item.date))}
        onSelect={this.onSelect}
        minDate={today}
        interpolateSelection={defaultMultipleDateInterpolation}
      />
    );
  }
}

const mapStateToProps = ({ workouts }) => ({ workouts });

const mapDispatchToProps = dispatch => ({
  workoutsLoadStart: () => dispatch(workoutsLoadStart()),
  workoutsLoadSucceed: workouts => dispatch(workoutsLoadSucceed(workouts)),
  workoutsLoadFailed: error => dispatch(workoutsLoadFailed(error))
});

const Dashboard = connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardComponent);

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Dashboard);
