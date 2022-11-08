import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "semantic-ui-react";
import {
  tokenRequestOption,
  tokenPostRequestOption,
} from "../../Helpers/misellaneous";

const AddInternalPOForm = (props) => {

    const [budgetHead, setbudgetHead] = useState("")
    const [activeBudgetId, setActiveBudgetId] = useState("")
    const [allVendors, setAllVendors] = useState("")
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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
  }, []);


  const onSubmit = (data) => {
    var helper = {...data,"budgetId":activeBudgetId}
    console.log(helper)
    const fetchData = async () => {
      try {
        let url =
          "https://devxnet.cubastion.net/api/v1/internalPOs/addInternalPOs";

        const response = await fetch(url, tokenPostRequestOption(helper));
        const json = await response.json();

        if (json.statusCode === "200") {
          alert("Document Created SUccessfully...!!!");
          props.refreshData()
        } else alert(json.statusMessage);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  };

  return (
    <Box p={2} width="500px" textAlign="left" role="presentation">
      <h2>Add Internal Purchase Order</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div
            style={{ margin: "1rem", display: "flex", flexDirection: "column" }}
          >
            <label name="BUDGET">BUDGET</label>
            <select onChange={(e)=>setActiveBudgetId(e.target.value)} htmlFor="BUDGET">
              <option value="">Please Select Budget</option>
            {props.activeBudget && props.activeBudget.map((x) => (
                <option value={x.Id}>{x.financialYear + "/" + x.version}</option>
            ))}
            </select>
          </div>
          <div
            style={{ margin: "1rem", display: "flex", flexDirection: "column" }}
          >
            <label name="BUDGET HEAD">BUDGET HEAD</label>
            <select
              {...register("budgetHeadId", { required: true })}
              htmlFor="BUDGET HEAD"
            >
              <option value="">Please Select Budget Head</option>
                {budgetHead && budgetHead?.map((x) => (
                    <option value={x.Id} >
                        {x.name}
                    </option>
                ))}
            </select>
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
                    {
                        allVendors && allVendors.map((x) =>(
                            <option key= {x.Id} value = {x.Id}>
                                {x.name}
                            </option>
                         ) )
                    }
            </select>
          </div>

          <div
            style={{ margin: "1rem", display: "flex", flexDirection: "column" }}
          >
            <label name="START DATE">START DATE</label>
            <input
              type="date"
              {...register("startDate", { required: true })}
              htmlFor="START DATE"
            />
          </div>
          <div
            style={{ margin: "1rem", display: "flex", flexDirection: "column" }}
          >
            <label name="END DATE">END DATE</label>
            <input type="date" {...register("endDate")} htmlFor="END DATE" />
          </div>
          <Button onClick={onSubmit}>Add</Button>
          <Button>Cancel</Button>
        </div>
      </form>
    </Box>
  );
};

export default AddInternalPOForm;
