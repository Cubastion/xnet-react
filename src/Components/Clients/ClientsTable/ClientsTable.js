import React from "react";
import { useEffect, useState } from "react";
import { Table, Button, Container } from "semantic-ui-react";
import { tokenRequestOption } from "../../Helpers/misellaneous";
import {Tab, Tabs,TabList,TabPanel} from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { Drawer, Pagination, TableCell } from "@mui/material";
import AddClients from "./AddClients";
import EditClients from "./EditClients";
import Leads from "./Leads/Leads";
import Opportunity from "./Opportunity/Opportunity";
import Project from "./ProjectCRTracker/Project";
import { CompressOutlined } from "@mui/icons-material";
const ClientsTable = ()=> {
    const [client, setClient] = useState([]);
    const [clientData, setClientData] = useState([]);
    const[addClient,setAddClient] = useState(false);
    const[editClient, setEditClient]= useState(false);
    const[addClientForm,setAddClientForm] = useState(false);
    const [addClientRefresh, setAddClienRefresh] = useState(false);
    const [editClientRefresh, setEditClienRefresh] = useState(false);
    const [editClientForm, setEditClientForm] = useState(false);
    const [pageNumber, setpageNumber] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    useEffect (() => {
        var url = `https://devxnet.cubastion.net/api/v1/clients/getAllClient?page=${pageNumber}`;
        const fetchData = async() => {
            try{
                const response = await fetch(url,tokenRequestOption());
                const json = await response.json();
                // console.log(json.data)
                setClient(json.data);
                setTotalPages(json.paginate.totalPage);
                setAddClient(json.data[0])
            } catch(error) {
                console.log("error", error);
            }
        };
        fetchData();

    },[addClientRefresh,editClientRefresh,pageNumber]);
    const handleChangePage = (event, newPage) => {
        setpageNumber(newPage);
      };

    let onSelectClient =(x) => {
        setClientData(x);
        setAddClient(x);
        setEditClient(x);
    };
console.log(clientData,"--------------------")
    return(
        <>
        <div>
            <div style={{float:"right"}}>
                <Drawer 
                    anchor="right"
                    open={addClientForm}
                    onClose={() => setAddClientForm(false)}
                    varient={"temporary"}>
                    <AddClients fun={setAddClientForm} addRefresh={setAddClienRefresh}></AddClients>
                </Drawer>
                <Button onClick={() => setAddClientForm(true)}>Add</Button>
                <Drawer 
                    anchor="right"
                    open={editClientForm}
                    onClose={() => setEditClientForm(false)}
                    varient={"temporary"}>
                    <EditClients fun={setEditClientForm} refresh={setEditClienRefresh} clientsDetails={clientData}></EditClients>
                </Drawer>
                <Button onClick={() => setEditClientForm(true)}>Edit</Button>
            </div>
            <h4>Clients</h4>
            <Table striped>
                <Table.Header>
                    <Table.Row positive>
                        <Table.HeaderCell >Name</Table.HeaderCell>
                        <Table.HeaderCell >Alias Name</Table.HeaderCell>
                        <Table.HeaderCell >Address</Table.HeaderCell>
                        <Table.HeaderCell >PAN</Table.HeaderCell>
                        <Table.HeaderCell >GST</Table.HeaderCell>
                        <Table.HeaderCell >Owner</Table.HeaderCell>
                        <Table.HeaderCell >Holiday Calender</Table.HeaderCell>
                        <Table.HeaderCell >Account Manager</Table.HeaderCell>
                        <Table.HeaderCell >Head count</Table.HeaderCell>
                        <Table.HeaderCell >Resigned Count</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {client &&
                        client.map((x) => (
                            <Table.Row onClick={() => onSelectClient(x)} key={x.Id} style={clientData.Id === x.Id?{backgroundColor:"lightGrey"}:{}}>
                            
                                <TableCell>
                                    {x.name}
                                </TableCell>
                                 <TableCell>
                                    {x.aliasName}
                                </TableCell>                                
                               <TableCell>
                                {x.address?.addressLine1}
                                {x.address?.addressLine2}
                                {x.address?.city}
                                {x.address?.state}
                                {x.address?.country}
                                {x.address?.pincode}
                                </TableCell>                           
                                <TableCell>
                                    {x.pan}
                                </TableCell>
                                <TableCell>
                                    {x.gst}
                                </TableCell>
                                <TableCell>
                                    {x.employees?.firstName}
                                    {x.employees?.middleName}
                                    {x.employees?.lastName}
                                </TableCell>
                                <TableCell>
                                    {x.accountManager}
                                </TableCell>
                                <TableCell>
                                    {x.holidayCalendar?.calendarName}
                                </TableCell>
                                <TableCell>
                                    {x.headCount}
                                </TableCell>
                                <TableCell>
                                    {x.resignedCount}
                                </TableCell>
                            </Table.Row>
                        ))}
                </Table.Body>
            </Table>
        </div>
        <Pagination count ={totalPages} onChange={handleChangePage}></Pagination>
        <Tabs>
        <TabList>
          <Tab>Leads</Tab>
          <Tab>Opportunity</Tab>
          <Tab>Project CRTracker</Tab>
        </TabList>
        <TabPanel>
          <Leads  />
        </TabPanel>
        <TabPanel>
          < Opportunity/>
        </TabPanel>
        <TabPanel>
          < Project/>
        </TabPanel>
      </Tabs>
        </>
    )  
};
export default ClientsTable;