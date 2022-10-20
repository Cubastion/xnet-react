import React, { useContext, useEffect, useState } from "react";
import { SelectedContextPO } from "../PurchaseOrders";
import { tokenRequestOption } from "../../Helpers/misellaneous";
import { Table } from "semantic-ui-react";

const POInvoicesTable = () => {
  const [selectedPO] = useContext(SelectedContextPO);
  const [poItems, setPoItems] = useState([]);
  useEffect(() => {
    var url = `https://devxnet.cubastion.net/api/v1/invoices/findInvoicesByPOId?id=${selectedPO.Id}`;
    const fetchData = async () => {
      try {
        const response = await fetch(url, tokenRequestOption());
        const json = await response.json();
        console.log(json.data);
        setPoItems(json.data);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, [selectedPO]);
  const tableHeader = [
    "INVOICE ID",
    "INVOICE #",
    "STATUS",
    "INVOICE DATE",
    "START DATE",
    "END DATE",
    "INVOICE TYPE",
    "GROSS AMOUNT",
    "GST",
    "TOTAL AMOUNT",
  ];

  return (
    <>
      <div style={{ display: "flex" }}>
        <div style={{ marginTop: "2rem" }}>
          <h3>Invoices</h3>
        </div>
        <div
          style={{ float: "right", marginRight: "1rem", marginLeft: "48rem" }}
        ></div>
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
                  <Table.Cell>{x.Id}</Table.Cell>
                  <Table.Cell>{x.invoiceNumber}</Table.Cell>
                  <Table.Cell>{x.status}</Table.Cell>
                  <Table.Cell>{x.invoiceDate}</Table.Cell>
                  <Table.Cell>{x.startDate}</Table.Cell>
                  <Table.Cell>{x.endDate}</Table.Cell>
                  <Table.Cell>{x.invoiceType}</Table.Cell>
                  <Table.Cell>{x.grossAmount}</Table.Cell>
                  <Table.Cell>{x.gst}</Table.Cell>
                  <Table.Cell>{x.totalAmount}</Table.Cell>
                </Table.Row>
              ))}
          </Table.Body>
        </Table>
      </div>
    </>
  );
};

export default POInvoicesTable;
