import React, { useEffect, useState } from "react";
import { tokenRequestOption } from "../../Helpers/misellaneous";
import InvoiceNavigator from "../InvoiceNavigator/InvoiceNavigator";
import { Table } from "semantic-ui-react";
import { Pagination } from "@mui/material";
import { useNavigate } from "react-router-dom";

const InvoicesPendingDispatch = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState("");
  const [invoicesData, setInvoicesData] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    var url = `https://devxnet.cubastion.net/api/v1/invoices/getDispatchInvoice?page=${pageNumber}&dispatchFlag=true&status=Submitted`;
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
  const TableHeader = [
    "INVOICE #",
    "INVOICE DATE",
    "INVOICE TYPE",
    "CLIENT NAME",
    "PROJECT NAME",
    "ORGANIZATION",
    "CURRENCY",
    "GROSS AMOUNT",
    "GST",
    "TOTAL AMOUNT",
    "EINVOICE",
  ];
  const handleChangePage = (event, newPage) => {
    setPageNumber(newPage);
  };

  return (
    <>
      <div>
        <InvoiceNavigator currentPage={3} />
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
                  <Table.Row key={x.Id}>
                    <Table.Cell onClick={()=>navigate(`/invoice/${x.Id}`)} style={{color:'blue', cursor: "pointer" }}>
                      {x.Id}
                    </Table.Cell>
                    <Table.Cell>{x.invoiceDate}</Table.Cell>
                    <Table.Cell>{x.invoiceType}</Table.Cell>
                    <Table.Cell>{x.client?.name}</Table.Cell>
                    <Table.Cell>{x.project?.name}</Table.Cell>
                    <Table.Cell>{x.organization?.name}</Table.Cell>
                    <Table.Cell>{x.currencyCode}</Table.Cell>
                    <Table.Cell>{x.grossAmount}</Table.Cell>
                    <Table.Cell>{x.gst}</Table.Cell>
                    <Table.Cell>{x.totalAmount}</Table.Cell>
                    <Table.Cell>
                      <input
                        disabled
                        type="checkbox"
                        defaultChecked={x.eInvoiceFlag}
                      />
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

export default InvoicesPendingDispatch;
