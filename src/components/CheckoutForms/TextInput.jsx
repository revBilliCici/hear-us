import React from "react";
import { TextField, Grid } from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";

const TextInput = ({ name, label }) => {
  const { control } = useFormContext();
  return (
    <Grid item sm={12} md={6} style={{ width: "100%" }}>
      <Controller
        as={TextField}
        control={control}
        defaultValue=""
        fullWidth
        name={name}
        label={label}
        required
      />
    </Grid>
  );
};

export default TextInput;
