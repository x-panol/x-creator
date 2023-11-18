import { Box, FormControl, FormLabel, OutlinedInput } from "@mui/material";
import { Form, useFormik } from "formik";
import React from "react";

const InfoSpotEditor = () => {
  const { handleSubmit } = useFormik({
    initialValues: {
      content: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <Box sx={{}}>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <OutlinedInput placeholder="Please enter text" multiline rows={4} />
        </FormControl>
      </form>
    </Box>
  );
};

export default InfoSpotEditor;
