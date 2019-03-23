import React, { Fragment } from "react";
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

function AssignTechnicianInfo({ classes, task, updateTask }) {
  // const [technicians, setNames] = useState([]);

  const { techniciansArr } = task;

  return (
    <Fragment>
      <Typography variant="h6" gutterBottom>
        Assign Technician(s)
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
                return (
                  <Select
                    multiple
                    value={techniciansArr}
                    onChange={(e) =>
                      updateTask({ ...task, techniciansArr: e.target.value })
                    }
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
                      <MenuItem key={user.id} value={user}>
                        {user.name ? user.name : user.email}
                      </MenuItem>
                    ))}
                  </Select>
                );
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

export default withStyles(styles)(AssignTechnicianInfo);
