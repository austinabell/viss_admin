import React  from "react";
import CustomerInfoForm from "./CustomerInfoForm";
import TaskInfoForm from "./TaskInfoForm";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AssignTechnicianInfo from "./AssignTechnicianForm";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from "@material-ui/core";
import { Mutation } from "react-apollo";
import { mergeDateTime } from "../../helpers/date";
import { EDIT_TASK_MUTATION } from "../../graphql/mutations";

const styles = {
  contentSection: {
    marginTop: 16
  }
};

function EditDialog({ classes, task, updateTask, open, onClose }) {
  function mutateEditedTask(editTaskMutation) {
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
    task.technicians = task.techniciansArr.map((t) => t.id);

    editTaskMutation({ variables: task })
      .then(function(res) {
        if (res.data.updateTask) {
          onClose();
        }
      })
      .catch((e) => console.warn(e.toString));
    onClose();
  }
  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Edit Task</DialogTitle>
      <DialogContent>
        <CustomerInfoForm task={task} updateTask={updateTask} editing />
        <TaskInfoForm
          task={task}
          updateTask={updateTask}
          className={classes.contentSection}
        />
        <AssignTechnicianInfo
          task={task}
          updateTask={updateTask}
          className={classes.contentSection}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Mutation
          mutation={EDIT_TASK_MUTATION}
          update={(cache, { data: { updateTask } }) => {
            console.log(updateTask);
            // const { allTasks } = cache.readQuery({ query: GET_TASKS });
            // cache.writeQuery({
            //   query: GET_TASKS,
            //   data: { allTasks: allTasks.concat([createTask]) }
            // });
          }}>
          {(editTaskMutation) => (
            <Button
              onClick={() => mutateEditedTask(editTaskMutation)}
              color="primary">
              Save
            </Button>
          )}
        </Mutation>
      </DialogActions>
    </Dialog>
  );
}

EditDialog.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EditDialog);
