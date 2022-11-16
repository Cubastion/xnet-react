import React, { useContext, useEffect, useState } from "react";
import { tokenRequestOption } from "../../../Helpers/misellaneous";
import { Id } from "../DetailedInvoice";
import { Table } from "semantic-ui-react";

const AttachmentsTable = () => {
  const id = useContext(Id);
  const [tabelData, setTableData] = useState("");
  useEffect(() => {
    var url = `https://devxnet.cubastion.net/api/v1/files/getAllOnedriveFiles?id=${id}`;
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
  }, []);

  const tableHeaders = [
    "ATTACHMENT NAME",
    "SIZE (IN BYTES)",
    "TYPE",
    "COMMENTS",
    "CREATED",
  ];

  const dateFormatter = (x) => {
    let d1 = new Date(x);
    return d1.toLocaleDateString();
  };

  const typeOfFile = (x) => {
    return x.split(".").pop().toUpperCase();
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
              <Table.Row key={x.Id}>
                <Table.Cell
                  onClick={() => downloadFile(x.itemId, x.name)}
                  style={{ cursor: "pointer" }}
                >
                  {x.name}
                </Table.Cell>
                <Table.Cell>
                  {(x.size / 1000).toFixed(1) + " " + "MB"}
                </Table.Cell>
                <Table.Cell>{typeOfFile(x.name)}</Table.Cell>
                <Table.Cell>{x.comments}</Table.Cell>
                <Table.Cell>{dateFormatter(x.createdAt)}</Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table>
    </>
  );
};

export default AttachmentsTable;
