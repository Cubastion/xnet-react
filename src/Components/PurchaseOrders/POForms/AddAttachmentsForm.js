import { Box } from "@mui/material";
import React, { useContext } from "react";
import { tokenPostRequestOption } from "../../Helpers/misellaneous";
import { useForm } from "react-hook-form";
import { Button } from "semantic-ui-react";
import { SelectedContextPO } from "../PurchaseOrders";

const AddAttachmentsForm = (props) => {
    const [selection] = useContext(SelectedContextPO)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const id = selection.Id
    console.log("file data",data)
    var sender = new FormData();
    sender.append("id", id);
    sender.append("filePath", "PO-Documents");
    sender.append("xnetFiles", data.file[0]);
    sender.append("comment", data.comments);
    console.log("============>",sender.get("xnetFiles"));

    const fetchData = async () => {
      try {
        let url =
          "https://devxnet.cubastion.net/api/v1/files/uploadFileToOnedrive";

        const response = await fetch(url, tokenPostRequestOption(sender, true));
        const json = await response.json();
        if (json.statusCode === "200") {
          props.refreshDataFunction();
          props.setActiveForm(false);
          alert("PO Attachment Added Successfully...!!!");
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
        <div
          style={{ margin: "1rem", display: "flex", flexDirection: "column" }}
        >
          <label name="comments">Comments</label>
          <input
            type="text"
            {...register("comments", { required: true })}
            htmlFor="comments"
          />
        </div>
        <div
          style={{ margin: "1rem", display: "flex", flexDirection: "column" }}
        >
          <label name="file">File</label>
          <input
            type="file"
            {...register("file", { required: true })}
            htmlFor="file"
          />
        </div>
        <Button onClick={onSubmit}>Add</Button>
        <Button
          onClick={() => {
            props.setActiveForm(false);
          }}
        >
          Cancel
        </Button>
      </form>
    </Box>
  );
};

export default AddAttachmentsForm;
