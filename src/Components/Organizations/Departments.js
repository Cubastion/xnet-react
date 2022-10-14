import React,{useState,useEffect} from 'react'
import { Table,Container, Button } from 'semantic-ui-react';
import { tokenRequestOption } from "../Helpers/misellaneous";

const Departments = (props) => {
 
    const [department, setDepartment] = useState("")
   

    useEffect(() => {
        var url = "https://devxnet.cubastion.net/api/v1/Organization/getAllDepartment?id=" + props.id;
        const fetchData = async () => {
          try {
            const response = await fetch(url, tokenRequestOption());
            const json = await response.json();
            setDepartment(json.data)
          } catch (error) {
            console.log("error", error);
          }
        };
    
        fetchData();
    }, [props.id]);

 

 
  


  return (

    <Table striped>
    <Table.Header>
        <Table.Row>
            <Table.HeaderCell>NAME</Table.HeaderCell>
            <Table.HeaderCell>DEPARTMENT HEAD</Table.HeaderCell>
            <Table.HeaderCell>HEAD COUNT</Table.HeaderCell>
            <Table.HeaderCell>RESIGNED COUNT</Table.HeaderCell>
        </Table.Row>
    </Table.Header>
      <Table.Body>
        
        {department?.length > 0 && department?.map((x) => (


        <Table.Row key={x.Id}>
            <Table.Cell>{x.name}</Table.Cell>
            <Table.Cell>{`${x?.owner?.firstName} ${x?.owner?.lastName}`}</Table.Cell>
            <Table.Cell>{x.totalEmpCount }</Table.Cell>
            <Table.Cell>{x.totalEmpResignationCount}</Table.Cell>
        </Table.Row>
       
        ))}
    </Table.Body>
</Table>
  )
}

export default Departments