import React, { useState, useEffect } from 'react'
import { Table, Container, Button } from 'semantic-ui-react';
import isundefined from '../../../Helpers/isUndefined';
import { tokenRequestOption } from "../../../Helpers/misellaneous";
import { EmployeesByDeptDesignation } from '../../EmployeesByDeptDesignation';
import { Drawer } from '@mui/material';
import AddDepartments from './AddDepartments';
import EditDepartments from "./EditDepartments"; 
 
const Departments = (props) => {

  const [department, setDepartment] = useState("");
  const [designation, setDesignation] = useState([]);
  const [deptId, setDeptId] = useState([])
  const [employeeDetails, setEmployeeDetails] = useState("")
  const[addDepartmentForm, setAddDepartmentForm] = useState(false)
  const[editDepartmentForm, setEditDepartmentForm] = useState(false)
  const[employeeDept,setEmployeeDept]=useState([]);
  const [activeEmployees, setActiveEmployees] = useState([]);

  

  useEffect(() => {
    var url = "https://devxnet.cubastion.net/api/v1/Organization/getAllDepartment?id=" + props.id;
    const fetchData = async () => {
      try {
        const response = await fetch(url, tokenRequestOption());
        const json = await response.json();
        if (json.data.length > 0) {
          setDesignation(json.data[0].designationData)
          setEmployeeDetails({ model: "", orgId: "", deptId: "", jobTitle: json.data[0].designationData[0].jobTitle })
        }
        setDepartment(json.data)
      } catch (error) {
        console.log("error", error);
      }
    };
    setDesignation([])
    setEmployeeDept([props.deptId])
    fetchData();
  }, [props.id]);
  useEffect(() => {
    
  }, [employeeDetails]);

  
  let onClickDepartmentHandler = (x) => {
    setDeptId(x.Id)
    setEmployeeDept(x.deptId)
    setDesignation(x.designationData)
    if (x.designationData.length > 0) setEmployeeDetails({ model: "department", orgId: props.id, deptId: deptId, jobTitle: x.designationData[0].jobTitle })
    
  }

  const fetchEmployeeData = async () => {
    try {
        let url = 'https://devxnet.cubastion.net/api/v1/employee/getEmployees'
        
        const response = await fetch(url, tokenRequestOption());
        const json = await response.json();
        console.log('json', json)
        setActiveEmployees(json.data)
       
    } catch (error) {
        console.log("error", error);
        
    }
};
useEffect(()=>{
  fetchEmployeeData();
}, [addDepartmentForm])

  return (

    <>
    <Drawer
        anchor="right"
        open={addDepartmentForm}
        onClose={() => setAddDepartmentForm(false)}
        variant={"temporary"}
      >
        <AddDepartments fun={setAddDepartmentForm} orgId={props.id} employeeDetails={activeEmployees}></AddDepartments>
        </Drawer>

        <Button onClick={()=>setAddDepartmentForm(true)}>Add</Button>
        <Drawer
        anchor="right"
        open={editDepartmentForm}
        onClose={() => setEditDepartmentForm(false)}
        variant={"temporary"}
      >
        <EditDepartments fun={setEditDepartmentForm} orgId={props.id} employeeDept={deptId} employeeDetails={activeEmployees}></EditDepartments>
        </Drawer>
        <Button onClick={()=>setEditDepartmentForm(true)}>Edit</Button>
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