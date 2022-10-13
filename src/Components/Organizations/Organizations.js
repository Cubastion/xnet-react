import React from 'react'
import { Table } from 'semantic-ui-react'
import SideNavbar from '../Side-NavBar/SideNavbar';

const Oragnizations = () => {
    return (
        <>
            <SideNavbar/>
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Status</Table.HeaderCell>
                        <Table.HeaderCell>Notes</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    <Table.Row>
                        <Table.Cell>Jamie</Table.Cell>
                        <Table.Cell>Approved</Table.Cell>
                        <Table.Cell>Requires call</Table.Cell>
                    </Table.Row>                  
                </Table.Body>
            </Table>
        </>
    );


  
}








 export default  Oragnizations;