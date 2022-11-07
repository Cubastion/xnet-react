import React from "react";
import { useState,useEffect } from "react";
import { tokenRequestOption} from "../../../Helpers/misellaneous";
import { Table,Button,Container } from "semantic-ui-react";
import { Tab,TabList } from "semantic-ui-react";
import { Drawer, Pagination, TableCell } from "@mui/material";


const Opportunity = (props) => {
    const[opportunity,setOpportunity] = useState([]);
    const[opportunityData, setOpportunityData] = useState([]);
    useEffect(() => {
        var url =`https://devxnet.cubastion.net/api/v1/opportunities/getOpportunitiesByClientId?clientId`;
        const fetchData = async() => {
            try{
                const response = await fetch(url,tokenRequestOption());
                const json = await response.json();
                setOpportunity(json.data);

            } catch(error) {
                console.log("error", error)
            }
        };
        fetchData();
    },[])

    let onSelectOpportunity=(x) => {
        setOpportunityData(x);
    }

    return(
        <>
        <div>
            <div style={{float:"right"}}>
                <Drawer 
                    anchor="right"
                    varient={"temporary"}>
                </Drawer>
                <Button>Add</Button>
                <Drawer 
                    anchor="right"
                    varient={"temporary"}>
                </Drawer>
                <Button>Edit</Button>
            </div>
            <h4>All Opportunity</h4>
            <Table striped>
                <Table.Header>
                    <Table.Row positive>
                        <Table.HeaderCell >NAME</Table.HeaderCell>
                        <Table.HeaderCell >TYPE</Table.HeaderCell>
                        <Table.HeaderCell >SUB TYPE	</Table.HeaderCell>
                        <Table.HeaderCell >OWNER</Table.HeaderCell>
                        <Table.HeaderCell >ESTIMATED VALUE</Table.HeaderCell>
                        <Table.HeaderCell >CLOSED VALUE</Table.HeaderCell>
                        <Table.HeaderCell >REASON LOST</Table.HeaderCell>
                        <Table.HeaderCell >STAGE</Table.HeaderCell>
                        <Table.HeaderCell >CERTAINITY</Table.HeaderCell>
                        <Table.HeaderCell >CURRENCY</Table.HeaderCell>
                        <Table.HeaderCell >CREATED BY	</Table.HeaderCell>
                        <Table.HeaderCell >AGE</Table.HeaderCell>
                        <Table.HeaderCell >EXP. CLOSURE</Table.HeaderCell>
                        <Table.HeaderCell >REMARKS</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {opportunity &&
                        opportunity.map((x) => (
                            <Table.Row>
                            
                                <TableCell>
                                    {x.name}
                                </TableCell>
                                 <TableCell>
                                    {x.type}
                                </TableCell>                                                          
                                <TableCell>
                                    {x.subType}
                                </TableCell>
                                <TableCell>
                                    {x.ownerOpportunities?.firstName}
                                    {x.ownerOpportunities?.middleName}
                                    {x.ownerOpportunities?.lastName}    
                                </TableCell>
                                <TableCell>
                                    {x.estimatedValue}
                                </TableCell>
                                <TableCell>
                                    {x.closedValue}
                                </TableCell>
                                
                                <TableCell>
                                    {x.reasonLost}
                                </TableCell>
                                <TableCell>
                                    {x.stage}
                                </TableCell>
                                <TableCell>
                                    {x.certainity}
                                </TableCell>
                                <TableCell>
                                    {x.currencyCode}
                                </TableCell>
                                <TableCell>
                                    {x.createdByOpportunities?.firstName}
                                    {x.createdByOpportunities?.middleName}
                                    {x.createdByOpportunities?.lastName}
                                </TableCell>
                                <TableCell>
                                    {x.age}
                                </TableCell>
                                <TableCell>
                                    {x.expectedClosureDate}
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

export default Opportunity;