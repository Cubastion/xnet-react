import React, { useContext, useEffect } from "react";
import { Button } from "semantic-ui-react";
import { SelectedContextPO } from "../PurchaseOrders";
import { tokenPostRequestOption } from "../../Helpers/misellaneous";
import { useForm } from "react-hook-form";
import { Box } from "@mui/material";

const AddNotesForm = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const selection = useContext(SelectedContextPO);
  const id = selection[0].Id;
  console.log(selection[0].Id)

  const onSubmit = (data) => {
    var helper = {...data, "purchaseOrderId":id}
    const fetchData = async () => {
      try {
        let url = `https://devxnet.cubastion.net/api/v1/purchaseOrder/addPONotes?id=${id}`;
        const response = await fetch(url, tokenPostRequestOption(helper));
        const json = await response.json();
        if (json.statusCode === "200") {
          alert("Notes Added Successfully");
          props.refreshDataFunction();
          props.setOpenDialog(false);
        } else alert(json.statusMessage);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  };

  return (
    <Box style={{ minWidth: "500px" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ margin: "14px" }}>
          <h2>Add Notes</h2>
          <div
            style={{ margin: "1rem", display: "flex", flexDirection: "column" }}
          >
            <label name="comments">Comments</label>
            <textarea
              {...register("comments", { required: true })}
              htmlFor="comments"
            />
          </div>
          <Button onClick={onSubmit}>Add</Button>
          <Button
            onClick={() => {
              props.setOpenDialog(false);
            }}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Box>
  );
};

export default AddNotesForm;
