import React from "react";
import { useState, useEffect } from "react";
import { Button } from "semantic-ui-react";
import {
  tokenRequestOption,
  tokenDeleteRequestOption,
} from "../../../Helpers/misellaneous";
import "react-tabs/style/react-tabs.css";
import { Drawer } from "@mui/material";
import { useParams } from "react-router-dom";
import EditClientDetails from "./EditClientDetails";
// import ProjectTable from "../ClientProject/ProjectTable";
import AddClientDetails from "./AddClientDetails";

const ClientDetails = (props) => {
  const [clientDetails, setClientDetails] = useState([]);
  const [client, setClient] = useState([]);
  const [editClientDetail, setEditClientDetail] = useState(false);
  const [addClientDetail, setAddClientDetail] = useState(false);
  const [addClientDetailForm, setAddClientDetailForm] = useState(false);
  const [editClientDetailForm, setEditClientDetailForm] = useState(false);
  const [addRefresh, setAddRefresh] = useState(false);
  const [editRefresh, setEditRefresh] = useState(false);
  const [deleteDetailRefresh, setDeleteDetailRefresh] = useState(false);

  const params = useParams();
  let { id } = params;
  
  const fetchData = async () => {
    try {
      var url = `https://devxnet.cubastion.net/api/v1/clients/getClientById?id=${id}`;
      const response = await fetch(url, tokenRequestOption());
      const json = await response.json();
      setClientDetails(json.data);
      setEditClientDetail(json.data[0]);
      setAddClientDetail(json.data[0]);
    } catch (error) {
      console.log("error", error);
    }
  };
  console.log(clientDetails)

  useEffect(() => {
    fetchData();
  },[]);


  const onDeleteData = (data) => {
    const deleteData = async () => {
      try {
        let url = `https://devxnet.cubastion.net/api/v1/clientContact/deleteClientContact?id=${data}`;
        const response = await fetch(url, tokenDeleteRequestOption());
        const json = await response.json();
        if (json.statusCode === "200") {
          alert("Clients Details Deleted Successfully !");
          // setDeleteDetail(json.data)
          // props.fun(false);
          fetchData();
        } else alert(json.statusMessage);
      } catch (error) {
        console.log("error", error);
      }
    };
    deleteData();
  };
  console.log(deleteDetailRefresh, "//////");

  const [toBeEditedClientDetail, setToBeEditedClientDetail] = useState("");
  const handleEditClick = (x) => {
    setEditClientDetailForm(true);
    setToBeEditedClientDetail(x);
  };
  console.log(clientDetails.Id);

  console.log(editRefresh, "[[[[[]]]]");

  return (
    <>
      <div style={{ float: "right", display: "flex", flexDirection: "row" }}>
        <Drawer
          anchor="right"
          open={addClientDetailForm}
          onClose={() => setAddClientDetailForm(false)}
          varient={"temporary"}
        >
          <AddClientDetails
            fun={setAddClientDetailForm}
            clientDetails={clientDetails}
            addRefresh={setAddRefresh}
          />
        </Drawer>
        <div style={{marginLeft:'85%'}}>
        <Button onClick={() => setAddClientDetailForm(true)} style={{margin:"10px"}}>Add</Button>
        </div>
      </div>
      <Drawer
        anchor="right"
        open={editClientDetailForm}
        onClose={() => setEditClientDetailForm(false)}
        varient={"temporary"}
      >
        <EditClientDetails
          toBeEditedClientDetail={toBeEditedClientDetail}
          fun={setEditClientDetailForm}
          clientDetails={clientDetails.contactDetails}
          refresh={setEditRefresh}
        >
          {" "}
        </EditClientDetails>
      </Drawer>
      <div>
        <h1>Client</h1>
        <div className="ui cards">
          {clientDetails.contactDetails &&
            clientDetails.contactDetails.map((x) => (
              <div className="card" clientDetails={clientDetails}>
                <div className="content">
                  <div className="header">
                    {x.title} {x.firstName} {x?.middleName} {x.lastName}
                  </div>
                </div>
                <div className="meta">
                  <a>{x.designation}</a>
                </div>
                <div className="description">{x.emailAddress}</div>
                <div className="extra content">
                  <span className="right floated">{x.mobilePhone}</span>
                </div>
                <div>
                  <span className="right floated-2">{x.workPhone}</span>
                </div>
                <div className="=" ui two buttons>
                  <div style={{ float: "right" }}>
                    <div
                      class="ui basic button"
                      cursorshover="true"
                      style={{ float: "right" }}
                      onClick={() => handleEditClick(x)}
                    >
                      Edit
                    </div>
                  </div>
                  <div
                    class="ui basic button"
                    cursorshover="true"
                    deleteRefresh={setDeleteDetailRefresh}
                    onClick={() => onDeleteData(x.Id)}
                  >
                    Delete
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      {/* <h4>Projects</h4>
      <ProjectTable></ProjectTable> */}
    </>
  );
};

export default ClientDetails;
