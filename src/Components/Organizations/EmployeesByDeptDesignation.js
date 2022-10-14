import React, { useEffect, useState } from 'react'
import { Table } from 'semantic-ui-react'
import { tokenRequestOption } from '../Helpers/misellaneous';

export const EmployeesByDeptDesignation = (props) => {
    
    let [callingState, setCallingState] = useState(false)

    if (props.params.model !== "" && props.params.orgId !== "" && props.params.deptId !== "" && props.params.jobTitle !== "") setCallingState(true)

    useEffect(() => {
        var url = `https://devxnet.cubastion.net/api/v1/employee/getEmployeesByDeptDesignation?mode=${props.params.model}&orgId=${props.params.orgId}&deptId=${props.params.deptId}&jobTitle=${props.params.jobTitle}`;
        const fetchData = async () => {
            try {
                const response = await fetch(url, tokenRequestOption());
                const json = await response.json();
                console.log(json)
            } catch (error) {
                console.log("error", error);
            }
        };
        
        fetchData();
        
    }, [callingState]);




  return (
      <div>
          <p>Employees</p>
          <Table striped>
              <Table.Header>
                  <Table.Row>
                      <Table.HeaderCell>EMPLOYEE #</Table.HeaderCell>
                      <Table.HeaderCell>FIRST NAME</Table.HeaderCell>
                      <Table.HeaderCell>LAST NAME</Table.HeaderCell>
                      <Table.HeaderCell>EMAIL ADDRESS</Table.HeaderCell>
                      <Table.HeaderCell>JOINING DATE</Table.HeaderCell>
                      <Table.HeaderCell>RESIGNATION DATE</Table.HeaderCell>
                  </Table.Row>
              </Table.Header>
              <Table.Body>


                      <Table.Row >
                          <Table.Cell>hhhhhhh</Table.Cell>
                          <Table.Cell>hhhhhhh</Table.Cell>
                          <Table.Cell>hhhhhhh</Table.Cell>
                          <Table.Cell>hhhhhhh</Table.Cell>
                          <Table.Cell>hhhhhhh</Table.Cell>
                          <Table.Cell>hhhhhhh</Table.Cell>
                      </Table.Row>

                
              </Table.Body>
          </Table>
    </div>
  )
}
