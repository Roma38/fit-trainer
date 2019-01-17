import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "../../components/Grid/GridItem";
import GridContainer from "../../components/Grid/GridContainer";
/* import Table from "../../components/Table/Table"; */
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import CardBody from "../../components/Card/CardBody";
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
import IconButton from "@material-ui/core/IconButton";
import ArrowUpwardOutlined from "@material-ui/icons/ArrowUpwardOutlined.js";
import ArrowDownwardOutlined from "@material-ui/icons/ArrowDownwardOutlined.js";
import CancelOutlined from "@material-ui/icons/CancelOutlined.js";

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
  wideSelect: {
    width: "100%"
  }
};

class EditExercises extends React.Component {
  state = {
    exercises: [
      { id: 1, name: "Exercise #1", measurement: "kilograms" },
      { id: 2, name: "Exercise #2", measurement: "minutes" },
      { id: 3, name: "Exercise #3", measurement: "kilograms" }
    ]
  };

  handleChange = (event, index) => {
    console.log(index);
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { classes } = this.props;
    return <Card>
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
                      id={`exerciseName${exercise.id}`}
                      formControlProps={{ fullWidth: true }}
                      inputProps={{
                        name: "exerciseName",
                        onChange: event => this.handleChange(event, index),
                        value: this.state.exercises[index].name
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <FormControl className={classes.formControl} fullWidth>
                      <InputLabel htmlFor="age-auto-width">
                        Measurement
                      </InputLabel>
                      <Select
                        value={this.state.exercises[index].measurement}
                        onChange={this.handleChange}
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
                    <IconButton className={classes.button}>
                      <ArrowUpwardOutlined />
                    </IconButton>
                    <IconButton className={classes.button}>
                      <ArrowDownwardOutlined />
                    </IconButton>
                    <IconButton className={classes.button}>
                      <CancelOutlined />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>;
  }
}

export default withStyles(styles)(EditExercises);
