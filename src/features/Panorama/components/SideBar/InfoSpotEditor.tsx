import {
  Box,
  FormControl,
  FormLabel,
  OutlinedInput,
  Button,
} from "@mui/material";
import { Form, useFormik } from "formik";
import React from "react";
import useCanvasStore from "@/store/useCanvasStore";

const InfoSpotEditor = () => {
  const { nodes, onNodeDataUpdated, selectedInfoSpot, selectedNode } =
    useCanvasStore();
  const node = nodes.find((node) => node.id == selectedNode);
  console.log("node ", node);
  const infoSpot = node?.data?.infoSpot?.find(
    (infoSpot) => infoSpot.id == selectedInfoSpot
  );

  const formik = useFormik({
    initialValues: {
      content: infoSpot?.content || "",
    },
    onSubmit: (values) => {
      console.log(values);
      if (node && node.data && node.data.infoSpot) {
        const updatedInfoSpots = node.data.infoSpot.map((item) => {
          if (item.id === selectedInfoSpot) {
            return { ...item, content: values.content };
          }
          return item;
        });
        node.data.infoSpot = updatedInfoSpots;
        onNodeDataUpdated(node);
      }
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
        onSubmit={formik.handleSubmit}
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <FormControl sx={{ width: "100%" }}>
          <FormLabel htmlFor="content">Content</FormLabel>
          <OutlinedInput
            value={formik.values.content}
            onChange={formik.handleChange}
            name="content"
            placeholder="Please enter text"
            multiline
            rows={4}
          />
        </FormControl>
        <Button type="submit"> Submit</Button>
      </form>
    </Box>
  );
};

export default InfoSpotEditor;
