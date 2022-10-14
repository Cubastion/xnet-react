import { chainPropTypes } from "@mui/utils";
import React from "react";
import {  useEffect, useState } from "react";
import { Table,Container, Button } from 'semantic-ui-react'
// import HttpService from '../../HTTPS-Services/HttpService';


// const apicb =  new HttpService();


const OrganizationTable = ({children}) => {


    let [organization,setOrganization] = useState([]);

    <Container style ={{margin:20}}>
        {children}
    </Container>
    const styleLink = document.createElement("link");
    styleLink.rel = "stylesheet";
    styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
    document.head.appendChild(styleLink);
  
    useEffect(() => {
        var url = "https://devxnet.cubastion.net/api/v1/Organization/getAllOrganization";
        var myHeaders = new Headers();
        myHeaders.append("token","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJJZCI6IjRpbXE0d3JkZ3hrbnh2diIsImVtcGxveWVlIjoiMjIwNjAwMzUiLCJmaXJzdE5hbWUiOiJTaHJleWEiLCJtaWRkbGVOYW1lIjpudWxsLCJsYXN0TmFtZSI6Ik1haGVzaHdhcmkiLCJlbWFpbEFkZHJlc3MiOiJzaHJleWEubWFoZXNod2FyaUBDdWJhc3Rpb24uY29tIiwibW9iaWxlUGhvbmUiOiI2Mzc3ODc3MjQzIiwiYmlvbWV0cmljTWFuZGF0b3J5Ijp0cnVlfSwiaWF0IjoxNjY1NzI4MDE0LCJleHAiOjE2NjU3NDgwMTR9.EHss7d3fLQ8gURSdLMU5WawAU7i6fosEeGFWksppnLM")
        var requestOptions = {
            method : "GET",
            headers: myHeaders,
            redirect : 'follow'
        }
        
        const fetchData = async () => {
          try {
            const response = await fetch(url, requestOptions);
            const json = await response.json();
            setOrganization(json.data)
          } catch (error) {
            console.log("error", error);
          }
        };
    
        fetchData();
    }, []);
      
    console.log(organization)

    return(
        <>
        <div style={{float:'right'}}>

        <Button>Add</Button>
        <Button>Edit</Button>
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
                    {organization.length > 0 && organization.map(x => (
                        <Table.Row>
                            <Table.Cell>{x.name}</Table.Cell>
                            <Table.Cell>{x.address.addressLine1}{x.address.addressLine2}{x.address.city}{x.address.state}{x.address.country}-{x.address.pincode}</Table.Cell>
                            <Table.Cell>{x.totalEmpCount}</Table.Cell>
                            <Table.Cell>{x.totalResignedtotalEmpCount}</Table.Cell>
                    </Table.Row>

                    ))}
                      
                </Table.Body>
            </Table>
        </>
    );
};

export default OrganizationTable;

