import React, { useEffect, useState } from "react";
import { tokenRequestOption } from "../Helpers/misellaneous";
import PoNavigator from "./PoNavigator";
import { Table } from "semantic-ui-react";
//https://devxnet.cubastion.net/api/v1/purchaseOrder/findByOwner?id=2j85hmc1skb43gq

const MyPurchaseOrder = () => {
  const [myPurchaseOrders, setMyPurchaseOrders] = useState();
  useEffect(() => {
    var url = `https://devxnet.cubastion.net/api/v1/purchaseOrder/findByOwner?id=2j85hmc1skb43gq`;
    const fetchData = async () => {
      try {
        const response = await fetch(url, tokenRequestOption());
        const json = await response.json();
        setMyPurchaseOrders(json.data);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, []);

  const TableHeader = [
    "PO #",
    "CLIENT NAME",
    "PROJECT NAME",
    "DESCRIPTION",
    "ISSUE DATE",
    "START DATE",
    "END DATE",
    "PAYMENT DUE IN DAYS",
    "STATUS",
    "UNIT OF MEASURE",
    "UOM ATTRIBUTE",
    "UOM ATTRIBUTE 2",
    "CURRENCY",
    "TOTAL VALUE",
    "AMOUNT CONSUMED",
    "AMOUNT REMAINING",
    "CREATED",
  ];

  return (
    <>
      <div>
        <PoNavigator
          selection={{ value: "my-purchase", label: "My Purchase Order" }}
        />
      </div>
      <div style={{ width: "1100px", overflowY: "scroll" }}>
        <Table striped>
          <Table.Header>
            <Table.Row>
              {TableHeader.map((x) => (
                <Table.HeaderCell key={x}>{x}</Table.HeaderCell>
              ))}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {myPurchaseOrders &&
              myPurchaseOrders?.map((x) => (
                <Table.Row key={x.Id}>
                  <Table.Cell>{x.po}</Table.Cell>
                  <Table.Cell>{x.client.name}</Table.Cell>
                  <Table.Cell>{x.project.name}</Table.Cell>
                  <Table.Cell>{x.description}</Table.Cell>
                  <Table.Cell>{x.issueDate}</Table.Cell>
                  <Table.Cell>{x.startDate}</Table.Cell>
                  <Table.Cell>{x.endDate}</Table.Cell>
                  <Table.Cell>{x.paymentDueInDays}</Table.Cell>
                  <Table.Cell>{x.status}</Table.Cell>
                  <Table.Cell>{x.unitOfMeasure}</Table.Cell>
                  <Table.Cell>{x.uomAttribute1}</Table.Cell>
                  <Table.Cell>{x.uomAttribute2}</Table.Cell>
                  <Table.Cell>{x.currencyCode}</Table.Cell>
                  <Table.Cell>{x.totalValue}</Table.Cell>
                  <Table.Cell>{x.consumedValue}</Table.Cell>
                  <Table.Cell>{x.remainingValue}</Table.Cell>
                  <Table.Cell>{x.createdAt}</Table.Cell>
                </Table.Row>
              ))}
          </Table.Body>
        </Table>
      </div>
    </>
  );
};

export default MyPurchaseOrder;
