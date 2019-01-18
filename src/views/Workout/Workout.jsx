import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "../../components/Grid/GridItem";
import GridContainer from "../../components/Grid/GridContainer";
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

import { connect } from "react-redux";

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
  }
};

class WorkoutComponent extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <Card>
        <CardHeader color="primary">
          <h4 className={classes.cardTitleWhite}>Edit workout</h4>
        </CardHeader>
        <CardBody>
          <Button color="primary">Add exercise</Button>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>
                  <FormControl fullWidth className={classes.formControl}>
                    <InputLabel htmlFor="age-auto-width">
                      Exercise
                    </InputLabel>
                    <Select
                      value=""
                      onChange={this.handleChange}
                      input={<Input name="measurement" id="age-auto-width" />}
                    >
                      {this.props.exercises.items.map((exercise, index) => (
                        <MenuItem key={index} value={exercise.name}>
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
                      name: "exerciseName",
                      onChange: this.handleChange,
                      type: "number"
                    }}
                  />
                </TableCell>
                <TableCell>
                  <CustomInput
                    labelText="Measurement"
                    id="exerciseName"
                    formControlProps={{ fullWidth: true }}
                    inputProps={{
                      name: "exerciseName",
                      onChange: this.handleChange,
                      type: "number"
                    }}
                  />
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
            </TableBody>
          </Table>
        </CardBody>
        <CardFooter>
          <Button color="primary">Update workout</Button>
        </CardFooter>
      </Card>
    );
  }
}

const mapStateToProps = ({ exercises }) => ({ exercises });

const Workout = connect(mapStateToProps)(WorkoutComponent);

export default withStyles(styles)(Workout);
