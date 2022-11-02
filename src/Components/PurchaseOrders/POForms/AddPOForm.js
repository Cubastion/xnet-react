import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "semantic-ui-react";
import {
  tokenRequestOption,
  tokenPostRequestOption,
} from "../../Helpers/misellaneous";

const AddPOForm = (props) => {
  const [clients, setClients] = useState("");
  const [selectedClientId, setSelectedClientId] = useState("");
  const [projectUnderAClient, setProjectUnderAClient] = useState("");
  const [owner, setOwner] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    var url =
      "https://devxnet.cubastion.net/api/v1/clients/getAllClientsForFilter";
    const fetchData = async () => {
      try {
        const response = await fetch(url, tokenRequestOption());
        const json = await response.json();
        console.log(json.data);
        setClients(json.data);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    var url = "https://devxnet.cubastion.net/api/v1/employee/getEmployees";
    const fetchData = async () => {
      try {
        const response = await fetch(url, tokenRequestOption());
        const json = await response.json();
        setOwner(json.data);
        console.log(json.data);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    var url = `https://devxnet.cubastion.net/api/v1/projects/getAllProjectsByClientId?clientId=${selectedClientId}`;
    const fetchData = async () => {
      try {
        const response = await fetch(url, tokenRequestOption());
        const json = await response.json();
        setProjectUnderAClient(json.data);
      } catch (error) {
        console.log("error", error);
      }
    };
    if (selectedClientId) {
      fetchData();
    }
  }, [selectedClientId]);

  const onSubmit = (data) => {
    const fetchData = async () => {
      try {
        let url =
          "https://devxnet.cubastion.net/api/v1/purchaseOrder/addpurchaseorder";

        const response = await fetch(url, tokenPostRequestOption(data));
        const json = await response.json();

        if (json.statusCode === "200") {
          props.setRefreshCounter(Math.random.toString());
          props.setActiveForm(false);
          alert("PO Created SUccessfully...!!!");
        } else alert(json.statusMessage);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  };

  return (
    <Box p={2} width="500px" textAlign="left" role="presentation">
      <h2>Add Purchase Order</h2>
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
          <div
            style={{ margin: "1rem", display: "flex", flexDirection: "column" }}
          >
            <label name="CLIENT NAME">CLIENT NAME</label>
            <select
              {...register("clientId", { required: true })}
              onChange={(e) => setSelectedClientId(e.target.value)}
              htmlFor="CLIENT NAME"
            >
              <option value="">Please Select Name of The Client</option>
              {clients &&
                clients.map((x) => (
                  <option key={x.Id} value={x.Id}>
                    {x.name}
                  </option>
                ))}
            </select>
          </div>
          <div
            style={{ margin: "1rem", display: "flex", flexDirection: "column" }}
          >
            <label name="PROJECT NAME">PROJECT NAME</label>
            <select
              {...register("projectId", { required: true })}
              htmlFor="PROJECT NAME"
            >
              <option value="">Please Select Name of The Project</option>
              {projectUnderAClient &&
                projectUnderAClient.map((x) => (
                  <option key={x.Id} value={x.Id}>
                    {x.name}
                  </option>
                ))}
            </select>
          </div>
          <div
            style={{ margin: "1rem", display: "flex", flexDirection: "column" }}
          >
            <label name="DESCRIPTION">DESCRIPTION</label>
            <input type="text" {...register("description")} htmlFor="CITY" />
          </div>
          <div
            style={{ margin: "1rem", display: "flex", flexDirection: "column" }}
          >
            <label name="ISSUE DATE">ISSUE DATE</label>
            <input type="date" {...register("issueDate")} htmlFor="STATE" />
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
          <div
            style={{ margin: "1rem", display: "flex", flexDirection: "column" }}
          >
            <label name="PAYMENT DUE IN DAYS">PAYMENT DUE IN DAYS</label>
            <input
              type="number"
              {...register("paymentDueInDays", { required: true })}
              htmlFor="PAYMENT DUE IN DAYS"
            />
          </div>
          <div
            style={{ margin: "1rem", display: "flex", flexDirection: "column" }}
          >
            <label name="STATUS">STATUS</label>
            <select
              {...register("status", { required: true })}
              htmlFor="STATUS"
            >
              <option value="">Select</option>
              <option value="Active">Active</option>
              <option value="Consumed">Consumed</option>
              <option value="Duplicate">Duplicate</option>
              <option value="Expired">Expired</option>
              <option value="Hold">Hold</option>
            </select>
          </div>
          <div
            style={{ margin: "1rem", display: "flex", flexDirection: "column" }}
          >
            <label name="UNIT OF MEASURE">UNIT OF MEASURE</label>
            <select
              {...register("unitOfMeasure", { required: true })}
              htmlFor="UNIT OF MEASURE"
            >
              <option value="">Select</option>
              <option value="Actuals">Actuals</option>
              <option value="Fixed Recurrig">Fixed Recurrig</option>
              <option value="Man Hours">Man Hours</option>
              <option value="Man Months">Man Months</option>
              <option value="Calendar Months">Calendar Months</option>
              <option value="Fixed">Fixed</option>
              <option value="Man Days">Man Days</option>
            </select>
          </div>
          <div
            style={{ margin: "1rem", display: "flex", flexDirection: "column" }}
          >
            <label name="UOM ATTRIBUTE">UOM ATTRIBUTE</label>
            <input
              type="number"
              {...register("uoMAttribute1", { required: true })}
              htmlFor="UOM ATTRIBUTE"
            />
          </div>
          <div
            style={{ margin: "1rem", display: "flex", flexDirection: "column" }}
          >
            <label name="uoMAttribute2">UOM ATTRIBUTE 2</label>
            <input
              type="number"
              {...register("UOM ATTRIBUTE 2", { required: true })}
              htmlFor="uoMAttribute2"
            />
          </div>
          <div
            style={{ margin: "1rem", display: "flex", flexDirection: "column" }}
          >
            <label name="CURRENCY">CURRENCY</label>
            <select
              type="tel"
              {...register("currencyCode", { required: true })}
              htmlFor="CURRENCY"
            >
              <option value="">Select</option>
              <option value="INR">INR</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="JPY">JPY</option>
              <option value="OTH">OTH</option>
            </select>
          </div>
          <div
            style={{ margin: "1rem", display: "flex", flexDirection: "column" }}
          >
            <label name="BYPASS TIMESHEET">BYPASS TIMESHEET</label>
            <input
              type="checkbox"
              {...register("bypassTimesheetFlag")}
              htmlFor="BYPASS TIMESHEET"
            />
          </div>
          <div
            style={{ margin: "1rem", display: "flex", flexDirection: "column" }}
          >
            <label name="OWNER">OWNER</label>
            <select
              type="tel"
              {...register("ownerId", { required: true })}
              htmlFor="OWNER"
            >
              <option value="">Select Owner</option>
              {owner &&
                owner.map((x) => (
                  <option key={x.Id} value={x.Id}>
                    {x.firstName + " " + x.lastName}
                  </option>
                ))}
            </select>
          </div>
          <Button onClick={onSubmit}>Add</Button>
          <Button onClick={() => props.setActiveForm(false)}>Cancel</Button>
        </div>
      </form>
    </Box>
  );
};

export default AddPOForm;
