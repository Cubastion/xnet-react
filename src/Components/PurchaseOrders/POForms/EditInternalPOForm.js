import { Box } from "@mui/material";
import React, { useEffect, useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { Button } from "semantic-ui-react";
import { selectedInternalPO } from "../InternalPO";
import {
  tokenRequestOption,
  tokenPostRequestOption,
} from "../../Helpers/misellaneous";
const EditInternalPOForm = (props) => {
  const [budgetHead, setbudgetHead] = useState("");
  const [activeBudgetId, setActiveBudgetId] = useState("");
  const [allVendors, setAllVendors] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [currentSelectionItemToEdit] = useContext(selectedInternalPO);

  console.log(currentSelectionItemToEdit, "currentSelectionItemToEdit");

  useEffect(() => {
    var url = `https://devxnet.cubastion.net//api/v1/budgetHeads/getbudgetHeadByBudgetId?budgetId=${activeBudgetId}`;
    const fetchData = async () => {
      try {
        const response = await fetch(url, tokenRequestOption());
        const json = await response.json();
        setbudgetHead(json.data);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, [activeBudgetId]);

  const preCallBudgetHead = () => {
    var url = `https://devxnet.cubastion.net//api/v1/budgetHeads/getbudgetHeadByBudgetId?budgetId=${currentSelectionItemToEdit.budget.Id}`;
    const fetchData = async () => {
      try {
        const response = await fetch(url, tokenRequestOption());
        const json = await response.json();
        setbudgetHead(json.data);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  };

  useEffect(() => {
    var url = `https://devxnet.cubastion.net/api/v1/vendor/getAllVendorsForFilter`;
    const fetchData = async () => {
      try {
        const response = await fetch(url, tokenRequestOption());
        const json = await response.json();
        setAllVendors(json.data);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
    preCallBudgetHead();
  }, []);

  const onSubmit = (data) => {
    var helper = { ...data, Id: currentSelectionItemToEdit.Id };
    console.log(helper);
    const fetchData = async () => {
      try {
        let url =
          "https://devxnet.cubastion.net//api/v1/internalPOs/updateInternalPOs";

        const response = await fetch(url, tokenPostRequestOption(helper));
        const json = await response.json();

        if (json.statusCode === "200") {
          alert("Document Created SUccessfully...!!!");
          props.refreshData();
        } else alert(json.statusMessage);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  };
  return (
    <Box p={2} width="500px" textAlign="left" role="presentation">
      <h2>Edit Internal Purchase Order</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div
            style={{ margin: "1rem", display: "flex", flexDirection: "column" }}
          >
            <label
              name="PO NUMBER"
            >
              PO NUMBER
            </label>
            <input
              type="text"
              {...register("poNumber", { required: true })}
              htmlFor="PO NUMBER
              "
            />
          </div>
          <div
            style={{ margin: "1rem", display: "flex", flexDirection: "column" }}
          >
            <label name="VENDORS">VENDORS</label>
            <select
              {...register("vendorId", { required: true })}
              htmlFor="VENDORS"
            >
              <option value="">Please Select Vendor</option>
              {allVendors &&
                allVendors.map((x) => (
                  <option
                    selected={currentSelectionItemToEdit.vendor.Id === x.Id}
                    key={x.Id}
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
            <label name="START DATE">START DATE</label>
            <input
              defaultValue={currentSelectionItemToEdit.startDate}
              type="date"
              {...register("startDate", { required: true })}
              htmlFor="START DATE"
            />
          </div>
          <div
            style={{ margin: "1rem", display: "flex", flexDirection: "column" }}
          >
            <label name="END DATE">END DATE</label>
            <input
              defaultValue={currentSelectionItemToEdit.endDate}
              type="date"
              {...register("endDate")}
              htmlFor="END DATE"
            />
          </div>
          <Button onClick={onSubmit}>Add</Button>
          <Button>Cancel</Button>
        </div>
      </form>
    </Box>
  );
};

export default EditInternalPOForm;
