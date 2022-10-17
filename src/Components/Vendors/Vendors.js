import React, { useEffect, useState } from 'react';
import { Table } from 'semantic-ui-react';
import { tokenRequestOption } from '../Helpers/misellaneous';

const Vendors = () => {
    const [vendorsData, setVendorsData] = useState([]);
    const fetchData = async () => {
        try {
            var url = `https://devxnet.cubastion.net/api/v1/vendor/getAllVendors?page=1`;
            const response = await fetch(url, tokenRequestOption());
            const json = await response.json();
            setVendorsData(json.data)
        } catch (error) {
            console.log("error", error);
        }
    };
    useEffect(() => {
        fetchData()
    }, [])
     
    return (
        <>
            <Table celled selectable>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>NAME</Table.HeaderCell>
                        <Table.HeaderCell>TYPE</Table.HeaderCell>
                        <Table.HeaderCell>CITY</Table.HeaderCell>
                        <Table.HeaderCell>STATE</Table.HeaderCell>
                        <Table.HeaderCell>POSTAL CODE</Table.HeaderCell>
                        <Table.HeaderCell>EMAIL ID</Table.HeaderCell>
                        <Table.HeaderCell>BANK ACCOUNT #</Table.HeaderCell>
                        <Table.HeaderCell>BANK IFSC CODE</Table.HeaderCell>
                        <Table.HeaderCell>PAN #</Table.HeaderCell>
                        <Table.HeaderCell>GST</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {vendorsData && vendorsData.length > 0 && vendorsData.map((x) => (

                        <Table.Row key={x.Id}>
                            <Table.Cell>{x.name}</Table.Cell>
                            <Table.Cell>{x.type}</Table.Cell>
                            <Table.Cell>{x.address.city}</Table.Cell>
                            <Table.Cell>{x.address.state}</Table.Cell>
                            <Table.Cell>{x.address.pincode}</Table.Cell>
                            <Table.Cell>{x.emailAddress}</Table.Cell>
                            <Table.Cell>{x.bankAccountNumber}</Table.Cell>
                            <Table.Cell>{x.bankIFSCCode}</Table.Cell>
                            <Table.Cell>{x.panNumber}</Table.Cell>
                            <Table.Cell>{x.gst}</Table.Cell>
                        </Table.Row>


                    ))}


                </Table.Body>
            </Table>
        </>
    );



}

export default Vendors;