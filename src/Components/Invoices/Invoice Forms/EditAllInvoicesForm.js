import { Box } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "semantic-ui-react";
import {
  tokenRequestOption,
  tokenPutRequestOption,
} from "../../Helpers/misellaneous";

const EditAllInvoicesForm = (props) => {
  console.log("props.selectedInvoice", props.selectedInvoice);
  const [financialYear, setFinancialYear] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = `https://devxnet.cubastion.net/api/v1/listOfValues/findByType?type=FINANCIAL_YEAR`;
        const response = await fetch(url, tokenRequestOption());
        const json = await response.json();
        setFinancialYear(json.data);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, []);

  const onSubmit = (data) => {
    const fetchData = async () => {
      try {
        let url = `https://devxnet.cubastion.net/api/v1/invoices/updateInvoiceByAdmin?id=${props.selectedInvoice.Id}`;
        const response = await fetch(url, tokenPutRequestOption(data));
        const json = await response.json();

        if (json.statusCode === "200") {
          props.refreshData();
          props.setActivateEditForm(false);
          alert("Invoice Edited Successfully...!!!");
        } else alert(json.statusMessage);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  };

  const status = ["New", "Submitted", "Rejected", "Revised"];
  const type = ["Debit", "Forex", "Service"];
  return (
    <Box p={2} width="500px" textAlign="left" role="presentation">
      <h2>Edit Invoice</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div
            style={{ margin: "1rem", display: "flex", flexDirection: "column" }}
          >
            <label name="INVOICE#">INVOICE#</label>
            <input
              type="text"
              {...register("invoiceNumber", { required: true })}
              htmlFor="INVOICE#"
              defaultValue={props.selectedInvoice.invoiceNumber}
            />
          </div>
          <div
            style={{ margin: "1rem", display: "flex", flexDirection: "column" }}
          >
            <label name="status">Status</label>
            <select
              {...register("status", { required: true })}
              htmlFor="status"
            >
              <option value="">Select The Status</option>
              {status.map((x) => (
                <option selected={props.selectedInvoice.status === x} key={x}>
                  {x}
                </option>
              ))}
            </select>
          </div>
          <div
            style={{ margin: "1rem", display: "flex", flexDirection: "column" }}
          >
            <label name="invoiceDate">INVOICE DATE</label>
            <input
              type="date"
              {...register("invoiceDate", { required: true })}
              htmlFor="invoiceDate"
              defaultValue={props.selectedInvoice.invoiceDate}
            />
          </div>
          <div
            style={{ margin: "1rem", display: "flex", flexDirection: "column" }}
          >
            <label name="startDate">START DATE</label>
            <input
              type="date"
              {...register("startDate", { required: true })}
              htmlFor="startDate"
              defaultValue={props.selectedInvoice.startDate}
            />
          </div>
          <div
            style={{ margin: "1rem", display: "flex", flexDirection: "column" }}
          >
            <label name="endDate">END DATE</label>
            <input
              type="date"
              {...register("endDate", { required: true })}
              htmlFor="endDate"
              defaultValue={props.selectedInvoice.endDate}
            />
          </div>

          <div
            style={{ margin: "1rem", display: "flex", flexDirection: "column" }}
          >
            <label name="invoiceType">INVOICE TYPE</label>
            <select
              {...register("invoiceType", { required: true })}
              htmlFor="invoiceType"
            >
              <option value="">Select Type</option>
              {type.map((x) => (
                <option
                  selected={props.selectedInvoice.invoiceType === x}
                  key={x}
                >
                  {x}
                </option>
              ))}
            </select>
          </div>

          <div
            style={{ margin: "1rem", display: "flex", flexDirection: "column" }}
          >
            <label name="salesCommissionFY">SALES COMMISSION FY#</label>
            <select
              {...register("salesCommissionFY", { required: true })}
              htmlFor="salesCommissionFY"
            >
              <option value="">Select Financial Year</option>
              {financialYear &&
                financialYear.map((x) => (
                  <option
                    selected={
                      props.selectedInvoice.salesCommissionFY === x.name
                    }
                    value={x.name}
                    key={x.Id}
                  >
                    {x.name}
                  </option>
                ))}
            </select>
          </div>

          <Button onClick={onSubmit}>Add</Button>
          <Button
            onClick={() => {
              props.setActivateEditForm(false);
            }}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Box>
  );
};

export default EditAllInvoicesForm;
