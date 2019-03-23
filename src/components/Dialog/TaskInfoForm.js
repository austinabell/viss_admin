import React, { Fragment } from "react";
import {
  Typography,
  Grid,
  FormControlLabel,
  Switch,
  TextField,
  InputAdornment
} from "@material-ui/core";
import TimeField from "react-simple-timefield";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import { InlineDatePicker, InlineTimePicker } from "material-ui-pickers";

function TaskInfoForm({ task, updateTask }) {
  return (
    <Fragment>
      <Typography variant="h6" gutterBottom>
        Task Details
      </Typography>
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
            value={task.durationString}
            onChange={(durationString) =>
              updateTask({ ...task, durationString })
            }
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
    </Fragment>
  );
}

export default TaskInfoForm;
