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
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "100%",
        px: (theme) => theme.spacing(1),
        pt: (theme) => theme.spacing(3),
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", justifyContent: "center" }}
      >
        <FormControl sx={{ width: "100%" }}>
          <FormLabel htmlFor="content">Content</FormLabel>
          <OutlinedInput placeholder="Please enter text" multiline rows={4} />
        </FormControl>
      </form>
    </Box>
  );
};

export default InfoSpotEditor;
