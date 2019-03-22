import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import Geocode from "react-geocode";
import { withStyles } from "@material-ui/core/styles";
import {
  Paper,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography
} from "@material-ui/core";
import CustomerInfoForm from "./CustomerInfo";
import PaymentForm from "./TimingInfo";
import AssignTechnicianInfo from "./AssignTechnician";
import AddressConfirmDialog from "./AddressConfirmDialog";

const styles = (theme) => ({
  layout: {
    width: "auto",
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      marginTop: theme.spacing.unit * 6,
      marginBottom: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 3
    }
  },
  stepper: {
    padding: `${theme.spacing.unit * 3}px 0 ${theme.spacing.unit * 5}px`
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end"
  },
  button: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit
  }
});

Geocode.setApiKey(process.env.REACT_APP_MAPS_KEY);

const steps = ["Customer Details", "Task Details", "Select Technicians"];

function getStepContent(step, task, updateTask) {
  switch (step) {
    case 0:
      return <CustomerInfoForm task={task} updateTask={updateTask} />;
    case 1:
      return <PaymentForm />;
    case 2:
      return <AssignTechnicianInfo />;
    default:
      throw new Error("Unknown step");
  }
}

function AddDialogContent({ classes, handleClose }) {
  const [task, updateTask] = useState({
    name: "",
    address: "",
    addressError: "",
    cityError: "",
    city: "London",
    province: "ON",
    email: "",
    phone: ""
  });

  const [activeStep, changeStep] = useState(0);
  const [confirmDialogOpen, confirmDialogChange] = useState(false);
  const [formattedAddress, changeFormattedAddress] = useState("");

  function incrementStep() {
    switch (activeStep) {
      case 0:
        if (task.address === "" || task.city === "") {
          updateTask({
            ...task,
            addressError: task.address === "" ? "Address Cannot be empty" : "",
            cityError: task.city === "" ? "City Cannot be empty" : ""
          });
          return;
        }
        let queryString;
        if (task.city) {
          queryString = `${task.address}, ${task.city}, ${
            task.province
          } Canada`;
        } else {
          queryString = `${task.address}, ${task.province} Canada`;
        }
        // Handle geocoding
        Geocode.fromAddress(queryString).then(
          (response) => {
            const { lat, lng } = response.results[0].geometry.location;
            updateTask({ ...task, lat, lng });
            changeFormattedAddress(response.results[0].formatted_address);
            confirmDialogChange(true);
          },
          (error) => {
            updateTask({
              ...task,
              addressError: "Invalid Address"
            });
            console.warn(error);
          }
        );
        return;
      case 1:
        changeStep(activeStep + 1);
        return;
      case 2:
        // Handle creation of task
        return;
      default:
        return;
    }
  }

  function decrementStep() {
    if (activeStep === 0) {
      handleClose();
    } else {
      changeStep(activeStep - 1);
    }
  }

  function closeConfirmDialog(confirm) {
    if (confirm) {
      // Address was confirmed
      confirmDialogChange(false);
      changeStep(activeStep + 1);
    } else {
      // Address was cancelled
      changeFormattedAddress("");
      confirmDialogChange(false);
    }
  }

  return (
    <main className={classes.layout}>
      <Paper className={classes.paper}>
        <Typography component="h1" variant="h4" align="center">
          Add New Task
        </Typography>
        <Stepper activeStep={activeStep} className={classes.stepper}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Fragment>
          {getStepContent(activeStep, task, updateTask)}
          <div className={classes.buttons}>
            <Button onClick={decrementStep} className={classes.button}>
              {activeStep === 0 ? "Cancel" : "Back"}
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={incrementStep}
              className={classes.button}>
              {activeStep === steps.length - 1 ? "Create Task" : "Next"}
            </Button>
          </div>
        </Fragment>
      </Paper>
      <AddressConfirmDialog
        open={confirmDialogOpen}
        handleClose={closeConfirmDialog}
        address={formattedAddress}
      />
    </main>
  );
}

AddDialogContent.propTypes = {
  classes: PropTypes.object.isRequired,
  handleClose: PropTypes.func.isRequired
};

export default withStyles(styles)(AddDialogContent);
