import React, { useState, useEffect } from 'react'
import { Table, Container, Button } from 'semantic-ui-react';
import isundefined from '../Helpers/isUndefined';
import { tokenRequestOption } from "../Helpers/misellaneous";
import { EmployeesByDeptDesignation } from './EmployeesByDeptDesignation';
 
const Departments = (props) => {

  const [department, setDepartment] = useState("");
  const [designation, setDesignation] = useState([]);
  const [deptId, setDeptId] = useState("")
  const [employeeDetails, setEmployeeDetails] = useState({ model: "", orgId: "", deptId: "", jobTitle: "" })
 
  useEffect(() => {
    var url = "https://devxnet.cubastion.net/api/v1/Organization/getAllDepartment?id=" + props.id;
    const fetchData = async () => {
      try {
        const response = await fetch(url, tokenRequestOption());
        const json = await response.json();
        if (json.data.length > 0) setDesignation(json.data[0].designationData)
        setDepartment(json.data)
      } catch (error) {
        console.log("error", error);
      }
    };
    setDesignation([])
    fetchData();
  }, [props.id]);

  useEffect(() => {
    
  }, [employeeDetails.jobTitle]);

  
  let onClickDepartmentHandler = (x) => {
    setDeptId(x.Id)
    setDesignation(x.designationData)
    if (x.designationData.length > 0) setEmployeeDetails({ model: "department", orgId: props.id, deptId: deptId, jobTitle: x.designationData[0].jobTitle })
  }

 
  return (

    <>
      <Table celled selectable>
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

            <Table.Row onClick={()=> onClickDepartmentHandler(x) } key={x.Id}>
              <Table.Cell>{x.name}</Table.Cell>
              <Table.Cell>{`${isundefined(x?.owner?.firstName)} ${isundefined(x?.owner?.lastName)}`}</Table.Cell>
              <Table.Cell>{x.totalEmpCount}</Table.Cell>
              <Table.Cell>{x.totalEmpResignationCount}</Table.Cell>
            </Table.Row>

          ))}
        </Table.Body>
      </Table>
    
      

      <p>Designation</p>



      <Table celled selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>DESIGNATION</Table.HeaderCell>
            <Table.HeaderCell>HEAD COUNT</Table.HeaderCell>
            <Table.HeaderCell>RESIGNED COUNT</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>

          {designation?.length > 0 && designation?.map((x, index) => (


            <Table.Row onClick={() => setEmployeeDetails({ model: "department", orgId: props.id, deptId: deptId, jobTitle: x.jobTitle })} key={index++}>
              <Table.Cell>{x.jobTitle}</Table.Cell>
              <Table.Cell>{x.headCount}</Table.Cell>
              <Table.Cell>{x.resigCount}</Table.Cell>
            </Table.Row>

          ))}
        </Table.Body>
      </Table>
        {employeeDetails.model !== "" && employeeDetails.orgId !== "" && employeeDetails.deptId !== "" && employeeDetails.jobTitle !== "" &&
          <EmployeesByDeptDesignation params={employeeDetails}></EmployeesByDeptDesignation>
        }
    
    </>

    
  )
}

export default Departments