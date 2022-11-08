import React, { useContext, useEffect, useState } from "react";
import {
  tokenPostRequestOption,
  tokenPutRequestOption,
  tokenRequestOption,
} from "../../Helpers/misellaneous";
import { Button, Table } from "semantic-ui-react";
import { Drawer, Pagination } from "@mui/material";
import AddInternalPOForm from "../POForms/AddInternalPOForm";
import { selectedInternalPO } from "../InternalPO";
import EditInternalPOForm from "../POForms/EditInternalPOForm";
const InternalPOTable = (props) => {
  const [internalPO, setInternalPO] = useState("");
  const [selectedInternalPOItem, setSelectedInternalPOItem] =
    useContext(selectedInternalPO);
  const [pageNumber, setpageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [addForm, setAddForm] = useState(false);
  const [editForm, setEditForm] = useState(false);
  useEffect(() => {
    var url = `https://devxnet.cubastion.net//api/v1/internalPOs/findAll?page=${pageNumber}`;
    const fetchData = async () => {
      try {
        const response = await fetch(url, tokenRequestOption());
        const json = await response.json();
        setInternalPO(json.data);
        setTotalPages(json.paginate.totalPage);
        setSelectedInternalPOItem(json.data[0] ? json.data[0] : "");
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, [pageNumber]);

  const handleChangePage = (event, newPage) => {
    setpageNumber(newPage);
  };

  const refreshData = () => {
    var url = `https://devxnet.cubastion.net//api/v1/internalPOs/findAll?page=${1}`;
    const fetchData = async () => {
      try {
        const response = await fetch(url, tokenRequestOption());
        const json = await response.json();
        setInternalPO(json.data);
        setTotalPages(json.paginate.totalPage);
        setSelectedInternalPOItem(json.data[0] ? json.data[0] : "");
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  };

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
  const submitforApproval = () => {
    var url = `https://devxnet.cubastion.net/api/v1/internalPOs/submitPO?id=${selectedInternalPOItem.Id}`;
    var data = { status: "Awaiting Department Approval" };
    const fetchData = async () => {
      try {
        const response = await fetch(url, tokenPutRequestOption(data));
        const json = await response.json();
        alert(json.statusMessage);
        refreshData();
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  };
  return (
    <>
      <Drawer
        anchor="right"
        open={addForm || editForm}
        onClose={() => {
          setAddForm(false);
          setEditForm(false);
        }}
      >
        {addForm && (
          <AddInternalPOForm
            refreshData={refreshData}
            activeBudget={props.activeBudget}
            selectedInternalPO={selectedInternalPOItem}
          />
        )}
        {editForm && (
          <EditInternalPOForm
            refreshData={refreshData}
            activeBudget={props.activeBudget}
            selectedInternalPO={selectedInternalPOItem}
          />
        )}
      </Drawer>

      <h3>Internal PO</h3>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ float: "right", margin: "1rem", marginLeft: "50rem" }}>
          <Button>Search</Button>
          <Button onClick={() => setAddForm(true)}>Add</Button>
          { selectedInternalPOItem.status === "Draft" && <Button onClick={() => setEditForm(true)}>Edit</Button>}
          {props.eligibleforApproval &&
            selectedInternalPOItem.status === "Draft" && (
              <Button onClick={submitforApproval}>Submit For Approval</Button>
            )}
        </div>
        <div style={{ overflow: "scroll" }}>
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
                      selectedInternalPOItem.Id === x.Id
                        ? { background: "lightgrey" }
                        : {}
                    }
                    onClick={() => setSelectedInternalPOItem(x)}
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
        <Pagination count={totalPages} onChange={handleChangePage} />
      </div>
    </>
  );
};

export default InternalPOTable;
