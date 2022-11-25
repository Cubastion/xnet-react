import React, { useContext, useEffect, useState } from "react";
import { tokenRequestOption } from "../../../Helpers/misellaneous";
import { Id } from "../DetailedInvoice";
import { Table } from "semantic-ui-react";
import { POId, CurrentInvoice } from "../DetailedInvoice";
import { RefreshAttachmenstData } from "../DetailedInvoice";
import { Button, Dialog } from "@mui/material";
// https://devxnet.cubastion.net/api/v1/POItems/findPOItemsBasedOnQuantity?id=4sq6taotr3b51b4
const InvoiceItemsTable = () => {
  const [selectPO, setSelectPO] = useContext(POId);
  const [invoice] = useContext(CurrentInvoice);
  const id = useContext(Id);
  const [tabelData, setTableData] = useState("");
  const [addItem, setAddItem] = useState(false);
  const [refresh] = useContext(RefreshAttachmenstData);
  useEffect(() => {
    var url = `https://devxnet.cubastion.net/api/v1/invoicesItems/findByInvoiceId?id=${id}`;
    const fetchData = async () => {
      try {
        const response = await fetch(url, tokenRequestOption());
        const json = await response.json();
        setTableData(json.data);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, [refresh]);

  const tableHeaders = [
    "INVOICE ITEMS",
    "SELECTED HOURS",
    "WORKING DAYS",
    "ADDITIONAL TEXT",
    "UNIT OF MEASURE",
    "RATE",
    "CHARGED UNIT",
    "TOTAL AMOUNT",
  ];

  const poSelectorFunction = (x) => {
    setSelectPO(x);
  };
  return (
    <>
      <Dialog open={addItem}>this is dialog</Dialog>
      {invoice.status === "New" && <div style={{ float: "right", margin: "1rem" }}>
        <Button onClick={() => setAddItem(true)} variant="contained">
          Add
        </Button>
        &nbsp;
        <Button variant="contained">Edit</Button>
        &nbsp;
        <Button variant="contained">Delete</Button>
      </div>}
      <Table celled selectable>
        <Table.Header>
          <Table.Row>
            {tableHeaders.map((x) => (
              <Table.HeaderCell key={x}>{x}</Table.HeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {tabelData &&
            tabelData.map((x) => (
              <Table.Row
                style={
                  selectPO.Id === x.Id ? { backgroundColor: "lightgrey" } : {}
                }
                onClick={() => poSelectorFunction(x)}
                key={x.Id}
              >
                <Table.Cell>{x.itemName}</Table.Cell>
                <Table.Cell>{x.hours}</Table.Cell>
                <Table.Cell>{x.workingDays}</Table.Cell>
                <Table.Cell>
                  {x.additionalTextForPrint ? x.additionalTextForPrint : ""}
                </Table.Cell>
                <Table.Cell>{x.unitOfMeasure}</Table.Cell>
                <Table.Cell>{x.rate}</Table.Cell>
                <Table.Cell>{x.chargedUnit}</Table.Cell>
                <Table.Cell>{x.totalAmount}</Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table>
    </>
  );
};

export default InvoiceItemsTable;
