import React from "react";
import { useEffect, useState } from "react";
import { Table, Button } from "semantic-ui-react";
import { tokenRequestOption } from "../Helpers/misellaneous";
import "react-tabs/style/react-tabs.css";
import { Drawer, TableCell,Pagination } from "@mui/material";
import { set } from "react-hook-form";

const EmployeeTable=() =>{
    const[employee, setEmployee] = useState([]);
    const[employeeStaffing, setEmployeeStaffing] = useState([]);
    const[addEmployee, setAddEmployee] = useState(false);
    const[addEmployeeForm,setAddEmployeeForm] = useState(false);
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
            } catch(error) {
                console.log("error", error);
            }
            console.log(employeeStaffing,"---")
        };
        fetchData();
    },[pageNumber]);

    const handleChangePage=(newPage) => {
        setPageNumber(newPage);
    };

    let onSelectEmployee=(x) => {
        setEmployee(x);
    };

    return(
        <>
        <div>
            
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

