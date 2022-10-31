import React from "react";
import { useEffect, useState } from "react";
import { Table, Button, Container } from "semantic-ui-react";
import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { tokenRequestOption } from "../../Helpers/misellaneous";
import Departments from "../../Organizations/OrganizationTable/Departments/Departments";
import AddCompanyDetails from "./AddCompanyDetails";
import EditCompanyDetails from "./EditCompanyDetails"

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

import { Drawer } from "@mui/material";
import { Designation } from "../Designation";

const OrganizationTable = () => {
  let [organization, setOrganization] = useState([]);
  let [departments, setDepartments] = useState();
  let [addCompanyForm, setAddCompanyForm] = useState(false);
  let [editCompanyForm, setEditCompanyForm] = useState(false);
  
  let [designationData, setDesignationData] = useState([])
  const [companyDetails, setCompanyDetails] = useState([]);;
  const [organizationData, setOrganzationData] = useState();
  const[editOrganizationData, setEditOrganizationData] = useState({})
  const[addOrganizationData, setAddOrganizationData] = useState({})
  const [editOrganizationRefresh, setEditOrganizationRefresh] = useState(false);
  const [addOrganizationRefresh, setAddOrganizationRefresh] = useState(false);
  

  useEffect(() =>  {
    var url =
      "https://devxnet.cubastion.net/api/v1/Organization/getAllOrganization";
    const fetchData = async () => {
      try {
        const response = await fetch(url, tokenRequestOption());
        const json = await response.json();
        setDepartments(json.data[0].Id);
        setOrganzationData(json.data[0]);
        setOrganization(json.data);
        setEditOrganizationData(json.data[0]);
        setAddOrganizationData(json.data[0]);

        if (json.data[0].designationData.length > 0)
          setDesignationData(json.data[0].designationData);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, [editOrganizationRefresh,addOrganizationRefresh])

  let onSelectOrganization = (x) => {
    setDepartments(x.Id);
    setDesignationData(x.designationData);
    setOrganzationData(x);
    setEditOrganizationData(x);
    setAddOrganizationData(x);
  } 

  return (
    <>
      <div>
        <div style={{ float: "right" }}>
          <Drawer
            anchor="right"
            open={addCompanyForm}
            onClose={() => setAddCompanyForm(false)}
            variant={"temporary"}
          >
            <AddCompanyDetails fun={setAddCompanyForm} addRefresh={setAddOrganizationRefresh}></AddCompanyDetails>
            {/* <CompanyDetails></CompanyDetails> */}
          </Drawer>

          <Button onClick={() => setAddCompanyForm(true)}>Add</Button>
          <Drawer
            anchor="right"
            open={editCompanyForm}
            onClose={() => setEditCompanyForm(false)}
            variant={"temporary"}
          >
            <EditCompanyDetails
              fun={setEditCompanyForm}
              companyDetailsData={organizationData}
              refresh={setEditOrganizationRefresh}
            ></EditCompanyDetails>
            {/* <CompanyDetails></CompanyDetails> */}
          </Drawer>
          <Button onClick={() => setEditCompanyForm(true)}>Edit</Button>
        </div>
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
            {organization.length > 0 &&
              organization.map((x) => (
                <Table.Row onClick={() => onSelectOrganization(x)} key={x.Id}>
                  <Table.Cell>{x.name}</Table.Cell>
                  <Table.Cell>
                    {x.address.addressLine1}
                    {x.address.addressLine2}
                    {x.address.city}
                    {x.address.state}
                    {x.address.country}-{x.address.pincode}
                  </Table.Cell>
                  <Table.Cell>{x.totalEmpCount}</Table.Cell>
                  <Table.Cell>{x.totalResignedEmpCount}</Table.Cell>
                </Table.Row>
              ))}
          </Table.Body>
        </Table>
      </div>
       
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
