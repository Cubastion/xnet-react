import React from "react";
import {  useEffect, useState } from "react";
import { Table, Button } from 'semantic-ui-react'
import { tokenRequestOption } from "../../Helpers/misellaneous";
import Departments from "../Departments";
const OrganizationTable = () => {


    let [organization,setOrganization] = useState([]);
    let [departments, setDepartments] = useState("")
    
    useEffect(() => {
        var url = "https://devxnet.cubastion.net/api/v1/Organization/getAllOrganization";
        const fetchData = async () => {
          try {
            const response = await fetch(url, tokenRequestOption());
            const json = await response.json();
            setOrganization(json.data)
          } catch (error) {
            console.log("error", error);
          }
        };
    
        fetchData();
    }, []);
    let onSelectOrganization = (id) => {
     
        setDepartments(id);
       
    }
   
  
    
    return(
        <>
        <div style={{float:'right'}}>

        <Button>Add</Button>
        <Button>Edit</Button>
        </div>
            <Table celled selectable>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Address</Table.HeaderCell>
                        <Table.HeaderCell>Head count</Table.HeaderCell>
                        <Table.HeaderCell>Resigned Count</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {organization?.length > 0 && organization?.map((x) => (
                        <Table.Row onClick={()=> onSelectOrganization(x.Id)} key={x.Id} color="darkgreen">
                            <Table.Cell>{x.name}</Table.Cell>
                            <Table.Cell>{x.address.addressLine1}{x.address.addressLine2}{x.address.city}{x.address.state}{x.address.country}-{x.address.pincode}</Table.Cell>
                            <Table.Cell>{x.totalEmpCount}</Table.Cell>
                            <Table.Cell>{x.totalResignedEmpCount}</Table.Cell>
                    </Table.Row>

                    ))}
                      
                </Table.Body>
            </Table>
            <Departments id={departments} />
        </>
    );
};

export default OrganizationTable;

