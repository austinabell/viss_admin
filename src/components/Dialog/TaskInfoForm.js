import React, { Fragment } from "react";
import {
  Grid,
  FormControlLabel,
  Switch,
  TextField,
  InputAdornment
} from "@material-ui/core";
import moment from "moment";
import TimeField from "react-simple-timefield";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import { InlineDatePicker, InlineTimePicker } from "material-ui-pickers";

function TaskInfoForm({ task, updateTask }) {
  if (!moment.isMoment(task.windowStart)) {
    task.windowStart = moment.unix(task.windowStart / 1000);
  }
  if (!moment.isMoment(task.windowEnd)) {
    task.windowEnd = moment.unix(task.windowEnd / 1000);
  }
  if (!task.date) {
    task.date = task.windowStart;
  } else if (!moment.isMoment(task.date)) {
    task.date = moment.unix(task.date / 1000);
  }
  return (
    <Grid container spacing={24}>
      <Grid item xs={6}>
        <InlineDatePicker
          keyboard
          clearable
          variant="outlined"
          label="Date"
          value={task.date}
          onChange={(date) => updateTask({ ...task, date })}
          format={"MM/DD/YYYY"}
          mask={[/\d/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/]}
        />
      </Grid>
      <Grid item xs={6}>
        <TimeField
          value={task.durationString || "00:00"}
          onChange={(durationString) => updateTask({ ...task, durationString })}
          input={
            <TextField
              fullWidth
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">Hours</InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">Minutes</InputAdornment>
                )
              }}
            />
          }
        />
      </Grid>
      <Grid item xs={12}>
        <Grid container justify="center">
          <FormControlLabel
            control={
              <Switch
                checked={task.isAllDay}
                onChange={() =>
                  updateTask({ ...task, isAllDay: !task.isAllDay })
                }
                value="isAllDay"
              />
            }
            label="All Day"
          />
        </Grid>
      </Grid>
      {!task.isAllDay && (
        <Fragment>
          <Grid item xs={6}>
            <InlineTimePicker
              keyboard
              keyboardIcon={<AccessTimeIcon />}
              variant="outlined"
              label="Window Start"
              value={task.windowStart}
              onChange={(v) => updateTask({ ...task, windowStart: v })}
              mask={[/\d/, /\d/, ":", /\d/, /\d/, " ", /a|p/i, "M"]}
            />
          </Grid>
          <Grid item xs={6}>
            <InlineTimePicker
              keyboard
              keyboardIcon={<AccessTimeIcon />}
              variant="outlined"
              label="Window End"
              value={task.windowEnd}
              onChange={(windowEnd) => updateTask({ ...task, windowEnd })}
              mask={[/\d/, /\d/, ":", /\d/, /\d/, " ", /a|p/i, "M"]}
            />
          </Grid>
        </Fragment>
      )}
      <Grid item xs={12}>
        <TextField
          label="Notes"
          name="notes"
          multiline
          rows="12"
          value={task.notes}
          onChange={(e) => updateTask({ ...task, notes: e.target.value })}
          fullWidth
          variant="outlined"
        />
      </Grid>
    </Grid>
  );
}

export default TaskInfoForm;
