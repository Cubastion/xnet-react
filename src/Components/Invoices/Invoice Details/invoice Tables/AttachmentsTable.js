import React, { useContext, useEffect, useState } from "react";
import { tokenRequestOption } from "../../../Helpers/misellaneous";
import { Id } from "../DetailedInvoice";
import { Table } from 'semantic-ui-react';

const AttachmentsTable = () => {
  const id = useContext(Id);
  const [tabelData, setTableData] = useState("");
  useEffect(() => {
    var url = `https://devxnet.cubastion.net/api/v1/files/getAllOnedriveFiles?id=${id}`;
    const fetchData = async () => {
      try {
        const response = await fetch(url, tokenRequestOption());
        const json = await response.json();
        console.log(json.data);
        setTableData(json.data);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, []);

  const tableHeaders = ["ATTACHMENT NAME","SIZE (IN BYTES)","TYPE","COMMENTS","CREATED"]
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

    </Table>
    </>
  );
};

export default AttachmentsTable;
