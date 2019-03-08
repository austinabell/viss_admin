import React, { Fragment } from "react";
import Typography from "@material-ui/core/Typography";

function NotFound() {
  return (
    <Fragment>
      <div className="page-container">
        <Typography
          variant="h3"
          style={{
            margin: "40px"
          }}>
          404: Page Not Found
        </Typography>
      </div>
    </Fragment>
  );
}

export default NotFound;
