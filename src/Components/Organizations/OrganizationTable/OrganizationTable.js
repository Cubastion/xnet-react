import React from "react";
import {  useEffect, useState } from "react";
import { Table, Button,Container } from 'semantic-ui-react'
import { tokenRequestOption } from "../../Helpers/misellaneous";
import Departments from "../Departments";
import CompanyDetails from "./AddNewOrganization/CompanyDetails";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import { Drawer } from "@mui/material";
import { Designation } from "../Designation";

const OrganizationTable = () => {


    let [organization,setOrganization] = useState([]);
    let [departments, setDepartments] = useState();
   let [addForm,setAddForm] = useState(false)
    let [designationData, setDesignationData] = useState([]);
    const[companyDetails, setCompanyDetails] = useState([]);
    const[openAddForm, setOpenAddForm] = useState(false);
     
    useEffect(() => {
        var url = "https://devxnet.cubastion.net/api/v1/Organization/getAllOrganization";
        const fetchData = async () => {
          try {
            const response = await fetch(url, tokenRequestOption());
            const json = await response.json();
              setDepartments(json.data[0].Id)
             
            setOrganization(json.data)
            if (json.data[0].designationData.length > 0) setDesignationData(json.data[0].designationData)
          } catch (error) {
            console.log("error", error);
          }
        };
        
        fetchData();
    }, []);

  

    let onSelectOrganization = (x) => {
     
        setDepartments(x.Id);
        setDesignationData(x.designationData)
       
    }

    
   
  
    
    return(
        <>
        <div style={{float:'right'}}>

        <Button onClick={()=>setAddForm(true)}>Add</Button>
        <Button>Edit</Button>
        </div>
        <Drawer
        anchor="right"
        open={addForm}
        onClose={() => setAddForm(false)}
        variant={"temporary"}
      ><CompanyDetails></CompanyDetails></Drawer>
            <Table striped>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Address</Table.HeaderCell>
                        <Table.HeaderCell>Head count</Table.HeaderCell>
                        <Table.HeaderCell>Resigned Count</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {organization.length > 0 && organization.map(x => (
                        <Table.Row onClick={() => onSelectOrganization(x)} key={x.Id}>
                            <Table.Cell>{x.name}</Table.Cell>
                            <Table.Cell>{x.address.addressLine1}{x.address.addressLine2}{x.address.city}{x.address.state}{x.address.country}-{x.address.pincode}</Table.Cell>
                            <Table.Cell>{x.totalEmpCount}</Table.Cell>
                            <Table.Cell>{x.totalResignedEmpCount}</Table.Cell>
                    </Table.Row>
                    ))}
                      
                </Table.Body>
            </Table>
            <Tabs>
                <TabList>
                    <Tab>Departments</Tab>
                    <Tab>Designation</Tab>
                </TabList>
                <TabPanel>
                    <Departments id={departments} />
                </TabPanel>
                <TabPanel>
                    <Designation data={designationData} deptId={departments} />
                </TabPanel>
            </Tabs>
        </>
    );
};

export default OrganizationTable;

