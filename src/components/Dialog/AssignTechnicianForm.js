import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import {
  withStyles,
  FormControl,
  Select,
  OutlinedInput,
  Chip,
  MenuItem,
  Grid
} from "@material-ui/core";
import Constants from "../../constants";
import gql from "graphql-tag";
import { Query } from "react-apollo";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

const styles = (theme) => ({
  formControl: {
    // margin: theme.spacing.unit,
    minWidth: 120
  },
  chips: {
    display: "flex",
    flexWrap: "wrap"
  },
  chip: {
    margin: theme.spacing.unit / 4
  }
});

const GET_TECHNICIANS = gql`
  {
    users {
      id
      name
      email
    }
  }
`;

function removeDuplicate(arr) {
  if (arr.length === 0) {
    return [];
  }
  const last = arr.pop();
  const length = arr.length;
  arr = arr.filter((value) => value.id !== last.id);
  if (arr.length === length) {
    // Value clicked is new value
    arr.push(last);
  }
  return arr;
}

function AssignTechnicianInfo({ classes, theme, task, updateTask }) {
  let { techniciansArr } = task;

  useEffect(() => {
    updateTask({ ...task, techniciansArr: task.technicians });
  }, []);

  function getStyles(user, list) {
    if (!list) {
      return null;
    }
    const selected = list.map((v) => v.id).indexOf(user.id) === -1;
    // const selected = list.indexOf(user) === -1;
    return {
      fontWeight: selected
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
      color: selected ? null : Constants.primaryColor
    };
  }

  const handleChange = (e) => {
    const { value } = e.target;
    const newArr = removeDuplicate(value);

    updateTask({ ...task, techniciansArr: newArr });
  };

  return (
    <Fragment>
      <Typography variant="h6" gutterBottom>
        Assigned Technicians
      </Typography>
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <FormControl
            fullWidth
            variant="outlined"
            className={classes.formControl}>
            <Query query={GET_TECHNICIANS}>
              {({ loading, error, data }) => {
                if (loading) return null;
                if (error) {
                  return null;
                }
                if (data.users) {
                  return (
                    <Select
                      multiple
                      value={techniciansArr || []}
                      // onOpen={populateTechnicianArray}
                      // onChange={(e) =>
                      //   updateTask({ ...task, techniciansArr: e.target.value })
                      // }
                      onChange={handleChange}
                      input={
                        <OutlinedInput labelWidth={0} id="province-simple" />
                      }
                      renderValue={(selected) => (
                        <div className={classes.chips}>
                          {selected.map((user) => (
                            <Chip
                              key={user.id}
                              label={user.name ? user.name : user.email}
                              className={classes.chip}
                              color="primary"
                            />
                          ))}
                        </div>
                      )}
                      MenuProps={MenuProps}>
                      {data.users.map((user) => (
                        <MenuItem
                          key={user.id}
                          value={user}
                          style={getStyles(user, techniciansArr)}>
                          {user.name ? user.name : user.email}
                        </MenuItem>
                      ))}
                    </Select>
                  );
                } else return null;
              }}
            </Query>
          </FormControl>
        </Grid>
      </Grid>
    </Fragment>
  );
}

AssignTechnicianInfo.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(AssignTechnicianInfo);
