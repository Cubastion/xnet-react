import { Box } from "@mui/material";
import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { Button } from "semantic-ui-react";
import { tokenPostRequestOption } from "../../Helpers/misellaneous";
import { SelectedContextPO } from "../PurchaseOrders";
const AddPOItemsForm = (props) => {
  const [rate1, setRate] = useState(0);
  const [quantity1, setQuantity] = useState(0);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [currentSelectionId] = useContext(SelectedContextPO);
  const id = currentSelectionId.Id;
  const onSubmit = (data) => {
    let object = {...data, 'currencyCode': currentSelectionId.currencyCode}
    const fetchData = async () => {
      try {
        let url = `https://devxnet.cubastion.net/api/v1/POItems/addpOItems?id=${id}`;

        const response = await fetch(url, tokenPostRequestOption(object));
        const json = await response.json();

        if (json.statusCode === "200") {
          props.refreshDataFunction()
          props.setActiveForm(false)
          props.setActiveEditForm(false)
          props.setActiveAddForm(false)
          alert("PO Item Added SUccessfully...!!!");
        } else alert(json.statusMessage);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  };

  return (
    <Box p={2} width="500px" textAlign="left" role="presentation">
      <h2>Add Items</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
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
          <div
            style={{ margin: "1rem", display: "flex", flexDirection: "column" }}
          >
            <label name="displayName">Display Name</label>
            <input
              type="text"
              {...register("displayName", { required: true })}
              htmlFor="displayName"
            />
          </div>
          <div
            style={{ margin: "1rem", display: "flex", flexDirection: "column" }}
          >
            <label name="rate">Rate</label>
            <input
              type="number"
              {...register("rate", { required: true })}
              htmlFor="rate"
              onChange={(e) => setRate(e.target.value)}
            />
          </div>

          <div
            style={{ margin: "1rem", display: "flex", flexDirection: "column" }}
          >
            <label name="quantity">Quantity</label>
            <input
              type="number"
              {...register("quantity", { required: true })}
              htmlFor="quantity"
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
          <div
            style={{ margin: "1rem", display: "flex", flexDirection: "column" }}
          >
            <label name="amount">Amount</label>
            <input
              type="text"
              {...register("amount", { required: true })}
              htmlFor="amount"
              readOnly={true}
              value={rate1 * quantity1}
            />
          </div>
          <div
            style={{ margin: "1rem", display: "flex", flexDirection: "column" }}
          >
            <label name="description">Description</label>
            <input
              type="text"
              {...register("description", { required: true })}
              htmlFor="description"
            />
          </div>
          <Button onClick={onSubmit}>Add</Button>
          <Button onClick={()=>{props.setActiveForm(false);
          props.setActiveEditForm(false);
          props.setActiveAddForm(false);
          }}>Cancel</Button>
        </div>
      </form>
    </Box>
  );
};

export default AddPOItemsForm;
