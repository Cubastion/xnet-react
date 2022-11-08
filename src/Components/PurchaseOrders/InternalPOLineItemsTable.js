import { Drawer } from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import { Button, Table } from "semantic-ui-react";
import { tokenRequestOption } from "../Helpers/misellaneous";
import { selectedInternalPO } from "./InternalPO";
import AddInternalPOLineItemsForm from "./POForms/AddInternalPOLineItemsForm";
import EditInternalPOLineItemsForm from "./POForms/EditInternalPOLineItemsForm";
//https://devxnet.cubastion.net/api/v1/internalPOItems/getInternalPOItemsByInternalPOId?internalPOId=mv4xotlo6crm0tu
//https://devxnet.cubastion.net//api/v1/budgetSubHeads/getBudgetSubHeads?budgetId=egfbgg12iq7v6uv&budgetHeadId=sbuvt6x5n02f96i
const InternalPOLineItemsTable = (props) => {
  const [openAddForm, setOpenAddForm] = useState(false);
  const [openEditForm, setOpenEditForm] = useState(false);
  const [selectedInternalLinePO] = useContext(selectedInternalPO);

  const [fetchedLineItem, setFetchedLineItem] = useState("");
  const [selectedFromFetched, setSelectedFromFetched] = useState("");
  useEffect(() => {
    var url = `https://devxnet.cubastion.net/api/v1/internalPOItems/getInternalPOItemsByInternalPOId?internalPOId=${selectedInternalLinePO.Id}`;
    const fetchData = async () => {
      try {
        props.setEligibleforApproval(false);
        const response = await fetch(url, tokenRequestOption());
        const json = await response.json();
        if (json.data.length > 0) {
          props.setEligibleforApproval(true);
          setSelectedFromFetched(json.data[0]);
        }
        setFetchedLineItem(json.data);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, [selectedInternalLinePO]);

  const refreshData = () => {
    var url = `https://devxnet.cubastion.net/api/v1/internalPOItems/getInternalPOItemsByInternalPOId?internalPOId=${selectedInternalLinePO.Id}`;
    const fetchData = async () => {
      try {
        props.setEligibleforApproval(false);
        const response = await fetch(url, tokenRequestOption());
        const json = await response.json();
        if (json.data.length > 0) {
          props.setEligibleforApproval(true);
        }
        setFetchedLineItem(json.data);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  };
  const TableHeader = [
    "NAME",
    "BUDGET SUB HEAD",
    "BUDGET SUBHEAD MONTH",
    "DESCRIPTION",
    "QUANTITY",
    "RATE",
  ];

  return (
    <>
      <Drawer
        anchor="right"
        open={openAddForm || openEditForm}
        onClose={() => setOpenAddForm(false)}
      >
        {openAddForm && (
          <AddInternalPOLineItemsForm
            refreshData={refreshData}
            activeBudget={props.activeBudget}
            setOpenAddForm={setOpenAddForm}
          />
        )}
        {openEditForm && (
          <EditInternalPOLineItemsForm
            refreshData={refreshData}
            activeBudget={props.activeBudget}
            setOpenEditForm={setOpenEditForm}
            selectedFromFetched={selectedFromFetched}
          />
        )}
      </Drawer>
      <div style={{ float: "right", margin: "1rem" }}>
        {selectedInternalLinePO.status === "Draft" && (
          <>
            <Button onClick={() => setOpenAddForm(true)}>Add</Button>
            <Button onClick={() => setOpenEditForm(true)}>Edit</Button>
          </>
        )}
      </div>

      <Table striped>
        <Table.Header>
          <Table.Row>
            {TableHeader.map((x) => (
              <Table.HeaderCell key={x}>{x}</Table.HeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {fetchedLineItem &&
            fetchedLineItem?.map((x) => (
              <Table.Row
                style={
                  selectedFromFetched.Id === x.Id
                    ? { background: "lightgrey" }
                    : {}
                }
                onClick={() => setSelectedFromFetched(x)}
                key={x.Id}
              >
                <Table.Cell>{x.name}</Table.Cell>
                <Table.Cell>{x.budgetSubHead?.name}</Table.Cell>
                <Table.Cell>{x.budgetSubHeadMonth}</Table.Cell>
                <Table.Cell>{x.description}</Table.Cell>
                <Table.Cell>{x.quantity}</Table.Cell>
                <Table.Cell>{x.rate}</Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table>
    </>
  );
};

export default InternalPOLineItemsTable;
