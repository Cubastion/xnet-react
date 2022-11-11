import React from "react";
import { useEffect, useState } from "react";
import { Table, Button, Container } from "semantic-ui-react";
import { tokenRequestOption } from "../../../Helpers/misellaneous";
import {Tab, Tabs,TabList,TabPanel} from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { Drawer, Pagination, TableCell } from "@mui/material";
import AddProjectTable from "./AddProjectTable";
import EditProjectTable from "./EditProjectTable";

const ProjectTable = (props) => {
    const[projectData, setProjectData] = useState([]);
    const[project,setProject] = useState([]);
    const[addProject,setAddProject] = useState(false)
    const[addForm,setAddForm]=useState(false);
    const[editProject,setEditProject] = useState(false);
    const[editForm,setEditForm] = useState(false);
    const[addRefresh, setAddRefresh]=useState(false);
    const[editRefresh, setEditRefresh]=useState(false);

    useEffect((data) => {
        var url =`https://devxnet.cubastion.net/api/v1/projects/getAllProjectsByClientId?clientId`
        const fetchData = async() => {
            try{
                const response = await fetch(url,tokenRequestOption(data));
                const json = await response.json();
                setProjectData(json.data);
                setAddProject(json.data[0]);
                setEditProject(json.data[0]);
            } catch(error) {
                console.log("error", error);
            }
        };
        fetchData();

    },[]);

    let onSelectProject=(x) => {
        setProjectData(x);

    };
console.log(projectData,"....")
    return(
        <>
        <div>
            <div style={{float:"right"}}>
                <Drawer 
                    anchor="right"
                    open={addForm}
                    onClose={() => setAddForm(false)}
                    varient={"temporary"}>
                    <AddProjectTable fun={setAddForm} ></AddProjectTable>
                </Drawer>
                <Button onClick={() => setAddForm(true)}>Add</Button>
                <Drawer 
                    anchor="right"
                    open={editForm}
                    onClose={() => setEditForm(false)}
                    varient={"temporary"}>
                    <EditProjectTable fun={setEditForm} ></EditProjectTable>
                </Drawer>
                <Button onClick={() => setEditForm(true)}>Edit</Button>
            </div>
            <h4>Projects</h4>
            <Table striped>
                <Table.Header>
                    <Table.Row positive>
                        <Table.HeaderCell >Name</Table.HeaderCell>
                        <Table.HeaderCell >Owner</Table.HeaderCell>
                    </Table.Row>
                 </Table.Header>
                <Table.Body>
                    {projectData &&
                        projectData.map((x) => (
                            <Table.Row onClick={() => onSelectProject(x)}>
                                <TableCell>
                                    {x.name}
                                </TableCell>
                                 <TableCell>
                                    {x.owner?.firstName}{x.owner?.lastName}
                                </TableCell>
                            </Table.Row>
                        ))}
                </Table.Body>
            </Table>
        </div>
        </>

    );



};
export default ProjectTable;