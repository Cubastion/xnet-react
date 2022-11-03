import { Box } from "@mui/material";
import React from "react";
import { tokenPostRequestOption } from "../../Helpers/misellaneous";
import { useForm } from "react-hook-form";

const AddAttachmentsForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <Box style={{ minWidth: "500px" }}>
      <form>
      <div
            style={{ margin: "1rem", display: "flex", flexDirection: "column" }}
          >
            <label name="name">Name</label>
            <input
              type="text"
              {...register("name", { required: true })}
              htmlFor="name"
            />
          </div>
      </form>
    </Box>
  );
};

export default AddAttachmentsForm;
