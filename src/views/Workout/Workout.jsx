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
import CancelOutlined from "@material-ui/icons/CancelOutlined.js";
import Button from "../../components/CustomButtons/Button";
import Modal from "@material-ui/core/Modal";

import { connect } from "react-redux";
import {
  exercisesLoadStart,
  exercisesLoadSucceed,
  exercisesLoadFailed
} from "../../redux/actions/exercises";
import { axios } from "../../utils/axios/axios";
import clone from "clone";

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
  }
};

class WorkoutComponent extends React.Component {
  state = {
    openModal: false,
    exIndex: null,
    workout: [
      { exerciseId: "", repeats: 0, measurement: 0, measurementType: "" }
    ]
  };

  addExercise = () => {
    this.setState({
      workout: [
        ...this.state.workout,
        { exerciseId: "", repeats: 0, measurement: 0, measurementType: "" }
      ]
    });
  };

  handleChange = (event, index) => {
    const {
      target: { value, name }
    } = event;

    this.setState(state => {
      const newWorkout = clone(state.workout);
      newWorkout[index][name] = value;
      if (name === "exerciseId") {
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
      }
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

  componentDidMount() {
    const { exercisesLoadStart, exercisesLoadSucceed } = this.props;
    exercisesLoadStart();
    axios
      .get("/exercises")
      .then(exercises => {
        exercisesLoadSucceed(exercises);
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.openModal}
        >
          <div style={styles.modalStyles}>
            <p>Are you sure wanna delete this exercise?</p>
            <IconButton onClick={this.delExercise}>
              <CancelOutlined />
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
                      <span>{item.measurementType}</span>
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
            <Button
              onClick={() => console.log(this.state.workout)}
              color="primary"
            >
              Update workout
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
  exercisesLoadFailed: error => dispatch(exercisesLoadFailed(error))
});

const Workout = connect(
  mapStateToProps,
  mapDispatchToProps
)(WorkoutComponent);

export default withStyles(styles)(Workout);
