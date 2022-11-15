import React, { useContext, useEffect, useState } from "react";
import { tokenRequestOption } from "../../../Helpers/misellaneous";
import { Id } from "../DetailedInvoice";
import { Table } from "semantic-ui-react";

const InvoiceItemsTable = () => {
  const id = useContext(Id);
  const [tabelData, setTableData] = useState("");
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
  }, []);
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
            {tabelData && tabelData.map((x) => (
                <Table.Row key={x.Id}>
                    <Table.Cell>
                        {x.itemName}
                    </Table.Cell>
                    <Table.Cell>
                        {x.hours}
                    </Table.Cell>
                    <Table.Cell>
                        {x.workingDays}
                    </Table.Cell>
                    <Table.Cell>
                        {x.additionalTextForPrint?x.additionalTextForPrint:""}
                    </Table.Cell>
                    <Table.Cell>
                        {x.unitOfMeasure}
                    </Table.Cell>
                    <Table.Cell>
                        {x.rate}
                    </Table.Cell>
                    <Table.Cell>
                        {x.chargedUnit}
                    </Table.Cell>
                    <Table.Cell>
                        {x.totalAmount}
                    </Table.Cell>
                </Table.Row>
            ))}
        </Table.Body>
      </Table>
    </>
  );
};

export default InvoiceItemsTable;
