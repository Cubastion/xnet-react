import React, { useContext, useEffect, useState } from "react";
import { SelectedContextPO } from "../PurchaseOrders";
import { tokenRequestOption } from "../../Helpers/misellaneous";
import { Table } from "semantic-ui-react";
import { Button } from "@mui/material";
import moment from "moment";
const POAttachmentsTable = () => {
  const [selectedPO] = useContext(SelectedContextPO);
  const [poItems, setPoItems] = useState([]);
  useEffect(() => {
    var url = ` https://devxnet.cubastion.net/api/v1/files/getAllOnedriveFiles?id=${selectedPO.Id}`;
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
    "ATTACHMENT NAME",
    "SIZE (IN BYTES)",
    "TYPE",
    "COMMENTS",
    "CREATED",
  ];

  const typeOfFile = (filename) => {
    console.log(filename.split(".").pop());
    return filename.split(".").pop();
  };

  const downloadFile = async (id, name) => {
    let url = `https://devxnet.cubastion.net/api/v1/files/dowloadOnedriveFile?id=${id}&fileName=${name}`;
    try {
      const response = await fetch(url, tokenRequestOption());
      const json = await response.json();
      return window.location.assign(json.data, "_blank");
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <>
      <div style={{ display: "flex" }}>
        <div style={{ marginTop: "2rem" }}>
          <h3>Purchase Order Attachments</h3>
        </div>
        <div
          style={{ float: "right", marginRight: "1rem", marginLeft: "48rem" }}
        >
          <Button style={{ margin: "1rem" }} variant="contained">
            Add Document
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
                  <Table.Cell
                    onClick={() => downloadFile(x.itemId, x.name)}
                    style={{ cursor: "pointer" }}
                  >
                    {x.name}
                  </Table.Cell>
                  <Table.Cell>{x.size}</Table.Cell>
                  <Table.Cell>{typeOfFile(x.name)}</Table.Cell>
                  <Table.Cell>{x.comments}</Table.Cell>
                  <Table.Cell>
                    {moment(x.createdAt).utc().format("YYYY-MM-DD")}
                  </Table.Cell>
                </Table.Row>
              ))}
          </Table.Body>
        </Table>
      </div>
    </>
  );
};

export default POAttachmentsTable;
