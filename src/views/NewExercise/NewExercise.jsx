import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import CustomInput from "../../components/CustomInput/CustomInput";
import Button from "../../components/CustomButtons/Button";
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import CardBody from "../../components/Card/CardBody";
import CardFooter from "../../components/Card/CardFooter";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import Paper from "@material-ui/core/Paper";

import axios from "axios";
import { API_HOST } from "../../config";


const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  },
  alert: {
    position: "absolute",
    right: "20px",
    top: "40px",
    padding: "0 15px"
  }
};

class NewExercise extends React.Component {
  state = {
    newExercise: { exerciseName: "", measurement: "" },
    alert: { display: "none", isPositive: null }
  };

  handleChange = event => {
    this.setState({
      newExercise: {
        ...this.state.newExercise,
        [event.target.name]: event.target.value
      }
    });
  };

  addExercise = () => {
    axios
      .post(`${API_HOST}exercises`, { ...this.state.newExercise })
      .then(() => this.showAlert(true))
      .catch(error => {
        console.log(error);
        this.showAlert(false);
      });
  };

  showAlert = isPositive => {
    this.setState({
      alert: { display: "block", isPositive },
      newExercise: { exerciseName: "", measurement: "" }
    });
    setTimeout(() => {
      this.setState({
        alert: { display: "none", isPositive: null }
      });
    }, 2000);
  };

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
              ? "Your exercise was successfuly added"
              : "Oops, something went wrong"}
          </p>
        </Paper>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Create new exercise</h4>
            <p className={classes.cardCategoryWhite}>
              Please, add a new exercise name and measurement type
            </p>
          </CardHeader>
          <CardBody>
            <form className={classes.root} autoComplete="off">
              <CustomInput
                labelText="Exercise Name"
                id="exerciseName"
                formControlProps={{ fullWidth: true }}
                inputProps={{
                  name: "exerciseName",
                  onChange: this.handleChange,
                  value: this.state.newExercise.exerciseName
                }}
              />
              <FormControl fullWidth className={classes.formControl}>
                <InputLabel htmlFor="age-auto-width">
                  Measurement type
                </InputLabel>
                <Select
                  value={this.state.newExercise.measurement}
                  onChange={this.handleChange}
                  input={<Input name="measurement" id="age-auto-width" />}
                >
                  <MenuItem value="kilograms">kilograms</MenuItem>
                  <MenuItem value="meters">meters</MenuItem>
                  <MenuItem value="minutes">minutes</MenuItem>
                </Select>
              </FormControl>
            </form>
          </CardBody>
          <CardFooter>
            <Button onClick={this.addExercise} color="primary">
              Create exercise
            </Button>
          </CardFooter>
        </Card>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(NewExercise);
