import React from "react";
import { useEffect, useState } from "react";
import { Table, Button } from "semantic-ui-react";
import { tokenRequestOption } from "../Helpers/misellaneous";
import "react-tabs/style/react-tabs.css";
import { Drawer, TableCell,Pagination } from "@mui/material";
import { set } from "react-hook-form";
import AddEmployee from "./StaffingForm/AddEmployee";
import EditEmployee from "./StaffingForm/EditEmployee";

const EmployeeTable=() =>{
    const[employee, setEmployee] = useState([]);
    const[employeeStaffing, setEmployeeStaffing] = useState([]);
    const[addEmployee, setAddEmployee] = useState(false);
    const[addEmployeeForm,setAddEmployeeForm] = useState(false);
    const[addRefresh,setAdRefresh] = useState(false);
    const[editEmployee, setEditEmployee] = useState(false);
    const[editEmployeeForm, setEditEmployeeForm] = useState(false);
    const[pageNumber,setPageNumber] = useState(1);
    const[totalPages,setTotalPages] = useState(0);




    useEffect(() => {
        var url = `https://devxnet.cubastion.net/api/v1/employeeStaffing/getAllEmployeeStaffing`
        const fetchData = async() => {
            try{
                const response = await fetch(url,tokenRequestOption());
                const json = await response.json();
                setEmployeeStaffing(json.data);
                setTotalPages(json.paginate.totalPage);
                setAddEmployee(json.data[0]);
            } catch(error) {
                console.log("error", error);
            }
            console.log(employeeStaffing,"---")
        };
        fetchData();
    },[pageNumber]);

    const handleChangePage=(event,newPage) => {
        setPageNumber(newPage);
    };

    let onSelectEmployee=(x) => {
        setEmployee(x);
        setAddEmployee(x);
    };

    return(
        <>
        <div>
            <div style={{float:"right"}}>
                <Drawer anchor="right"
                open={addEmployeeForm}
                onClose={() =>setAddEmployeeForm(false)}
                varient={"temporary"}>
                <AddEmployee fun={setAddEmployeeForm}></AddEmployee>

                </Drawer>
                <Button onClick={() => setAddEmployeeForm(true)}>Add</Button>
                <Drawer anchor="right"
                open={editEmployeeForm}
                onClose={() => setEditEmployeeForm(false)}
                varient={"temporary"}>
                <EditEmployee fun={setEditEmployeeForm} />

                </Drawer>
                <Button >
                    Edit
                </Button>
            </div>
            
            <h4>Employees</h4>
            <Table striped>
                <Table.Header>
                    <Table.Row positive>
                        <Table.HeaderCell >EMPLOYEE</Table.HeaderCell>
                        <Table.HeaderCell >NAME</Table.HeaderCell>
                        <Table.HeaderCell >CLIENT NAME</Table.HeaderCell>
                        <Table.HeaderCell >PROJECT NAME</Table.HeaderCell>
                        <Table.HeaderCell >ROLE</Table.HeaderCell>
                        <Table.HeaderCell >START DATE</Table.HeaderCell>
                        <Table.HeaderCell >END DATE</Table.HeaderCell>
                        <Table.HeaderCell >STAFFING(%)</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {employeeStaffing &&
                        employeeStaffing.map((x) => (
                            <Table.Row onClick={() => onSelectEmployee(x)} key={x.Id}  >
                            
                                <TableCell >
                                    {x.employee.employee}
                                </TableCell>
                                 <TableCell>
                                    {x.employee.firstName}{x.employee.lastName}
                                </TableCell>                                
                               <TableCell>
                                {x.client.name}
                                </TableCell>                           
                                <TableCell>
                                    {x.project.name}
                                </TableCell>
                                <TableCell>
                                    {x.role}
                                </TableCell>
                                <TableCell>
                                    {x.startDate}
                                </TableCell>
                                <TableCell>
                                    {x.endDate}
                                </TableCell>
                                <TableCell>
                                    {x.staffing}
                                </TableCell>
                            </Table.Row>
                        ))}
                </Table.Body>
            </Table>
        </div>
        <Pagination count ={totalPages} onChange={handleChangePage}></Pagination>
        
        </>
    )  






};



export default EmployeeTable;

