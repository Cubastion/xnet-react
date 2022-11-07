import React, { useEffect, useState } from "react";
import { tokenRequestOption } from "../../Helpers/misellaneous";
import { Table } from "semantic-ui-react";

const InternalPOTable = () => {
  const [internalPO, setInternalPO] = useState("");
  const [selectedInternalPO, setSelectedInternalPO] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  useEffect(() => {
    var url = `https://devxnet.cubastion.net//api/v1/internalPOs/findAll?page=${pageNumber}`;
    const fetchData = async () => {
      try {
        const response = await fetch(url, tokenRequestOption());
        const json = await response.json();
        setInternalPO(json.data);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, [pageNumber]);

  const TableHeader = [
    "PO NUMBER",
    "BUDGET YEAR",
    "VERSION",
    "START DATE",
    "END DATE",
    "TOTAL AMOUNT",
    "BUDGET HEAD",
    "STATUS",
    "CURRENCY CODE",
    "VENDOR NAME",
    "LEVEL1 APPROVAL DATE",
    "LEVEL2 APPROVAL DATE",
    "LEVEL 1 APPROVER",
    "LEVEL 2 APPROVER",
  ];

  return (
    <div>
      <Table striped>
        <Table.Header>
          <Table.Row>
            {TableHeader.map((x) => (
              <Table.HeaderCell key={x}>{x}</Table.HeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {internalPO &&
            internalPO?.map((x) => (
              <Table.Row
                style={
                  selectedInternalPO.Id === x.Id
                    ? { background: "lightgrey" }
                    : {}
                }
                onClick={() => setSelectedInternalPO(x)}
                key={x.Id}
              >
                <Table.Cell>{x.poNumber}</Table.Cell>
                <Table.Cell>{x.budget?.financialYear}</Table.Cell>
                <Table.Cell>{x.budget?.version}</Table.Cell>
                <Table.Cell>{x.startDate}</Table.Cell>
                <Table.Cell>{x.endDate}</Table.Cell>
                <Table.Cell>{x.totalAmount}</Table.Cell>
                <Table.Cell>{x.budgetHead?.name}</Table.Cell>
                <Table.Cell>{x.status}</Table.Cell>
                <Table.Cell>{x.currencyCode}</Table.Cell>
                <Table.Cell>{x.vendor?.name}</Table.Cell>
                <Table.Cell>{x.level1ApprovalDate}</Table.Cell>
                <Table.Cell>{x.level2ApprovalDate}</Table.Cell>
                <Table.Cell>
                  {x.employeeLevel1Data?.firstName +
                    " " +
                    x.employeeLevel1Data?.lastName}
                </Table.Cell>
                <Table.Cell>
                  {x.employeeLevel2Data?.firstName +
                    " " +
                    x.employeeLevel2Data?.lastName}
                </Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default InternalPOTable;
