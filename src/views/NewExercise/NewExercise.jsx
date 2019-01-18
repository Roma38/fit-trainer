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
  }
};

class NewExercise extends React.Component {
  state = {
    exerciseName: "",
    measurement: ""
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { classes } = this.props;
    return (
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
              inputProps={{ name: "exerciseName", onChange: this.handleChange }}
            />
            <FormControl fullWidth className={classes.formControl}>
              <InputLabel htmlFor="age-auto-width">Measurement type</InputLabel>
              <Select
                value={this.state.measurement}
                onChange={this.handleChange}
                input={<Input name="measurement" id="age-auto-width" />}
              >
                /* autoWidth */
                <MenuItem value="kilograms">kilograms</MenuItem>
                <MenuItem value="meters">meters</MenuItem>
                <MenuItem value="minutes">minutes</MenuItem>
              </Select>
            </FormControl>
          </form>
        </CardBody>
        <CardFooter>
          <Button color="primary">Create exercise</Button>
          <p>
            {this.state.measurement} --- {this.state.exerciseName}
          </p>
        </CardFooter>
      </Card>
    );
  }
}

export default withStyles(styles)(NewExercise);
