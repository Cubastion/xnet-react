import React from 'react'
import { Table,Container, Button } from 'semantic-ui-react';
const Designation = () => {
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