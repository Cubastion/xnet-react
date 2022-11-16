import { Button, TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { tokenPutRequestOption } from "../../../Helpers/misellaneous";
import { Id } from "../DetailedInvoice";

const CancellationForm = (props) => {
  const id = useContext(Id);
  const [comment, setComment] = useState("");
 const navigateTo = useNavigate()
  const submitCancellation = async() => {
    let x = {'comments':comment}
    var url = `https://devxnet.cubastion.net/api/v1/invoices/cancelInvoice?id=${id}`;
    try {
      const response = await fetch(url, tokenPutRequestOption(x));
      const json = await response.json();
      if(json.statusCode == 200){
        alert("Invoice Cancelled")
        props.setCancellationForm(false)
        navigateTo("/all-invoices")
              }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          padding: "1rem 6rem 2rem 1rem",
          margin: "1 rem",
        }}
      >
        <h4>Cancellation Comment</h4>
      </div>
      <div className=" m-3 p-3">
        <TextField
          onChange={(e) => setComment(e.target.value)}
          style={{ minWidth: "400px" }}
          placeholder="Enter Cancellation Comment"
          htmlFor="comment"
          multiline
          label="Comment"
          variant="outlined"
        />
      </div>
      <div
        style={{
          display: "flex",
          width: "50%",
          justifyContent: "space-between",
        }}
        className="p-3"
      >
        <Button onClick={submitCancellation} variant="contained">
          Submit
        </Button>
        <Button
          onClick={() => props.setCancellationForm(false)}
          variant="contained"
        >
          Cancel
        </Button>
      </div>
    </>
  );
};

export default CancellationForm;
