import React, { useContext, useEffect, useState } from "react";
import { SelectedContextPO } from "../PurchaseOrders";
import { tokenRequestOption } from "../../Helpers/misellaneous";
import { Table } from "semantic-ui-react";
import { Button } from "@mui/material";
import { Drawer } from "@mui/material";
import AddPOItemsForm from "../POForms/AddPOItemsForm";
const POItemsTable = () => {
  const [activeAddForm, setActiveAddForm] = useState(false);
  const [activeEditForm, setActiveEditForm] = useState(false);
  const [activeForm, setActiveForm] = useState(false);
  const [selectedPO] = useContext(SelectedContextPO);
  const [poItems, setPoItems] = useState([]);
  var [currentCurrencySymbol, setCurrentCurrencySymbol] = useState("");
  useEffect(() => {
    var url = `https://devxnet.cubastion.net/api/v1/POItems/findPOItemsByPurchaseOrderId?id=${selectedPO.Id}`;
    const fetchData = async () => {
      try {
        const response = await fetch(url, tokenRequestOption());
        const json = await response.json();
        if (json.data.poItemsData[0].currencyCode) {
          convertToSymbol(json.data.poItemsData[0].currencyCode);
        }
        setPoItems(json.data);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, [selectedPO]);
  const tableHeader = [
    "NAME",
    "DISPLAY NAME",
    "DESCRIPTION",
    "RATE",
    "QTY",
    "AMOUNT",
    "CONSUMED QTY(LAST FY)",
    "CONSUMED QTY(CURR FY)",
    "REMAINING QTY",
    "REMAINING AMOUNT",
  ];

  const currency_symbols = {
    USD: "$", // US Dollar
    EUR: "€", // Euro
    CRC: "₡", // Costa Rican Colón
    GBP: "£", // British Pound Sterling
    ILS: "₪", // Israeli New Sheqel
    INR: "₹", // Indian Rupee
    JPY: "¥", // Japanese Yen
    KRW: "₩", // South Korean Won
    NGN: "₦", // Nigerian Naira
    PHP: "₱", // Philippine Peso
    PLN: "zł", // Polish Zloty
    PYG: "₲", // Paraguayan Guarani
    THB: "฿", // Thai Baht
    UAH: "₴", // Ukrainian Hryvnia
    VND: "₫", // Vietnamese Dong
  };

  const convertToSymbol = (x) => {
    if (currency_symbols[x] !== undefined) {
      setCurrentCurrencySymbol(currency_symbols[x]);
    }
  };

  return (
    <>
      <Drawer
        anchor="right"
        open={(activeForm && activeAddForm) || activeEditForm}
        onClose={() => {
          setActiveForm(false);
          setActiveAddForm(false);
          setActiveEditForm(false);
        }}
        variant={"temporary"}
      >
        {!activeEditForm && activeAddForm && <AddPOItemsForm />}
        {activeEditForm && !activeAddForm && <div>hello</div>}
      </Drawer>
      <div style={{ display: "flex" }}>
        <div style={{ marginTop: "2rem" }}>
          <h3>Purchase Order Items</h3>
        </div>
        <div
          style={{ float: "right", marginRight: "1rem", marginLeft: "48rem" }}
        >
          <Button
            onClick={() => {
              setActiveForm(true);
              setActiveAddForm(true);
            }}
            style={{ margin: "1rem" }}
            variant="contained"
          >
            Add Items
          </Button>
          <Button
            onClick={() => {
              setActiveForm(true);
              setActiveEditForm(true);
            }}
            style={{ margin: "1rem" }}
            variant="contained"
          >
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
              poItems?.poItemsData?.map((x) => (
                <Table.Row key={x.Id}>
                  <Table.Cell>{x.name}</Table.Cell>
                  <Table.Cell>{x.displayName}</Table.Cell>
                  <Table.Cell>{x.description}</Table.Cell>
                  <Table.Cell>{x.rate}</Table.Cell>
                  <Table.Cell>{x.quantity}</Table.Cell>
                  <Table.Cell>{x.amount}</Table.Cell>
                  <Table.Cell>{x.consumedQuantity}</Table.Cell>
                  <Table.Cell>{0}</Table.Cell>
                  <Table.Cell>{x.remainingQuantity}</Table.Cell>
                  <Table.Cell>{x.remainingAmount}</Table.Cell>
                </Table.Row>
              ))}
          </Table.Body>
          {poItems && (
            <Table.Footer>
              <Table.Row>
                <Table.Cell>Total</Table.Cell>
                <Table.Cell></Table.Cell>
                <Table.Cell></Table.Cell>
                <Table.Cell></Table.Cell>
                <Table.Cell>{poItems.totalQuantity}</Table.Cell>
                <Table.Cell>{`${currentCurrencySymbol}${poItems.totalAmount}`}</Table.Cell>
                <Table.Cell>{poItems.totalconsumedQauntity}</Table.Cell>
                <Table.Cell>{`${currentCurrencySymbol}${poItems.totalremainingAmount}`}</Table.Cell>
                <Table.Cell>{poItems.totalremainingQuantity}</Table.Cell>
              </Table.Row>
            </Table.Footer>
          )}
        </Table>
      </div>
    </>
  );
};

export default POItemsTable;
