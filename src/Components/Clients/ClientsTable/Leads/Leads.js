import React from "react";
import { useState,useEffect } from "react";
import { tokenRequestOption} from "../../../Helpers/misellaneous";
import { Table,Button,Container } from "semantic-ui-react";
import { Tab,TabList } from "semantic-ui-react";
import { Drawer, Pagination, TableCell } from "@mui/material";
import AddLeads from "./AddLeads";
import EditLeads from "./EditLeads";

const Leads = (props) => {
    const[leads,setLeads] = useState([]);
    const[leadsData, setLeadsData] = useState([]);
    const[addLead,setAddLead] = useState(false);
    const[addLeadForm,setAddLeadForm]=useState(false);
    const[addLeadRefresh, setAddLeadRefresh] = useState(false);
    useEffect(() => {
        var url =`https://devxnet.cubastion.net/api/v1/leads/getLeadsByClientId?clientId`;
        const fetchData = async() => {
            try{
                const response = await fetch(url,tokenRequestOption());
                const json = await response.json();
                setLeads(json.data);
                setAddLead(json.data[0])

            } catch(error) {
                console.log("error", error)
            }
        };
        fetchData();
    },[addLeadRefresh])

    let onSelectLead=(x) => {
        setLeadsData(x);
        setAddLead(x);
    }

    return(
        <>
        <div>
            <div style={{float:"right"}}>
                <Drawer 
                    anchor="right"
                    varient={"temporary"}
                    open={addLeadForm}
                    onClose={() => setAddLeadForm(false)}>
                    <AddLeads fun={setAddLeadForm} addRefresh={setAddLeadRefresh}></AddLeads>
                </Drawer>
                <Button onClick={() => setAddLeadForm(true)}>Add</Button>
                <Drawer 
                    anchor="right"
                    varient={"temporary"}>
                </Drawer>
                <Button>Edit</Button>
            </div>
            <h4>All Leads</h4>
            <Table striped>
                <Table.Header>
                    <Table.Row positive>
                        <Table.HeaderCell >NAME</Table.HeaderCell>
                        <Table.HeaderCell >LEAD DESCRIPTION</Table.HeaderCell>
                        <Table.HeaderCell >STAGE</Table.HeaderCell>
                        <Table.HeaderCell >REASON LOST</Table.HeaderCell>
                        <Table.HeaderCell >OPPORTUNITIY</Table.HeaderCell>
                        <Table.HeaderCell >AGE IN DAYS</Table.HeaderCell>
                        <Table.HeaderCell >SOURCE</Table.HeaderCell>
                        <Table.HeaderCell >REMARKS</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {leads &&
                        leads.map((x) => (
                            <Table.Row onClick={() => onSelectLead(x)} key={x.Id} style={leadsData.Id === x.Id?{backgroundColor:"lightGrey"}:{}}>
                            
                                <TableCell>
                                    {x.name}
                                </TableCell>
                                 <TableCell>
                                    {x.shortDescription}
                                </TableCell>                                                          
                                <TableCell>
                                    {x.stage}
                                </TableCell>
                                <TableCell>
                                    {x.reasonLost}
                                </TableCell>
                                <TableCell>
                                    {x.opportunities}
                                </TableCell>
                                <TableCell>
                                    {x.age}
                                </TableCell>
                                <TableCell>
                                    {x.source}
                                </TableCell>
                                <TableCell>
                                    {x.remarks}
                                </TableCell>
                            </Table.Row>
                        ))}
                </Table.Body>
            </Table>
        </div>
        </>
    )

};

export default Leads;