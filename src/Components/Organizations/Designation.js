import React, { useEffect, useState } from 'react'
import { Table } from 'semantic-ui-react'
import { EmployeesByDeptDesignation } from './EmployeesByDeptDesignation'

export const Designation = (props) => {
  
  const [employeeDetails, setEmployeeDetails] = useState("")

  useEffect(() => {
    if (props && props.data && props.data.length === 0) setEmployeeDetails("") 
    else {
      setEmployeeDetails({ model: "designation", orgId: props.deptId, deptId: props.deptId, jobTitle: props.data[0].jobTitle })
    }
  }, [props.deptId])
  let onClickDesignationHandler = (x) => {
    setEmployeeDetails({ model: "designation", orgId: props.deptId, deptId: props.deptId, jobTitle: x.jobTitle })
  }
  
  return (
    <>
      <Table celled selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>DESIGNATION</Table.HeaderCell>
            <Table.HeaderCell>HEAD COUNT</Table.HeaderCell>
            <Table.HeaderCell>RESIGNED COUNT</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {props.data?.length > 0 && props.data?.map((x, index) => (

            <Table.Row onClick={() => onClickDesignationHandler(x)} key={index++} style={employeeDetails?.jobTitle === x.jobTitle?{backgroundColor:"lightGrey"}:{}}>
              <Table.Cell>{x.jobTitle}</Table.Cell>
              <Table.Cell>{x.headCount}</Table.Cell>
              <Table.Cell>{x.resigCount}</Table.Cell>
            </Table.Row>

          ))}
        </Table.Body>
      </Table>
      {employeeDetails && employeeDetails.model !== "" && employeeDetails.orgId !== "" && employeeDetails.deptId !== "" && employeeDetails.jobTitle !== "" &&
        <EmployeesByDeptDesignation params={employeeDetails}></EmployeesByDeptDesignation>
      }

    </>
    
  )
}
