import React, { useContext } from "react";
import { Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { tokenPostRequestOption } from "../../../Helpers/misellaneous";
import { Id } from "../DetailedInvoice";
const UpdateIRNForm = (props) => {
  const id = useContext(Id);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const fetchData = async () => {
      try {
        let url = `https://devxnet.cubastion.net/api/v1/invoices/updateInvoiceIRN?id=${id}`;

        const response = await fetch(url, tokenPostRequestOption(data));
        const json = await response.json();

        if (json.statusCode === "200") {
          alert("IRN Edited Succesfully");
          props.setUpdateIRNForm(false)
          props.refreshBannerData()
        } else alert(json.statusMessage);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div
          style={{
            display: "flex",
            padding: "1rem 6rem 2rem 1rem",
            margin: "1 rem",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h4>Update IRN</h4>
        </div>

        <div className=" m-3 p-3">
          <TextField
            style={{ margin: "1rem", minWidth: "450px" }}
            id="outlined-number"
            label="CURRENCY CONVERSION FACTOR"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            defaultValue="1"
            {...register("conversionFactor", { required: true })}
          />
          <TextField
            style={{ margin: "1rem", minWidth: "450px" }}
            placeholder="Enter Cancellation Comment"
            htmlFor="comment"
            multiline
            label="IRN"
            variant="outlined"
            minRows={5}
            {...register("irn", { required: true })}
          />
          <TextField
            style={{ margin: "1rem", minWidth: "450px" }}
            placeholder="Enter Cancellation Comment"
            htmlFor="comment"
            multiline
            label="QR CODE"
            variant="outlined"
            minRows={9}
            {...register("QRCode", { required: true })}
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
          <Button type="submit" variant="contained">
            Submit
          </Button>
          <Button
            onClick={() => props.setUpdateIRNForm(false)}
            variant="contained"
          >
            Cancel
          </Button>
        </div>
      </form>
    </>
  );
};

export default UpdateIRNForm;
