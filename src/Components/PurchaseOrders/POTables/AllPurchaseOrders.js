import React, { useEffect, useState } from "react";
import { Table, Button } from "semantic-ui-react";
import { tokenRequestOption } from "../../Helpers/misellaneous";
import TablePagination from '@mui/material/TablePagination';


const AllPurchaseOrders = () => {
  const [allPO, setAllPO] = useState([]);
  const [selectedPO, setSelectedPO] = useState("");
  const [pageNumber, setpageNumber] = useState(1);
  useEffect(() => {
    var url = `https://devxnet.cubastion.net/api/v1/purchaseOrder/getAllPurchaseOrder?page=${pageNumber}`;
    const fetchData = async () => {
      try {
        const response = await fetch(url, tokenRequestOption());
        const json = await response.json();
        setSelectedPO(json.data[0].Id);

        setAllPO(json.data);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, []);

  const handleChangePage = (event, newPage) => {
    setpageNumber(newPage);
  };


  return (
    <div style={{ width: "1100px", "overflow-y": "scroll" }}>
      <Table striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>PO #</Table.HeaderCell>
            <Table.HeaderCell>PROJECT NAME</Table.HeaderCell>
            <Table.HeaderCell>TOTAL</Table.HeaderCell>
            <Table.HeaderCell>CONSUMED</Table.HeaderCell>
            <Table.HeaderCell>REMAINING</Table.HeaderCell>
            <Table.HeaderCell>UNIT OF MEASURE</Table.HeaderCell>
            <Table.HeaderCell>CLIENT NAME</Table.HeaderCell>
            <Table.HeaderCell>DESCRIPTION</Table.HeaderCell>
            <Table.HeaderCell>ISSUE DATE</Table.HeaderCell>
            <Table.HeaderCell>START DATE</Table.HeaderCell>
            <Table.HeaderCell>END DATE</Table.HeaderCell>
            <Table.HeaderCell>STATUS</Table.HeaderCell>
            <Table.HeaderCell>CURRENCY</Table.HeaderCell>
            <Table.HeaderCell>PAYMENT DUE IN DAYS</Table.HeaderCell>
            <Table.HeaderCell>UOM ATTRIBUTE 2</Table.HeaderCell>
            <Table.HeaderCell>BYPASS TIMESHEET FLAG</Table.HeaderCell>
            <Table.HeaderCell>CREATED AT</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {allPO &&
            allPO?.map((x) => (
              <Table.Row>
                <Table.Cell>{x.po}</Table.Cell>
                <Table.Cell>{x.project.name}</Table.Cell>
                <Table.Cell>{x.totalValue}</Table.Cell>
                <Table.Cell>{x.consumedValue}</Table.Cell>
                <Table.Cell>{x.remainingValue}</Table.Cell>
                <Table.Cell>{x.unitOfMeasure}</Table.Cell>
                <Table.Cell>{x.client.name}</Table.Cell>
                <Table.Cell>{x.description}</Table.Cell>
                <Table.Cell>{x.issueDate}</Table.Cell>
                <Table.Cell>{x.startDate}</Table.Cell>
                <Table.Cell>{x.endDate}</Table.Cell>
                <Table.Cell>{x.status}</Table.Cell>
                <Table.Cell>{x.currencyCode}</Table.Cell>
                <Table.Cell>{x.paymentDueInDays}</Table.Cell>
                <Table.Cell>{x.uomAttribute2}</Table.Cell>
                <Table.Cell>{x.bypassTimesheetFlag}</Table.Cell>
                <Table.Cell>{x.createdAt}</Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table>
        <TablePagination
      component="div"
      onPageChange={handleChangePage}
    />
    </div>
  );
};

export default AllPurchaseOrders;
