import React, { useEffect, useState } from "react";
import { tokenRequestOption } from "../../Helpers/misellaneous";
import InvoiceNavigator from "../InvoiceNavigator/InvoiceNavigator";
import { Table } from "semantic-ui-react";
import { Button, Drawer, Pagination } from "@mui/material";
import EditAllInvoicesForm from "../Invoice Forms/EditAllInvoicesForm";
import { useNavigate } from "react-router-dom";
const AllInvoices = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState("");
  const [invoicesData, setInvoicesData] = useState("");
  const [activateEditForm, setActivateEditForm] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    var url = `https://devxnet.cubastion.net/api/v1/invoices/findAll?page=${pageNumber}`;
    const fetchData = async () => {
      try {
        const response = await fetch(url, tokenRequestOption());
        const json = await response.json();
        setInvoicesData(json.data);
        console.log(json.paginate.totalPages);
        setTotalPages(json.paginate.totalPage);
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, [pageNumber]);

  const refreshData = async () => {
    var url = `https://devxnet.cubastion.net/api/v1/invoices/findAll?page=${pageNumber}`;
    try {
      const response = await fetch(url, tokenRequestOption());
      const json = await response.json();
      setInvoicesData(json.data);
      setTotalPages(json.paginate.totalPage);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  const TableHeader = [
    "INVOICE ID",
    "INVOICE #",
    "STATUS",
    "INVOICE DATE",
    "START DATE",
    "END DATE",
    "INVOICE TYPE",
    "CLIENT NAME",
    "PROJECT NAME",
    "PO #",
    "PO DESC",
    "ORGANIZATION",
    "CURRENCY",
    "GROSS AMOUNT",
    "CONVERSION FACTOR",
    "GST",
    "TOTAL AMOUNT",
    "CANCELLATION COMMENTS",
    "SALES COMMISSION FY",
    "EINVOICE",
    "DISPATCHED",
    "DISPATCH DATE",
    "DISPATCH BY",
  ];
  const handleChangePage = (event, newPage) => {
    setPageNumber(newPage);
  };
  return (
    <>
      <Drawer
        anchor="right"
        open={activateEditForm}
        onClose={() => setActivateEditForm(false)}
      >
        <EditAllInvoicesForm
          selectedInvoice={selectedInvoice}
          setActivateEditForm={setActivateEditForm}
          refreshData={refreshData}
        />
      </Drawer>
      <div>
        <InvoiceNavigator currentPage={1} />
      </div>
      <div
        style={{
          marginBottom: "1rem",
          display: "flex",
          justifyContent: "end",
          maxWidth: "1100px",
        }}
      >
        <Button
          disabled={!selectedInvoice}
          onClick={() => setActivateEditForm(true)}
        >
          Edit
        </Button>
        <Button>Search</Button>
        <Button>Export</Button>
      </div>
      <div>
        <div
          style={{
            marginBottom: "1rem ",
            width: "1100px",
            overflowY: "scroll",
          }}
        >
          <Table striped>
            <Table.Header>
              <Table.Row>
                {TableHeader.map((x) => (
                  <Table.HeaderCell key={x}>{x}</Table.HeaderCell>
                ))}
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {invoicesData &&
                invoicesData.map((x) => (
                  <Table.Row
                    style={
                      selectedInvoice.Id === x.Id
                        ? { background: "lightgrey" }
                        : {}
                    }
                    onClick={() => setSelectedInvoice(x)}
                    key={x.Id}
                  >
                    <Table.Cell
                      onClick={() => navigate(`/invoice/${x.Id}`)}
                      style={{ color: "blue", cursor: "pointer" }}
                    >
                      {x.Id}
                    </Table.Cell>
                    <Table.Cell>{x.invoiceNumber}</Table.Cell>
                    <Table.Cell>{x.status}</Table.Cell>
                    <Table.Cell>{x.invoiceDate}</Table.Cell>
                    <Table.Cell>{x.startDate}</Table.Cell>
                    <Table.Cell>{x.endDate}</Table.Cell>
                    <Table.Cell>{x.invoiceType}</Table.Cell>
                    <Table.Cell>{x.client?.name}</Table.Cell>
                    <Table.Cell>{x.project?.name}</Table.Cell>
                    <Table.Cell>{x.purchaseOrder?.po}</Table.Cell>
                    <Table.Cell>{x.purchaseOrder?.description}</Table.Cell>
                    <Table.Cell>{x.organization?.name}</Table.Cell>
                    <Table.Cell>{x.currencyCode}</Table.Cell>
                    <Table.Cell>{x.grossAmount}</Table.Cell>
                    <Table.Cell>{x.conversionFactor}</Table.Cell>
                    <Table.Cell>{x.gst}</Table.Cell>
                    <Table.Cell>{x.totalAmount}</Table.Cell>
                    <Table.Cell>{x.revisionComments}</Table.Cell>
                    <Table.Cell>{x.salesCommissionFY}</Table.Cell>
                    <Table.Cell>
                      <input
                        disabled
                        type="checkbox"
                        defaultChecked={x.eInvoiceFlag}
                      />
                    </Table.Cell>
                    <Table.Cell>
                      <input
                        disabled
                        type="checkbox"
                        defaultChecked={x.dispatchFlag}
                      />
                    </Table.Cell>
                    <Table.Cell>{x.dispatchDate}</Table.Cell>
                    <Table.Cell>
                      {x.dispatchedByPerson?.firstName +
                        " " +
                        x.dispatchedByPerson?.lastName}
                    </Table.Cell>
                  </Table.Row>
                ))}
            </Table.Body>
          </Table>
        </div>
        <div style={{ marginBottom: "2rem" }}>
          <Pagination
            siblingCount={0}
            boundaryCount={2}
            count={totalPages}
            onChange={handleChangePage}
          />
        </div>
      </div>
    </>
  );
};

export default AllInvoices;
