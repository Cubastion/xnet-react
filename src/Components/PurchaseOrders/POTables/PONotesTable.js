import React, { useContext, useEffect, useState } from "react";
import { SelectedContextPO } from "../PurchaseOrders";
import { tokenRequestOption } from "../../Helpers/misellaneous";
import { Table } from "semantic-ui-react";
import { Button, Dialog } from "@mui/material";
import AddNotesForm from "../POForms/AddNotesForm";
const PONotesTable = () => {
  const [selectedPO] = useContext(SelectedContextPO);
  const [poItems, setPoItems] = useState([]);
  const [openFormDialog, setOpenFormDialog] = useState(false);
  useEffect(() => {
    var url = `https://devxnet.cubastion.net/api/v1/purchaseOrder/getPONotes?id=${selectedPO.Id}`;
    const fetchData = async () => {
      try {
        const response = await fetch(url, tokenRequestOption());
        const json = await response.json();
        setPoItems(json.data);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, [selectedPO]);
  const tableHeader = ["DATE", "CREATED BY", "COMMENTS"];

  const refreshDataFunction = () => {
    var url = `https://devxnet.cubastion.net/api/v1/purchaseOrder/getPONotes?id=${selectedPO.Id}`;
    const fetchData = async () => {
      try {
        const response = await fetch(url, tokenRequestOption());
        const json = await response.json();
        setPoItems(json.data);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }

  return (
    <>
      <Dialog open={openFormDialog} onClose={() => setOpenFormDialog(false)}>
        <AddNotesForm setOpenFormDialog={setOpenFormDialog}  refreshDataFunction={refreshDataFunction}/>
      </Dialog>
      <div style={{ display: "flex" }}>
        <div style={{ marginTop: "2rem" }}> 
          <h3>Notes</h3>
        </div>
        <div
          style={{ float: "right", marginRight: "1rem", marginLeft: "58rem" }}
        >
          <Button
            onClick={() => setOpenFormDialog(true)}
            style={{ margin: "1rem" }}
            variant="contained"
          >
            Add
          </Button>
        </div>
      </div>
      <div
        style={{ width: "1100px", overflowY: "scroll", overflowX: "scroll" }}
      >
        <Table>
          <Table.Header>
            <Table.Row>
              {tableHeader.map((x) => (
                <Table.HeaderCell key={x}>{x}</Table.HeaderCell>
              ))}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {poItems &&
              poItems?.map((x) => (
                <Table.Row key={x.Id}>
                  <Table.Cell>{x.updatedAt}</Table.Cell>
                  <Table.Cell>{`${x.notesCreatedBy.employee}-${x.notesCreatedBy.firstName} ${x.notesCreatedBy.lastName}`}</Table.Cell>
                  <Table.Cell>{x.comments}</Table.Cell>
                </Table.Row>
              ))}
          </Table.Body>
        </Table>
      </div>
    </>
  );
};

export default PONotesTable;
