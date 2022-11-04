import { Box } from "@mui/material";
import React, { useContext } from "react";
import { tokenPostRequestOption } from "../../Helpers/misellaneous";
import { useForm } from "react-hook-form";
import { Button } from "semantic-ui-react";
import { SelectedContextPO } from "../PurchaseOrders";

const AddForeCastForm = (props) => {
  const [selection] = useContext(SelectedContextPO);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const id = selection.Id;
    let helper = {
      ...data,
      purchaseOrderId: id,
      currencyCode: selection.currencyCode,
    };
    const fetchData = async () => {
      try {
        let url = `https://devxnet.cubastion.net/api/v1/purchaseOrder/addPOForecast?id=${id}`;
        const response = await fetch(url, tokenPostRequestOption(helper));
        const json = await response.json();
        if (json.statusCode === "200") {
          alert("Forecast Added Successfully")
          props.refreshDataFunction();
          props.setOpenDialog(false);
          alert("PO Attachment Added Successfully...!!!");
        } else alert(json.statusMessage);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  };

  const months = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];
  return (
    <Box style={{ minWidth: "500px" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ margin: "14px" }}>
      <h2>
                Add Forecast
            </h2>
          <div
            style={{ margin: "1rem", display: "flex", flexDirection: "column" }}
          >
            <label name="financialYear">Financial Year</label>
            <select
              {...register("financialYear", { required: true })}
              htmlFor="financialYear"
            >
              <option value="">Select</option>
              <option value="2021-2022">2021-2022</option>
              <option value="2022-2023">2022-2023</option>
              <option value="2023-2024">2023-2024</option>
            </select>
          </div>
          <div
            style={{ margin: "1rem", display: "flex", flexDirection: "column" }}
          >
            <label name="month">Month</label>
            <select {...register("month", { required: true })} htmlFor="month">
              {months.map((x) => (
                <option key={x}>{x}</option>
              ))}
            </select>
          </div>
          <div
            style={{ margin: "1rem", display: "flex", flexDirection: "column" }}
          >
            <label name="expectedBilling">Expected Billing</label>
            <input
              {...register("expectedBilling", { required: true })}
              htmlFor="expectedBilling"
              type="number"
            />
          </div>
          <div
            style={{ margin: "1rem", display: "flex", flexDirection: "column" }}
          >
            <label name="conversionFactor">Conversion Factor</label>
            <input
              {...register("conversionFactor", { required: true })}
              htmlFor="conversionFactor"
              type="number"
            />
          </div>
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
              props.setEnableEdit(false)
            }}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Box>
  );
};

export default AddForeCastForm;
