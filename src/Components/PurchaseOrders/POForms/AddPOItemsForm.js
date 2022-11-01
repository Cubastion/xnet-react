import { Box } from "@mui/material";
import React,{useState,useContext} from "react";
import { useForm } from "react-hook-form";
import { tokenPostRequestOption } from "../../Helpers/misellaneous";
import { SelectedContextPO } from "../PurchaseOrders";
const AddPOItemsForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [currentSelectionId] = useContext(SelectedContextPO)

  console.log(currentSelectionId)
   const onSubmit = (data) => {
       const fetchData  =async () => {
           try{
            let url = `https://devxnet.cubastion.net/api/v1/POItems/addpOItems?id=${currentSelectionId}`
            const response = await fetch(url,tokenPostRequestOption(data))
            const json = await response.json();

        if (json.statusCode === "200") {
          alert("PO Created SUccessfully...!!!");
        } else alert(json.statusMessage);
      } catch (error) {
        console.log("error", error);
      }
    }
    fetchData()
   }
  return (
    <Box p={2} width="500px" textAlign="left" role="presentation">
      <h2>Add Items</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div
            style={{ margin: "1rem", display: "flex", flexDirection: "column" }}
          >
            <label name="PO#">PO#</label>
            <input
              type="text"
              {...register("po", { required: true })}
              htmlFor="PO#"
            />
          </div>
        </div>
      </form>
    </Box>
  );
};

export default AddPOItemsForm;
