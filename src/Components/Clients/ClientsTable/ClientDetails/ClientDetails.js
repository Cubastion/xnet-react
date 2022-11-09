import React from "react";
import { useState,useEffect } from "react";
import { Table, Button, Container } from "semantic-ui-react";
import { tokenRequestOption } from "../../../Helpers/misellaneous";
import {Tab, Tabs,TabList,TabPanel} from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { Drawer, Pagination, TableCell } from "@mui/material";
import {useParams} from "react-router-dom";
// import EditClientDetails from "./EditClientDetails";


const ClientDetails =(props) => {
    const[clientDetails, setClientDetails] = useState([]);
    const[client,setClient] = useState();
    const[clientContacts, setClientContacts] = useState([]);
    const[editClientForm, setEditClientForm] = useState([]);
    const params = useParams();
    let {id} = params
    console.log(id,"===============")
    useEffect(() =>{
        var url = `https://devxnet.cubastion.net/api/v1/clients/getClientById?id=${id}`
        const fetchData=async() => {
            try{
                const response = await fetch(url,tokenRequestOption());
                const json = await response.json();
                // console.log(json.data)
                setClientDetails(json.data)
                setClientContacts(json.data)
            } catch(error) {
                console.log("error", error);
            }
        };
        fetchData();
 
    },[]);
    console.log(clientDetails,"------------------")

    return (
        <>
                
        {clientDetails.contactDetails &&
             clientDetails.contactDetails.map((x) =>(
                <div className="ui cards" style={{overflow:"hidden"}}>
                    <div className="card" style={{overflow:"hidden"}}>
            <div className="content" >
              <div className="header">{x.title} {x.firstName} {x?.middleName} {x.lastName}</div>
              </div>
              <div className="meta">
                <a>{x.designation}</a>
              </div>
              <div className="description">
                {x.emailAddress}
              </div>
            <div className="extra content">
              <span className="right floated">
                {x.mobilePhone}
              </span>
              </div>
              <div>
              <span className="right floated-2">
                {x.workPhone}
              </span>
              <div className="="ui two buttons>
                
                <div class="ui basic green button" cursorshover="true" >Edit</div>
                <div class="ui basic red button" cursorshover="true">Delete</div>
              </div>
            </div>
    
        
          </div>

                </div>
          
             ))}
        </>

        
    );
};

export default ClientDetails;
