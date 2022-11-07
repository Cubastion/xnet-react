import React from "react";
import { useState,useEffect } from "react";
import { tokenRequestOption} from "../../../Helpers/misellaneous";
import { Table,Button,Container } from "semantic-ui-react";
import { Tab,TabList } from "semantic-ui-react";
import { Drawer, Pagination, TableCell } from "@mui/material";
import AddProject from "./AddProject";
import EditProject from "./EditProject";


const Project = (props) => {
    const[project,setProject] = useState([]);
    const[projectData, setProjectData] = useState([]);
    useEffect(() => {
        var url =`https://devxnet.cubastion.net/api/v1/projectCRTrackers/getProjectCRTrackersByClientId?clientId`;
        const fetchData = async() => {
            try{
                const response = await fetch(url,tokenRequestOption());
                const json = await response.json();
                setProject(json.data);

            } catch(error) {
                console.log("error", error)
            }
        };
        fetchData();
    },[])

    let onSelectOpportunity=(x) => {
        setProjectData(x);
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
            <h4>All Project</h4>
            <Table striped>
                <Table.Header>
                    <Table.Row positive>
                        <Table.HeaderCell >NAME</Table.HeaderCell>
                        <Table.HeaderCell >ENGAGEMENT MODEL</Table.HeaderCell>
                        <Table.HeaderCell >CREATED BY</Table.HeaderCell>
                        <Table.HeaderCell >AGE IN DAYS</Table.HeaderCell>
                        <Table.HeaderCell >CR AMOUNT</Table.HeaderCell>
                        <Table.HeaderCell >FTE COUNT</Table.HeaderCell>
                        <Table.HeaderCell >DESC TEXT</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {project &&
                        project.map((x) => (
                            <Table.Row>
                                <TableCell>
                                    {x.name}
                                </TableCell>
                                 <TableCell>
                                    {x.engagementModel}
                                </TableCell>                                                          
                                <TableCell>
                                    {x.createdByPcrTracker?.firstName}
                                    {x.createdByPcrTracker?.middleName}
                                    {x.createdByPcrTracker?.lastName}    
                                </TableCell>
                                <TableCell>
                                    {x.age}
                                </TableCell>
                                <TableCell>
                                    {x.crAmount}
                                </TableCell>
                                <TableCell>
                                    {x.fteCount}
                                </TableCell>
                                <TableCell>
                                    {x.descText}
                                </TableCell>
                            </Table.Row>
                        ))}
                </Table.Body>
            </Table>
        </div>
        </>
    )

};

export default Project;