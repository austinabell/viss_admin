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
import { Mutation } from "react-apollo";
import moment from "moment";
import CustomerInfoForm from "./CustomerInfoForm";
import TaskInfoForm from "./TaskInfoForm";
import AssignTechnicianInfo from "./AssignTechnicianForm";
import AddressConfirmDialog from "./AddressConfirmDialog";
import { mergeDateTime } from "../../helpers/date";
import { ADD_TASK_MUTATION } from "../../graphql/mutations";
import { GET_TASKS } from "../../graphql/queries";

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
      return (
        <Fragment>
          <Typography variant="h6" gutterBottom>
            Customer Details
          </Typography>
          <CustomerInfoForm task={task} updateTask={updateTask} />
        </Fragment>
      );
    case 1:
      return (
        <Fragment>
          <Typography variant="h6" gutterBottom>
            Task Details
          </Typography>
          <TaskInfoForm task={task} updateTask={updateTask} />
        </Fragment>
      );
    case 2:
      return <AssignTechnicianInfo task={task} updateTask={updateTask} />;
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
    duration: 0,
    email: "",
    phone: "",
    notes: "",
    date: moment(),
    windowStart: moment("2000-01-01T09:00:00"),
    windowEnd: moment("2000-01-01T17:00:00"),
    isAllDay: false,
    techniciansArr: [],
    technicians: [],
    durationString: "00:00"
  });

  const [activeStep, changeStep] = useState(0);
  const [confirmDialogOpen, confirmDialogChange] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [formattedAddress, changeFormattedAddress] = useState("");

  function incrementStep(addTaskMutation) {
    switch (activeStep) {
      case 0:
        if (task.address.length < 4 || task.city === "") {
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
        task.windowStart = mergeDateTime(task.date, task.windowStart);
        task.windowEnd = mergeDateTime(task.date, task.windowEnd);
        const durationArr = task.durationString.split(":");
        try {
          task.duration =
            parseInt(durationArr[0], 10) * 60 + parseInt(durationArr[1], 10);
        } catch (err) {
          console.warn(err);
          return;
        }
        changeStep(activeStep + 1);
        return;
      case 2:
        // Handle creation of task
        task.technicians = task.techniciansArr.map((t) => t.id);
        setSubmitting(true);
        addTaskMutation({ variables: task })
          .then(function(res) {
            if (res.data.createTask) {
              handleClose();
            }
          })
          .catch((e) => setError(e.toString));
        setSubmitting(false);
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
          {error && <Typography>Error in creating task: {error}</Typography>}
          <div className={classes.buttons}>
            <Button onClick={decrementStep} className={classes.button}>
              {activeStep === 0 ? "Cancel" : "Back"}
            </Button>
            <Mutation
              mutation={ADD_TASK_MUTATION}
              update={(cache, { data: { createTask } }) => {
                const { allTasks } = cache.readQuery({ query: GET_TASKS });
                cache.writeQuery({
                  query: GET_TASKS,
                  data: { allTasks: allTasks.concat([createTask]) }
                });
              }}>
              {(addTaskMutation) => (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={
                    !submitting ? () => incrementStep(addTaskMutation) : null
                  }
                  className={classes.button}>
                  {activeStep === steps.length - 1 ? "Create Task" : "Next"}
                </Button>
              )}
            </Mutation>
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
