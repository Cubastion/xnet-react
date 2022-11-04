import React, { useContext, useEffect, useState } from "react";
import { SelectedContextPO } from "../PurchaseOrders";
import { tokenRequestOption } from "../../Helpers/misellaneous";
import { Table } from "semantic-ui-react";
import { Button, Dialog } from "@mui/material";
import AddForeCastForm from "../POForms/AddForeCastForm";
import EditForecastForm from "../POForms/EditForecastForm";
const POForecastsTable = () => {
  const [selectedPO] = useContext(SelectedContextPO);
  const [poItems, setPoItems] = useState([]);
  const [selectedForcastItem, setSelectedForcastItem] = useState("")
  const [openDialog, setOpenDialog] = useState(false);
  const [enableEdit, setEnableEdit] = useState(false)
  useEffect(() => {
    var url = `https://devxnet.cubastion.net/api/v1/purchaseOrder/getPOForecast?id=${selectedPO.Id}`;
    const fetchData = async () => {
      try {
        const response = await fetch(url, tokenRequestOption());
        const json = await response.json();
       
        setPoItems(json.data);
        setSelectedForcastItem(json.data[0])
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, [selectedPO]);


  const refreshDataFunction = () => {
    var url = `https://devxnet.cubastion.net/api/v1/purchaseOrder/getPOForecast?id=${selectedPO.Id}`;
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


  const tableHeader = [
    "FINANCIAL YEAR",
    "MONTH",
    "EXPECTED BILLING",
    "ACTUAL BILLED",
    "CONVERSION FACTOR",
    "COMMENTS",
  ];

  return (
    <>
    <Dialog open={openDialog} onClose={() =>{ setOpenDialog(false); setEnableEdit(false);}}>
      {!enableEdit && <AddForeCastForm setEnableEdit={setEnableEdit} setOpenDialog={setOpenDialog} refreshDataFunction={refreshDataFunction}/>}
      {enableEdit && <EditForecastForm selectedForcastItem={selectedForcastItem} setEnableEdit={setEnableEdit} setOpenDialog={setOpenDialog} refreshDataFunction={refreshDataFunction}/>}
    </Dialog>

      <div style={{ display: "flex" }}>
        <div style={{ marginTop: "2rem" }}>
          <h3>Forecasts</h3>
        </div>
        <div
          style={{ float: "right", marginRight: "1rem", marginLeft: "58rem" }}
        >
          <Button onClick={()=>setOpenDialog(true)} style={{ margin: "1rem" }} variant="contained">
            Add
          </Button>
          <Button onClick={()=>{setEnableEdit(true);
          setOpenDialog(true)
          }} style={{ margin: "1rem" }} variant="contained">
            Edit
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
                <Table.Row onClick={()=>setSelectedForcastItem(x)} style={selectedForcastItem.Id === x.Id? {backgroundColor:'lightgrey'}:{}} key={x.Id}>
                  <Table.Cell>{x.financialYear}</Table.Cell>
                  <Table.Cell>{x.month}</Table.Cell>
                  <Table.Cell>{x.expectedBilling}</Table.Cell>
                  <Table.Cell>{x.actualBilling}</Table.Cell>
                  <Table.Cell>{x.conversionFactor}</Table.Cell>
                  <Table.Cell>{x.comments}</Table.Cell>
                </Table.Row>
              ))}
          </Table.Body>
        </Table>
      </div>
    </>
  );
};

export default POForecastsTable;
