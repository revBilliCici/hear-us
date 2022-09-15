import React from "react";
import { CircularProgress, Divider, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Confirmation = ({ order, isFinished }) =>
  order.customer ? (
    <>
      <div>
        <Typography variant="h5">
          Thank you for your purchase, {order.customer.firstname}{" "}
          {order.customer.lastname}
        </Typography>
        <Divider className="coDivider" />
        <Typography variant="subtitle2">
          Order ref: {order.customer_reference}
        </Typography>
      </div>
      <br />
      <Button LinkComponent={Link} to="/" variant="outlined" type="button">
        Back to Home
      </Button>
    </>
  ) : isFinished ? (
    <>
      <div>
        <Typography variant="h5">Thank you for your purchase</Typography>
        <Divider className="coDivider" />
      </div>
      <br />
      <Button LinkComponent={Link} to="/" variant="outlined" type="button">
        Back to Home
      </Button>
    </>
  ) : (
    <div className="coSpinner">
      <CircularProgress />
    </div>
  );

export default Confirmation;
