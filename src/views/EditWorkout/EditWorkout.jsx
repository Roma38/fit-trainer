import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import CardBody from "../../components/Card/CardBody";
import CardFooter from "../../components/Card/CardFooter";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import CustomInput from "../../components/CustomInput/CustomInput";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import ArrowUpwardOutlined from "@material-ui/icons/ArrowUpwardOutlined.js";
import ArrowDownwardOutlined from "@material-ui/icons/ArrowDownwardOutlined.js";
import CheckCircle from "@material-ui/icons/CheckCircle.js";
import CancelOutlined from "@material-ui/icons/CancelOutlined.js";
import Button from "../../components/CustomButtons/Button";
import Modal from "@material-ui/core/Modal";
import Paper from "@material-ui/core/Paper";

import { connect } from "react-redux";
import {
  exercisesLoadStart,
  exercisesLoadSucceed,
  exercisesLoadFailed
} from "../../redux/actions/exercises";
import { updateWorkout } from "../../redux/actions/workouts";
import axios from "axios";
import clone from "clone";
import { withRouter } from "react-router-dom";
import { API_HOST } from "../../config";

import {
  cardCategoryWhite,
  cardTitleWhite,
  alert,
  modalStyles
} from "../../styles/styles.js";

const styles = {
  cardCategoryWhite,
  cardTitleWhite,
  alert,
  modalStyles
};

class EditWorkoutComponent extends React.Component {
  state = {
    openModal: false,
    exIndex: null,
    alert: { display: "none", isPositive: null },
    workout:
      this.props.workouts.items.length && +this.props.match.params.date
        ? this.props.workouts.items.find(
            ({ date }) =>
              new Date(date).getTime() === +this.props.match.params.date
          ).program
        : []
  };

  addExercise = () => {
    this.setState({
      workout: [
        ...this.state.workout,
        { exercise_id: "", repeats: 0, measurement: 0 }
      ]
    });
  };

  getMeasureType = exerciseId => {
    const exercise = this.props.exercises.items.find(
      item => item._id === exerciseId
    );
    if (!exercise) {
      return null;
    }
    switch (exercise.measurement) {
      case "kilograms":
        return "kg";
      case "meters":
        return "m";
      case "minutes":
        return "min";
      default:
        break;
    }
  };

  handleChange = (event, index) => {
    const {
      target: { value, name }
    } = event;

    this.setState(state => {
      const newWorkout = clone(state.workout);
      newWorkout[index][name] = value;
      return { ...state, workout: newWorkout };
    });
  };

  delExercise = () => {
    this.setState(state => {
      const newWorkout = clone(state.workout);
      newWorkout.splice(state.exIndex, 1);
      return { ...state, workout: newWorkout, openModal: false, exIndex: null };
    });
  };

  moveUp = (event, index) => {
    if (index !== 0) {
      this.setState(state => {
        const newWorkout = clone(state.workout);
        [newWorkout[index], newWorkout[index - 1]] = [
          newWorkout[index - 1],
          newWorkout[index]
        ];
        return { ...state, workout: newWorkout };
      });
    }
  };

  moveDown = (event, index) => {
    if (index !== this.state.workout.length - 1) {
      this.setState(state => {
        const newWorkout = clone(state.workout);
        [newWorkout[index], newWorkout[index + 1]] = [
          newWorkout[index + 1],
          newWorkout[index]
        ];
        return { ...state, workout: newWorkout };
      });
    }
  };

  showAlert = isPositive => {
    this.setState({ alert: { display: "block", isPositive } });
    this.hideAlertTimeout = setTimeout(() => {
      this.setState({
        alert: { display: "none", isPositive: null },
        newExercise: { exerciseName: "", measurement: "" }
      });
    }, 2000);
  };

  componentWillUnmount() {
    clearTimeout(this.hideAlertTimeout);
  }

  updateWorkout = () => {
    const workout = {
      date: +this.props.match.params.date,
      program: this.state.workout
    };
    axios
      .put(`${API_HOST}workouts`, workout)
      .then(({ data }) => {
        this.props.updateWorkout(data);
        this.showAlert(true);
      })
      .catch(error => {
        console.log(error);
        this.showAlert(false);
      });
  };

  componentDidMount() {
    if (this.props.match.params.date === ":date") {
      this.props.history.push(`/dashboard`);
    }

    const { exercisesLoadStart, exercisesLoadSucceed } = this.props;
    exercisesLoadStart();
    axios
      .get(`${API_HOST}exercises`)
      .then(({ data }) => {
        exercisesLoadSucceed(data);
      })
      .catch(error => {
        console.log(error);
        exercisesLoadFailed(error);
      });
  }

  render() {
    const { classes } = this.props;
    const { alert } = this.state;

    return (
      <React.Fragment>
        <Paper
          className={classes.alert}
          elevation={1}
          style={{
            display: alert.display,
            color: alert.isPositive ? "green" : "red"
          }}
        >
          <p>
            {alert.isPositive
              ? "Your workout was successfuly updated"
              : "Oops, something went wrong"}
          </p>
        </Paper>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.openModal}
        >
          <div style={styles.modalStyles}>
            <p>Are you sure wanna delete this exercise?</p>
            <IconButton onClick={this.delExercise}>
              <CheckCircle />
            </IconButton>
            <IconButton
              onClick={() =>
                this.setState({
                  openModal: false,
                  exIndex: null
                })
              }
            >
              <CancelOutlined />
            </IconButton>
          </div>
        </Modal>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Edit workout</h4>
          </CardHeader>
          <CardBody>
            <Button onClick={this.addExercise} color="primary">
              Add exercise
            </Button>
            <Table>
              <TableBody>
                {this.state.workout.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <FormControl fullWidth className={classes.formControl}>
                        <InputLabel htmlFor="age-auto-width">
                          Exercise
                        </InputLabel>
                        <Select
                          value={item.exercise_id}
                          onChange={event => this.handleChange(event, index)}
                          input={
                            <Input name="exercise_id" id="age-auto-width" />
                          }
                        >
                          {this.props.exercises.items.map((exercise, index) => (
                            <MenuItem key={index} value={exercise._id}>
                              {exercise.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </TableCell>
                    <TableCell>
                      <CustomInput
                        labelText="Repeats"
                        id="exerciseName"
                        formControlProps={{ fullWidth: true }}
                        inputProps={{
                          min: 0,
                          name: "repeats",
                          onChange: event => this.handleChange(event, index),
                          type: "number",
                          value: item.repeats
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <CustomInput
                        labelText="Measurement"
                        id="exerciseName"
                        formControlProps={{ fullWidth: true }}
                        inputProps={{
                          name: "measurement",
                          onChange: event => this.handleChange(event, index),
                          type: "number",
                          value: item.measurement
                        }}
                      />
                      <span>{this.getMeasureType(item.exercise_id)}</span>
                    </TableCell>
                    <TableCell>
                      <IconButton
                        className={classes.button}
                        onClick={event => this.moveUp(event, index)}
                      >
                        <ArrowUpwardOutlined />
                      </IconButton>
                      <IconButton
                        className={classes.button}
                        onClick={event => this.moveDown(event, index)}
                      >
                        <ArrowDownwardOutlined />
                      </IconButton>
                      <IconButton
                        className={classes.button}
                        onClick={() =>
                          this.setState({
                            openModal: true,
                            exIndex: index
                          })
                        }
                      >
                        <CancelOutlined />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardBody>
          <CardFooter>
            <Button onClick={this.updateWorkout} color="primary">
              Update workout
            </Button>
          </CardFooter>
        </Card>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ exercises, workouts }) => ({ exercises, workouts });

const mapDispatchToProps = dispatch => ({
  exercisesLoadStart: () => dispatch(exercisesLoadStart()),
  exercisesLoadSucceed: exercises => dispatch(exercisesLoadSucceed(exercises)),
  exercisesLoadFailed: error => dispatch(exercisesLoadFailed(error)),
  updateWorkout: workout => dispatch(updateWorkout(workout))
});

const EditWorkout = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditWorkoutComponent);

const EditWorkoutWithRouter = withRouter(EditWorkout);

export default withStyles(styles)(EditWorkoutWithRouter);
