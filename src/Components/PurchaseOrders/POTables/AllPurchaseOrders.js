import React, { useEffect, useState, useContext } from "react";
import { Table } from "semantic-ui-react";
import { tokenRequestOption } from "../../Helpers/misellaneous";
import Pagination from "@mui/material/Pagination";
import { Button } from "@mui/material";
import { SelectedContextPO } from "../PurchaseOrders";
import moment from "moment";

const AllPurchaseOrders = () => {
  const [allPO, setAllPO] = useState([]);
  const [pageNumber, setpageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [refreshedTotal, setRefreshedTotal] = useState("");

  const [selectedPO, setSelectedPO] = useContext(SelectedContextPO);
  useEffect(() => {
    var url = `https://devxnet.cubastion.net/api/v1/purchaseOrder/getAllPurchaseOrder?page=${pageNumber}`;
    const fetchData = async () => {
      try {
        const response = await fetch(url, tokenRequestOption());
        const json = await response.json();
        setAllPO(json.data);
        setTotalPages(json.paginate.totalPage);
        setSelectedPO(json.data[0]);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, [pageNumber]);

  const handleChangePage = (event, newPage) => {
    setpageNumber(newPage);
  };

  const TableHeader = [
    "PO #",
    "PROJECT NAME",
    "TOTAL",
    "CONSUMED",
    "REMAINING",
    "UNIT OF MEASURE",
    "CLIENT NAME",
    "DESCRIPTION",
    "ISSUE DATE",
    "START DATE",
    "END DATE",
    "STATUS",
    "CURRENCY",
    "PAYMENT DUE IN DAYS",
    "UOM ATTRIBUTE 2",
    "BYPASS TIMESHEET FLAG",
    "CREATED AT",
  ];

  const refreshTotal = async () => {
    var url = `https://devxnet.cubastion.net/api/v1/purchaseOrder/refreshTotal?id=${selectedPO.Id}`;
    const response = await fetch(url, tokenRequestOption());
    const json = await response.json();
    setRefreshedTotal(json.data);
  };

  const selectPOHandler = (x) => {
    setSelectedPO(x);
  };
  return (
    <>
      <div style={{ display: "flex" }}>
        <div style={{ marginTop: "2rem" }}>
          <h3>All Purchase Orders</h3>
        </div>
        <div
          style={{ float: "right", marginRight: "1rem", marginLeft: "40rem" }}
        >
          <Button
            onClick={refreshTotal}
            style={{ margin: "1rem" }}
            variant="contained"
          >
            Refresh Total
          </Button>
          <Button style={{ margin: "1rem" }} variant="contained">
            Add
          </Button>
          <Button style={{ margin: "1rem" }} variant="contained">
            Edit
          </Button>
        </div>
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
            {allPO &&
              allPO?.map((x) => (
                <Table.Row onClick={() => selectPOHandler(x)} key={x.Id}>
                  <Table.Cell>{x.po}</Table.Cell>
                  <Table.Cell>{x.project.name}</Table.Cell>
                  <Table.Cell>
                    {refreshTotal.totalValue
                      ? refreshTotal.totalValue
                      : x.totalValue}
                  </Table.Cell>
                  <Table.Cell>
                    {refreshTotal.consumedValue
                      ? refreshTotal.consumedValue
                      : x.consumedValue}
                  </Table.Cell>
                  <Table.Cell>
                    {refreshTotal.remainingValue
                      ? refreshTotal.remainingValue
                      : x.remainingValue}
                  </Table.Cell>
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
                  <Table.Cell>
                    {moment(x.createdAt).utc().format("YYYY-MM-DD")}
                  </Table.Cell>
                </Table.Row>
              ))}
          </Table.Body>
        </Table>
      </div>
      <Pagination count={totalPages} onChange={handleChangePage} />
    </>
  );
};

export default AllPurchaseOrders;
