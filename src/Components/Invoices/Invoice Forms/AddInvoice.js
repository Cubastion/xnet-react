import { Box, Modal } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "semantic-ui-react";
import {
  tokenRequestOption,
  tokenPostRequestOption,
} from "../../Helpers/misellaneous";
import PickPOTable from "../Invoices Table/PickPOTable";
// https://devxnet.cubastion.net/api/v1/invoices/addInvoice
const AddInvoice = (props) => {
  const [clientCheck, setClientCheck] = useState("");
  const [projectCheck, setProjectCheck] = useState("");
  const [clientName, setClientName] = useState("");
  const [organisation, setOrganisation] = useState("");
  const [projects, setProjects] = useState("");
  const [toggleModal, setToggleModal] = useState(false);
  const [selectedProjectPOs, setSelectedProjectPOs] = useState("");

  const type = ["Debit", "Forex", "Service"];
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = `https://devxnet.cubastion.net/api/v1/clients/getAllClientsForFilter`;
        let url1 =
          "https://devxnet.cubastion.net/api/v1/Organization/getAllOrganization";
        const response = await fetch(url, tokenRequestOption());
        const response1 = await fetch(url1, tokenRequestOption());

        const json = await response.json();
        const json1 = await response1.json();

        setClientName(json.data);
        setOrganisation(json1.data);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, []);
  const onSubmit = (data) => {
    console.log(data);
    var helper = {
      ...data,
      currencyCode: "INR",
      grossAmount: 0,
      gst: 0,
      invoiceDate: new Date(),
      invoiceNumberSeriesId: "",
      ownerId: "2j85hmc1skb43gq",
      purchaseOrderId: selectedProjectPOs.Id,
      revisionComments: "",
      revisionNumber: 0,
      status: "New",
      totalAmount: 0,
    };
    const fetchData = async () => {
      try {
        let url = `https://devxnet.cubastion.net/api/v1/invoices/addInvoice`;
        const response = await fetch(url, tokenPostRequestOption(helper));
        const json = await response.json();

        if (json.statusCode === "200") {
          alert("Invoice Added Successfully...!!!");
          props.refreshData();
          props.closeForm(false);
        } else alert(json.statusMessage);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  };

  const fetchProjectAssociatedToClient = async (value) => {
    try {
      let url = `https://devxnet.cubastion.net/api/v1/projects/getAllProjectsByClientId?clientId=${value}`;
      const response = await fetch(url, tokenRequestOption());
      const json = await response.json();
      setClientCheck(value);
      setProjects(json.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  const openModalToSelectPO = (e) => {
    e.preventDefault();
    setToggleModal(true);
  };
  return (
    <>
      <div>
        <Modal open={toggleModal} onClose={() => setToggleModal(false)}>
          <PickPOTable
            setSelectedProjectPOs={setSelectedProjectPOs}
            projectId={projectCheck}
            closeModal={setToggleModal}
          />
        </Modal>
      </div>
      <Box p={2} width="500px" textAlign="left" role="presentation">
        <h2>Add Invoice</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <div
              style={{
                margin: "1rem",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <label name="startDate">START DATE</label>
              <input
                type="date"
                {...register("startDate", { required: true })}
                htmlFor="startDate"
              />
            </div>
            <div
              style={{
                margin: "1rem",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <label name="endDate">END DATE</label>
              <input
                type="date"
                {...register("endDate", { required: true })}
                htmlFor="endDate"
              />
            </div>
            <div
              style={{
                margin: "1rem",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <label name="invoiceType">INVOICE TYPE</label>
              <select
                {...register("invoiceType", { required: true })}
                htmlFor="invoiceType"
              >
                <option value="">Select Type</option>
                {type.map((x) => (
                  <option key={x}>{x}</option>
                ))}
              </select>
            </div>

            <div
              style={{
                margin: "1rem",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <label name="clientId">CLIENT NAME</label>
              <select
                {...register("clientId", { required: true })}
                htmlFor="clientId"
                onChange={(e) => fetchProjectAssociatedToClient(e.target.value)}
              >
                <option value="">Select Client Name</option>
                {clientName &&
                  clientName.map((x) => (
                    <option value={x.Id} key={x.Id}>
                      {x.name}
                    </option>
                  ))}
              </select>
            </div>

            <div
              style={{
                margin: "1rem",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <label name="projectId">PROJECT</label>
              <select
                {...register("projectId", { required: true })}
                htmlFor="projectId"
                onChange={(e) => setProjectCheck(e.target.value)}
              >
                <option value="">Select Project</option>
                {projects &&
                  projects.map((x) => (
                    <option value={x.Id} key={x.Id}>
                      {x.name}
                    </option>
                  ))}
              </select>
            </div>
            <div style={{ display: "flex" }}>
              <div>
                <Button
                  onClick={(e) => openModalToSelectPO(e)}
                  disabled={!(projectCheck && clientCheck)}
                >
                  + Select PO
                </Button>
              </div>
              <div>
                <span>{selectedProjectPOs.po}</span>
              </div>
            </div>
            <div
              style={{
                margin: "1rem",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <label name="organizationId">ORGANISATION</label>
              <select
                {...register("organizationId", { required: true })}
                htmlFor="organizationId"
              >
                <option value={false}>Select Organisation</option>
                {organisation &&
                  organisation.map((x) => (
                    <option value={x.Id} key={x.Id}>
                      {x.name}
                    </option>
                  ))}
              </select>
            </div>

            <Button onClick={onSubmit}>Add</Button>
            <Button
              onClick={() => {
                props.closeForm(false);
              }}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Box>
    </>
  );
};

export default AddInvoice;
