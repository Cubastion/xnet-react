import { Box } from "@mui/material";
import React, { useEffect, useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { Button } from "semantic-ui-react";
import {
  tokenRequestOption,
  tokenPutRequestOption,
} from "../../Helpers/misellaneous";
import { selectedInternalPO } from "../InternalPO";

const EditInternalPOLineItemsForm = (props) => {
  const [selectedInternalPOforBudgetSubHeadId] = useContext(selectedInternalPO);
  const [budgetSubHead, setbudgetSubHead] = useState("");
  useEffect(() => {
    var url = `https://devxnet.cubastion.net//api/v1/budgetSubHeads/getBudgetSubHeads?budgetId=${props.activeBudget[0].Id}&budgetHeadId=${selectedInternalPOforBudgetSubHeadId.budgetHeadId}`;
    const fetchData = async () => {
      try {
        const response = await fetch(url, tokenRequestOption());
        const json = await response.json();
        setbudgetSubHead(json.data);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    var helper = {
      ...data,
      rate: parseInt(data.rate),
      quantity: parseInt(data.quantity),
    };
    console.log(helper)
    const fetchData = async () => {
      try {
        let url =
          `https://devxnet.cubastion.net//api/v1/internalPOItems/updateInternalPOItems?id=${props.selectedFromFetched.Id}`;

        const response = await fetch(url, tokenPutRequestOption(helper));
        const json = await response.json();

        if (json.statusCode === "200") {
          alert("Document Created Successfully...!!!");
          props.refreshData();
          props.setOpenEditForm(false);
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
    <Box p={2} width="500px" textAlign="left" role="presentation">
      <h2>Edit Internal Purchase Order Line Item</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div
            style={{ margin: "1rem", display: "flex", flexDirection: "column" }}
          >
            <label name="BUDGET SUB HEAD">BUDGET SUB HEAD</label>
            <select
              {...register("budgetSubHeadId", { required: true })}
              htmlFor="BUDGET SUB HEAD"
            >
              <option value="">Please Select Budget Sub Head</option>
              {budgetSubHead &&
                budgetSubHead.map((x) => (
                  <option
                    selected={
                      props?.selectedFromFetched?.budgetSubHeadId === x.Id
                    }
                    value={x.Id}
                  >
                    {x.name}
                  </option>
                ))}
            </select>
          </div>
          <div
            style={{ margin: "1rem", display: "flex", flexDirection: "column" }}
          >
            <label name="BUDGET SUB HEAD MONTH">BUDGET SUB HEAD MONTH</label>
            <select
              {...register("budgetSubHeadMonth", { required: true })}
              htmlFor="BUDGET SUB HEAD MONTH"
            >
              <option value="">Please Select Budget Head</option>
              {months.map((x) => (
                <option
                  selected={props.selectedFromFetched.budgetSubHeadMonth === x}
                  value={x}
                >
                  {x}
                </option>
              ))}
            </select>
          </div>
          <div
            style={{ margin: "1rem", display: "flex", flexDirection: "column" }}
          >
            <label name="NAME">NAME</label>
            <input
              defaultValue={props.selectedFromFetched.name}
              type="text"
              {...register("name", { required: true })}
              htmlFor="NAME"
            />
          </div>
          <div
            style={{ margin: "1rem", display: "flex", flexDirection: "column" }}
          >
            <label name="DESCRIPTION">DESCRIPTION</label>
            <input
              defaultValue={props.selectedFromFetched.description}
              type="text"
              {...register("description", { required: true })}
              htmlFor="DESCRIPTION"
            />
          </div>
          <div
            style={{ margin: "1rem", display: "flex", flexDirection: "column" }}
          >
            <label name="RATE">RATE</label>
            <input
              defaultValue={props.selectedFromFetched.rate}
              type="number"
              {...register("rate", { required: true })}
              htmlFor="RATE"
            />
          </div>
          <div
            style={{ margin: "1rem", display: "flex", flexDirection: "column" }}
          >
            <label name="QUANTITY">QUANTITY</label>
            <input
              defaultValue={props.selectedFromFetched.quantity}
              type="number"
              {...register("quantity", { required: true })}
              htmlFor="QUANTITY"
            />
          </div>
          <Button onClick={onSubmit}>Add</Button>
          <Button onClick={() => props.setOpenEditForm(false)}>Cancel</Button>
        </div>
      </form>
    </Box>
  );
};

export default EditInternalPOLineItemsForm;
