import React, { useContext, useEffect, useState } from "react";
import { tokenRequestOption } from "../../Helpers/misellaneous";
import { Id } from "./DetailedInvoice";
const Banner = () => {
  const id = useContext(Id)
  const [data, setData] = useState("");
  useEffect(() => {
    var url = `https://devxnet.cubastion.net/api/v1/invoices/findById?id=${id}`;
    const fetchData = async () => {
      try {
        const response = await fetch(url, tokenRequestOption());
        const json = await response.json();
        console.log(json.data)
        setData(json.data);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, []);

  const currency_symbols = {
    USD: "$", // US Dollar
    EUR: "€", // Euro
    CRC: "₡", // Costa Rican Colón
    GBP: "£", // British Pound Sterling
    ILS: "₪", // Israeli New Sheqel
    INR: "₹", // Indian Rupee
    JPY: "¥", // Japanese Yen
    KRW: "₩", // South Korean Won
    NGN: "₦", // Nigerian Naira
    PHP: "₱", // Philippine Peso
    PLN: "zł", // Polish Zloty
    PYG: "₲", // Paraguayan Guarani
    THB: "฿", // Thai Baht
    UAH: "₴", // Ukrainian Hryvnia
    VND: "₫", // Vietnamese Dong
  };

  const convertToSymbol = (x) => {
    if (currency_symbols[x] !== undefined) {
      return currency_symbols[x];
    }
    return "OTH";
  };

  return (
    <div className="">
      <div
        className="card p-3 mt-1"
        style={{ width: "95%", backgroundColor: "RGB(235 235 235)" }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ float: "left" }} className="bank-name">
            <span
              style={{ float: "left", fontSize: "20px", marginLeft: "1rem" }}
            >
              {data?.client?.name + "-" + data?.project?.name}
            </span>
          </div>
          <div style={{ marginTop: "-2rem" }}>
            <button
              type="button"
              className="btn btn-secondary"
              style={{ float: "right", margin: "0rem 1rem 1rem 0rem" }}
            >
              Submit
            </button>
            <button
              type="button"
              className="btn btn-secondary "
              style={{ float: "right", margin: "0rem 1rem 1rem 0rem" }}
            >
              Compute Total
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              style={{ float: "right", margin: "0rem 1rem 1rem 0rem" }}
            >
              Reset Invoice
            </button>
          </div>
        </div>
        <div className="row">
          <div style={{ marginTop: "3rem", width: "80%" }} className="row">
            <div className="invoice-id mt-2 col-md-2 col-sm-2">
              <p className="mb-0" style={{ color: "grey", fontWeight: "700" }}>
                Invoice ID
              </p>
              <h4>{data.Id}</h4>
            </div>
            <div className="invoice-num mt-2 col-md-2 col-sm-2">
              <p className="mb-0" style={{ color: "grey", fontWeight: "700" }}>
                Invoice #
              </p>
              <h4>{data.invoiceNumber}</h4>
            </div>
            <div className="po-num mt-2 col-md-2 col-sm-2">
              <p className="mb-0" style={{ color: "grey", fontWeight: "700" }}>
                PO #
              </p>
              <h4>{data.purchaseOrder?.po}</h4>
            </div>
            <div className="revision-num mt-2 col-md-2 col-sm-2">
              <p className="mb-0" style={{ color: "grey", fontWeight: "700" }}>
                Status
              </p>
              <h4>{data.status}</h4>
            </div>
            <div className="status mt-2 col-md-2 col-sm-2">
              <p className="mb-0" style={{ color: "grey", fontWeight: "700" }}>
                Project Name
              </p>
              <h4>{data.project?.name}</h4>
            </div>
            <div className="invoice-date mt-2 col-md-2 col-sm-2">
              <p className="mb-0" style={{ color: "grey", fontWeight: "700" }}>
                Invoice Date
              </p>
              <h4>{data.invoiceDate}</h4>
            </div>
            <div className="start-date mt-2 col-md-2 col-sm-2">
              <p className="mb-0" style={{ color: "grey", fontWeight: "700" }}>
                Start Date
              </p>
              <h4>{data.startDate}</h4>
            </div>
            <div className="end-date mt-2 col-md-2 col-sm-2">
              <p className="mb-0" style={{ color: "grey", fontWeight: "700" }}>
                End Date
              </p>
              <h4>{data.endDate}</h4>
            </div>
            <div className="currency mt-2 col-md-2 col-sm-2">
              <p className="mb-0" style={{ color: "grey", fontWeight: "700" }}>
                Gross Account
              </p>
              <h4>{data.grossAmount}</h4>
            </div>

            <div className="gst mt-2 col-md-2 col-sm-2">
              <p className="mb-0" style={{ color: "grey", fontWeight: "700" }}>
                GST
              </p>
              <h4>{data.gst}</h4>
            </div>
            <div className="gst mt-2 col-md-2 col-sm-2">
              <p className="mb-0" style={{ color: "grey", fontWeight: "700" }}>
                IRN
              </p>
              <h4>{data.irn ? data.irn : ""}</h4>
            </div>
          </div>
          <div className="col-md-6 col-sm-6"></div>
          <div
            className="card mt-4 col-md-6 col-sm-6"
            style={{
              backgroundColor: "blue",
              width: "fit-content",
              blockSize: "fit-content",
              padding: "0.5rem",
              color: "white",
              float: "right",
              left: "12rem",
            }}
          >
            <h2>
              Total Amount: {convertToSymbol(data.currencyCode) + " " + data.totalAmount}{" "}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
