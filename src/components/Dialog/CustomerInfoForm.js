import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import {
  Typography,
  TextField,
  FormControl,
  Select,
  OutlinedInput,
  InputLabel,
  MenuItem
} from "@material-ui/core";

function CustomerInfoForm({ task, updateTask }) {
  const provinces = [
    "ON",
    "MB",
    "SK",
    "AB",
    "NL",
    "PE",
    "NS",
    "NB",
    "QC",
    "BC",
    "YK",
    "NT",
    "NU"
  ];

  const updateField = (e) => {
    updateTask({
      ...task,
      [e.target.name]: e.target.value,
      addressError: "",
      cityError: ""
    });
  };

  return (
    <Fragment>
      <Typography variant="h6" gutterBottom>
        Customer Details
      </Typography>
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <TextField
            label="Customer Name"
            name="name"
            value={task.name}
            onChange={updateField}
            fullWidth
            variant="outlined"
            autoComplete="name"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            error={task.addressError !== ""}
            label={"Address"}
            name="address"
            value={task.address}
            onChange={updateField}
            fullWidth
            variant="outlined"
            autoComplete="address"
          />
        </Grid>
        <Grid item xs={8}>
          <TextField
            required
            error={task.cityError !== ""}
            label="City"
            name="city"
            value={task.city}
            onChange={updateField}
            fullWidth
            variant="outlined"
            autoComplete="city"
          />
        </Grid>
        <Grid item xs={4}>
          <FormControl fullWidth variant="outlined">
            <InputLabel htmlFor="province-simple">Province</InputLabel>
            <Select
              value={task.province}
              name="province"
              onChange={updateField}
              input={
                <OutlinedInput labelWidth={65} notched id="province-simple" />
              }>
              {provinces.map((province) => (
                <MenuItem key={province} value={province}>
                  {province}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Email (optional)"
            name="email"
            value={task.email}
            onChange={updateField}
            fullWidth
            variant="outlined"
            autoComplete="email"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Phone Number (optional)"
            name="phone"
            value={task.phone}
            onChange={updateField}
            fullWidth
            variant="outlined"
            autoComplete="phone"
          />
        </Grid>
      </Grid>
    </Fragment>
  );
}

CustomerInfoForm.propTypes = {
  task: PropTypes.object.isRequired,
  updateTask: PropTypes.func.isRequired
};

export default CustomerInfoForm;
