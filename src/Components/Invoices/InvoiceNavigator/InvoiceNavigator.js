import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const InvoiceNavigator = (props) => {
  const navigate = useNavigate();
  return (
    <>
      <div style={{ float: "left", margin: "1rem 0rem 3rem 2rem" }}>
        <Button
          onClick={() => navigate("/all-invoices")}
          variant={props.currentPage === 1 ? "contained" : ""}
        >
          All Invoices
        </Button>
        <Button
          onClick={() => navigate("/invoices")}
          variant={props.currentPage === 2 ? "contained" : ""}
        >
          Invoices
        </Button>
        <Button
          onClick={() => navigate("/invoices-pending-dispatch")}
          variant={props.currentPage === 3 ? "contained" : ""}
        >
          Invoices Pending Dispatch
        </Button>
      </div>
    </>
  );
};

export default InvoiceNavigator;
