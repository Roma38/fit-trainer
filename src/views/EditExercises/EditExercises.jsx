import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
/* import Table from "../../components/Table/Table"; */
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import CardBody from "../../components/Card/CardBody";
import CardFooter from "../../components/Card/CardFooter";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import CustomInput from "../../components/CustomInput/CustomInput";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Modal from "@material-ui/core/Modal";
import IconButton from "@material-ui/core/IconButton";
import Button from "../../components/CustomButtons/Button";
import ArrowUpwardOutlined from "@material-ui/icons/ArrowUpwardOutlined.js";
import ArrowDownwardOutlined from "@material-ui/icons/ArrowDownwardOutlined.js";
import CancelOutlined from "@material-ui/icons/CancelOutlined.js";

import { connect } from "react-redux";
import {
  exercisesLoadStart,
  exercisesLoadSucceed,
  exercisesLoadFailed
} from "../../redux/actions/exercises";
import clone from "clone";
import { axios } from "../../utils/axios/axios";

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

class EditExercisesComponent extends React.Component {
  state = {
    exercises: [],
    openModal: false,
    exIndex: null
  };

  handleChange = (event, index) => {
    const {
      target: { value, name }
    } = event;

    console.log("handleChange", value, name);

    this.setState(state => {
      const newExercises = clone(state.exercises);
      newExercises[index][name] = value;
      return {
        ...state,
        exercises: newExercises
      };
    });
  };

  moveUp = (event, index) => {
    if (index !== 0) {
      this.setState(state => {
        const newExercises = clone(state.exercises);
        [newExercises[index], newExercises[index - 1]] = [
          newExercises[index - 1],
          newExercises[index]
        ];
        return {
          ...state,
          exercises: newExercises
        };
      });
    }
  };

  moveDown = (event, index) => {
    if (index !== this.state.exercises.length - 1) {
      this.setState(state => {
        const newExercises = clone(state.exercises);
        [newExercises[index], newExercises[index + 1]] = [
          newExercises[index + 1],
          newExercises[index]
        ];
        return {
          ...state,
          exercises: newExercises
        };
      });
    }
  };

  delExercise = () => {
    console.log(this.state.exIndex);

    this.setState(state => {
      const newExercises = clone(state.exercises);
      newExercises.splice(state.exIndex, 1);
      return {
        ...state,
        exercises: newExercises,
        openModal: false,
        exIndex: null
      };
    });
  };

  componentDidMount() {
    const { exercisesLoadStart, exercisesLoadSucceed } = this.props;
    exercisesLoadStart();
    axios
      .get("/exercises")
      .then(exercises => {
        console.log("exercises loaded", exercises);
        exercisesLoadSucceed(exercises);
        this.setState({ exercises });
        /* this.setState({ exersices: exersices }); */
      })
      .catch((error) => { console.log(error) });
  }

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.openModal} /* onClose={this.handleClose} */
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
            <h4 className={classes.cardTitleWhite}>Edit exercises</h4>
          </CardHeader>
          <CardBody>
            <Table>
              <TableBody>
                {this.state.exercises.map((exercise, index) => (
                  <TableRow key={exercise.id}>
                    <TableCell>
                      <CustomInput
                        labelText="Exercise Name"
                        id={`exercise-name-${exercise.id}`}
                        formControlProps={{ fullWidth: true }}
                        inputProps={{
                          name: "name",
                          onChange: event => this.handleChange(event, index),
                          value: exercise.name
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <FormControl className={classes.formControl} fullWidth>
                        <InputLabel htmlFor="age-auto-width">
                          Measurement
                        </InputLabel>
                        <Select
                          value={exercise.measurement}
                          onChange={event => this.handleChange(event, index)}
                          input={
                            <Input name="measurement" id="age-auto-width" />
                          }
                        >
                          /* autoWidth */
                          <MenuItem value="kilograms">kilograms</MenuItem>
                          <MenuItem value="meters">meters</MenuItem>
                          <MenuItem value="minutes">minutes</MenuItem>
                        </Select>
                      </FormControl>
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
            <CardFooter>
              <Button color="primary">Save exercises</Button>
            </CardFooter>
          </CardBody>
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

const EditExercises = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditExercisesComponent);

export default withStyles(styles)(EditExercises);
