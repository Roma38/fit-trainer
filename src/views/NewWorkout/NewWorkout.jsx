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
import { addWorkout } from "../../redux/actions/workouts";
import { axios } from "../../utils/axios/axios";
import clone from "clone";
import { withRouter } from "react-router-dom";


const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  },
  modalStyles: {
    position: "absolute",
    width: "350px",
    backgroundColor: "white",
    /* boxShadow: theme.shadows[5], */
    padding: "15px",
    outline: "none"
  },
  alert: {
    position: "absolute",
    right: "20px",
    top: "40px",
    padding: "0 15px"
  }
};

class NewWorkoutComponent extends React.Component {
  state = {
    openModal: false,
    exIndex: null,
    alert: { display: "none", isPositive: null },
    workout: [{ exerciseId: "", repeats: 0, measurement: 0 }]
  };

  addExercise = () => {
    this.setState({
      workout: [
        ...this.state.workout,
        { exerciseId: "", repeats: 0, measurement: 0 }
      ]
    });
  };

  getMeasureType = exerciseId => {
    if (!exerciseId) {
      return null;
    }
    const exercise = this.props.exercises.items.find(
      item => item.id === exerciseId
    );
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
      /* if (name === "exerciseId") {
        const exercise = this.props.exercises.items.find(
          item => item.id === value
        );
        switch (exercise.measurement) {
          case "kilograms":
            newWorkout[index].measurementType = "kg";
            break;
          case "meters":
            newWorkout[index].measurementType = "m";
            break;
          case "minutes":
            newWorkout[index].measurementType = "min";
            break;

          default:
            break;
        }
      } */
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
    setTimeout(() => {
      this.setState({
        alert: { display: "none", isPositive: null },
        newExercise: { exerciseName: "", measurement: "" }
      });
    }, 2000);
  };

  createWorkout = () => {
    const workout = {
      date: +this.props.match.params.date,
      program: this.state.workout
    };
    axios
      .post("/add-workout", workout)
      .then(response => {
        console.log(response);
        this.props.addWorkout(workout);
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
    const {
      exercisesLoadStart,
      exercisesLoadSucceed,
      exercisesLoadFailed
    } = this.props;
    exercisesLoadStart();
    axios
      .get("/exercises")
      .then(exercises => {
        exercisesLoadSucceed(exercises);
      })
      .catch(error => {
        exercisesLoadFailed(error);
        console.log(error);
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
              ? "Your exercises was successfuly updated"
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
            <h4 className={classes.cardTitleWhite}>New workout</h4>
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
                          value={item.exerciseId}
                          onChange={event => this.handleChange(event, index)}
                          input={
                            <Input name="exerciseId" id="age-auto-width" />
                          }
                        >
                          {this.props.exercises.items.map((exercise, index) => (
                            <MenuItem key={index} value={exercise.id}>
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
                      <span>{this.getMeasureType(item.exerciseId)}</span>
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
            <Button onClick={this.createWorkout} color="primary">
              Create workout
            </Button>
          </CardFooter>
        </Card>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ exercises }) => ({ exercises });

const mapDispatchToProps = dispatch => ({
  exercisesLoadStart: () => dispatch(exercisesLoadStart()),
  exercisesLoadSucceed: exercises => dispatch(exercisesLoadSucceed(exercises)),
  exercisesLoadFailed: error => dispatch(exercisesLoadFailed(error)),
  addWorkout: workout => dispatch(addWorkout(workout))
});

const NewWorkout = connect(
  mapStateToProps,
  mapDispatchToProps
)(NewWorkoutComponent);

const NewWorkoutWithRouter = withRouter(NewWorkout);

export default withStyles(styles)(NewWorkoutWithRouter);
