import React,{useState,useEffect} from 'react'
import { Table,Container, Button } from 'semantic-ui-react';
import { tokenRequestOption } from "../Helpers/misellaneous";

const Designation = () => {
 
    const [designation, setDesignation] = useState("")
    

    useEffect(() => {
        var url = "https://devxnet.cubastion.net/api/v1/Organization/getAllDepartment?id=5dvsy4x9phcsiyu";
        const fetchData = async () => {
          try {
            const response = await fetch(url, tokenRequestOption());
            const json = await response.json();
            console.log(json.data)
            setDesignation(json.data)
          } catch (error) {
            console.log("error", error);
          }
        };
    
        fetchData();
    }, []);



    console.log(designation)
  


  return (
    <Table striped>
    <Table.Header>
        <Table.Row>
            <Table.HeaderCell>Designation</Table.HeaderCell>
            <Table.HeaderCell>Head Count</Table.HeaderCell>
            <Table.HeaderCell>Called</Table.HeaderCell>
        </Table.Row>
    </Table.Header>

    <Table.Body>
        <Table.Row>
            <Table.Cell>John Lilki</Table.Cell>
            <Table.Cell>September 14, 2013</Table.Cell>
            <Table.Cell>jhlilk22@yahoo.com</Table.Cell>
            <Table.Cell>No</Table.Cell>
        </Table.Row>
        <Table.Row>
            <Table.Cell>Jamie Harington</Table.Cell>
            <Table.Cell>January 11, 2014</Table.Cell>
            <Table.Cell>jamieharingonton@yahoo.com</Table.Cell>
            <Table.Cell>Yes</Table.Cell>
        </Table.Row>
        <Table.Row>
            <Table.Cell>John Lilki</Table.Cell>
            <Table.Cell>September 14, 2013</Table.Cell>
            <Table.Cell>jhlilk22@yahoo.com</Table.Cell>
            <Table.Cell>No</Table.Cell>
        </Table.Row>  
    </Table.Body>
</Table>
  )
}

export default Designation