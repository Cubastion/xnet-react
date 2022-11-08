import React, { useEffect, useState } from "react";
import {
  tokenPostRequestOption,
  tokenRequestOption,
} from "../Helpers/misellaneous";
import PoNavigator from "./PoNavigator";
import { Button, Table } from "semantic-ui-react";

// https://devxnet.cubastion.net/api/v1/internalPOs/getIPOByStatus?status=Awaiting%20Department%20Approval
const InternalPOLAll = () => {
  const [l1PO, setL1PO] = useState();
  const [selectedItem, setSelectedItem] = useState("");

  useEffect(() => {
    var url = `https://devxnet.cubastion.net/api/v1/internalPOs/getIPOByStatus?status=Awaiting Department Approval`;
    const fetchData = async () => {
      try {
        const response = await fetch(url, tokenRequestOption());
        const json = await response.json();
        setL1PO(json.data);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, []);


  const refreshData = () => {
    var url = `https://devxnet.cubastion.net/api/v1/internalPOs/getIPOByStatus?status=Awaiting Department Approval`;
    const fetchData = async () => {
      try {
        const response = await fetch(url, tokenRequestOption());
        const json = await response.json();
        setL1PO(json.data);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }

  const TableHeader = [
    "PO NUMBER",
    "BUDGET HEAD",
    "VENDOR NAME",
    "VERSION",
    "START DATE",
    "END DATE",
    "STATUS",
    "CURRENCY CODE",
    "TOTAL AMOUNT",
  ];

  const approveRequest = async () => {
    let url = `https://devxnet.cubastion.net/api/v1/internalPOs/internalPOapprovedByLevel1?id=${selectedItem}`;

    try {
      const response = await fetch(url, tokenPostRequestOption());
      const json = await response.json();
      if (json.statusCode === "200") {
        alert("Request Approve");
        refreshData();
      } else {
        alert(json.statusMessage);
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  const rejectRequest = async () => {
    var url =
      "https://devxnet.cubastion.net//api/v1/internalPOs/updateInternalPOs";
    var data = { Id: selectedItem, status: "Rejected" };
    try {
      const response = await fetch(url, tokenPostRequestOption(data));
      const json = await response.json();
      if (json.statusCode === "200") {
        alert("Request Rejected");
        refreshData();
      } else {
        alert(json.statusMessage);
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <PoNavigator
          selection={{
            value: "internal-po-approval-level-all",
            label: "Internal PO Approval Level All",
          }}
        />
      </div>

      <div
        style={{
          display: "flex",
          float: "right",
          marginRight: "1rem",
          marginLeft: "60rem",
          marginBottom: "1rem",
        }}
      >
        <Button onClick={approveRequest}>Approve</Button>
        <Button onClick={rejectRequest}>Reject</Button>
      </div>
      <div style={{ width: "1100px" }}>
        <Table striped>
          <Table.Header>
            <Table.Row>
              {TableHeader.map((x) => (
                <Table.HeaderCell key={x}>{x}</Table.HeaderCell>
              ))}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {l1PO &&
              l1PO?.map((x) => (
                <Table.Row
                  style={
                    selectedItem === x.Id ? { background: "lightgrey" } : {}
                  }
                  onClick={() => setSelectedItem(x.Id)}
                  key={x.Id}
                >
                  <Table.Cell>{x.poNumber}</Table.Cell>
                  <Table.Cell>{x.budgetHead?.name}</Table.Cell>
                  <Table.Cell>{x.vendor?.name}</Table.Cell>
                  <Table.Cell>{x.budget?.version}</Table.Cell>
                  <Table.Cell>{x.startDate}</Table.Cell>
                  <Table.Cell>{x.endDate}</Table.Cell>
                  <Table.Cell>{x.status}</Table.Cell>
                  <Table.Cell>{x.currencyCode}</Table.Cell>
                  <Table.Cell>{x.totalAmount}</Table.Cell>
                </Table.Row>
              ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
};

export default InternalPOLAll;
