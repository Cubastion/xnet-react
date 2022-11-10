import React from "react";
import { useState,useEffect } from "react";
import {  Button } from "semantic-ui-react";
import { tokenRequestOption } from "../../../Helpers/misellaneous";
import "react-tabs/style/react-tabs.css";
import { Drawer } from "@mui/material";
import {useParams} from "react-router-dom";
import EditClientDetails from "./EditClientDetails";
import AddClientDetails from "./AddClientDetails";

const ClientDetails =() => {
    const[clientDetails, setClientDetails] = useState([]);
    const[client,setClient] = useState([]);
    const[editClientDetail, setEditClientDetail] = useState(false);
    const[addClientDetail, setAddClientDetail] = useState(false);
    const[addClientDetailForm, setAddClientDetailForm] = useState(false);
    const[editClientDetailForm, setEditClientDetailForm] = useState(false);
    const[addRefresh, setAddRefresh] = useState(false);
    const[editRefresh, setEditRefresh] = useState(false);
    
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
                // setClient(json.data)
                setEditClientDetail(json.data[0]);
                setAddClientDetail(json.data[0]);            
            } catch(error) {
                console.log("error", error);
            }
        };
        fetchData();
 
    },[addRefresh,editRefresh]);
    console.log(clientDetails,"------------------")
    console.log(addClientDetail,"--------------")


    const [toBeEditedClientDetail, setToBeEditedClientDetail] = useState("")
    const handleEditClick = (x) => { 
        setEditClientDetailForm(true)
        setToBeEditedClientDetail(x)
     }

     
  
    return (
        <>
        <div style={{float:"right"}}>
                <Drawer 
                    anchor="right"
                    open={addClientDetailForm}
                    onClose={() => setAddClientDetailForm(false)}
                    varient={"temporary"}>
                    <AddClientDetails fun={setAddClientDetailForm} clientDetails={clientDetails} addRefresh={setAddRefresh} />
                </Drawer>
                <Button onClick={() => setAddClientDetailForm(true)}>Add</Button>
            </div>
                <Drawer 
                    anchor="right"
                    open={editClientDetailForm}
                    onClose={() => setEditClientDetailForm(false)}
                    varient={"temporary"}>
                    <EditClientDetails toBeEditedClientDetail={toBeEditedClientDetail} fun={setEditClientDetailForm} clientDetails={clientDetails.contactDetails} refresh={setEditRefresh}> </EditClientDetails>     
                </Drawer>
        {clientDetails.contactDetails &&
             clientDetails.contactDetails.map((x) =>(
                
                    <div className="ui cards">
                        <div className="card">
                            <div className="content">
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
                            </div>
                            <div className="=" ui two buttons>
                                <div style={{float:"right"}}>
                                    
                                    <div class="ui basic button" cursorshover="true" style={{float:"right"}}  onClick={()=>handleEditClick(x)}>Edit</div>

                                </div>
                                <div class="ui basic button" cursorshover="true">Delete</div>
                            </div>
                        </div>
                        
                     </div>
                    
                
            
    
        
          
          
             ))}
        </>

        
    );
};

export default ClientDetails;
