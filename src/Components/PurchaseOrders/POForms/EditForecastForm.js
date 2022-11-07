import { Box } from "@mui/material";
import React, { useContext } from "react";
import { tokenPostRequestOption } from "../../Helpers/misellaneous";
import { useForm } from "react-hook-form";
import { Button } from "semantic-ui-react";
import { SelectedContextPO } from "../PurchaseOrders";


const EditForecastForm = (props) => {
    const [selection] = useContext(SelectedContextPO);
    console.log(props.selectedForcastItem)
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();
  
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
    const year = ["2021-2022","2022-2023","2023-2024"]
    const onSubmit = (data) => {
        const paramsId =  props.selectedForcastItem.Id;
        const id = selection.Id;
        let helper = {
          ...data,
          purchaseOrderId: id,
          currencyCode: selection.currencyCode,
        };
        const fetchData = async () => {
          try {
            let url = `https://devxnet.cubastion.net/api/v1/purchaseOrder/updatePOForecast?id=${paramsId}`;
            const response = await fetch(url, tokenPostRequestOption(helper));
            const json = await response.json();
            if (json.statusCode === "200") {
              alert("Forecast Edited Successfully")
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
    
    return (
        <Box style={{ minWidth: "500px" }}>
        <form onSubmit={handleSubmit(onSubmit)}>

          <div style={{ margin: "14px" }}>
            <h2>
                Edit Forecast
            </h2>
            <div
              style={{ margin: "1rem", display: "flex", flexDirection: "column" }}
            >
              <label name="financialYear">Financial Year</label>
              <select
                {...register("financialYear", { required: true })}
                htmlFor="financialYear"
                defaultValue={props.selectedForcastItem.financialYear}
              >
                <option value="">Select</option>
                {year.map((x) => {
                    return <option selected={props.selectedForcastItem.financialYear === x} value={x} key={x}>{x}</option>
                })}
              </select>
            </div>
            <div
              style={{ margin: "1rem", display: "flex", flexDirection: "column" }}
            >
              <label name="month">Month</label>
              <select {...register("month", { required: true })} defaultValue={props.selectedForcastItem.month} htmlFor="month">
                {months.map((x) => (
                  <option selected={props.selectedForcastItem.month === x} value={x} key={x}>{x}</option>
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
                defaultValue={props.selectedForcastItem.expectedBilling}
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
                defaultValue={props.selectedForcastItem.conversionFactor}
                
                />
            </div>
            <div
              style={{ margin: "1rem", display: "flex", flexDirection: "column" }}
              >
              <label name="comments">Comments</label>
              <textarea
                {...register("comments", { required: true })}
                htmlFor="comments"
                defaultValue={props.selectedForcastItem.comments}
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
  )
}

export default EditForecastForm