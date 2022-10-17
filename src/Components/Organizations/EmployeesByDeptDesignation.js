import React, { useEffect, useState } from 'react'
import { Table } from 'semantic-ui-react'
import { tokenRequestOption } from '../Helpers/misellaneous';

export const EmployeesByDeptDesignation = (props) => {
    const [employeeDetails, setEmployeeDetails] = useState([]);
    const fetchData = async () => {
        try {
            var url = `https://devxnet.cubastion.net/api/v1/employee/getEmployeesByDeptDesignation?mode=${props.params.model}&orgId=${props.params.orgId}&deptId=${props.params.deptId}&jobTitle=${props.params.jobTitle}`;
            const response = await fetch(url, tokenRequestOption());
            const json = await response.json();
            setEmployeeDetails(json.data)
            console.log('getEmployeesByDeptDesignation', json)
        } catch (error) {
            console.log("error", error);
        }
    };

    
    useEffect(() => {
    fetchData();
    }, [props.params.jobTitle]);
 


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
                  {employeeDetails.length > 0 && employeeDetails.map((x) => (

                      <Table.Row key={x.Id}>
                          <Table.Cell>{x.employee}</Table.Cell>
                          <Table.Cell>{x.firstName}</Table.Cell>
                          <Table.Cell>{x.lastName}</Table.Cell>
                          <Table.Cell>{x.emailAddress}</Table.Cell>
                          <Table.Cell>{x.joiningDate}</Table.Cell>
                          <Table.Cell>{x.resignationDate}</Table.Cell>
                      </Table.Row>


                  ))}

                
              </Table.Body>
          </Table>
    </div>
  )
}
