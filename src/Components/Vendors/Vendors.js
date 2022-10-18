import { Drawer } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Button, Table } from 'semantic-ui-react';
import { tokenRequestOption } from '../Helpers/misellaneous';
import AddVendors from './AddVendors';
import EditVendors from './EditVendors';

const Vendors = () => {
    const [vendorsData, setVendorsData] = useState([]);
    const [vendorFirstData, setVendorFirstData] = useState({});
    const [openAddForm, setOpenAddForm] = useState(false);
    const [openEditForm, setOpenEditForm] = useState(false);
    let [pageNumber, setPageNumber] = useState(1);
    let [pagination, setPaginationData] = useState({totalRecords: 0,totalPerpage: 0,totalPage: 0,currentPage: 0,nextPage: 0,previousPage: 0});
    
    const fetchData = async () => {
        try {
            var url = `https://devxnet.cubastion.net/api/v1/vendor/getAllVendors?page=${pageNumber}`;
            const response = await fetch(url, tokenRequestOption());
            const json = await response.json();
            setVendorFirstData(json.data[0])
            setVendorsData(json.data)
            setPaginationData(json.paginate)
        } catch (error) {
            console.log("error", error);
        }
    };
    useEffect(() => {
        fetchData()
    }, [pageNumber])

    console.log(pageNumber, 'pageNumber')

    return (
        <>

            <p>Vendors</p>
            <Drawer open={openAddForm} onClose={() => setOpenAddForm(false)} anchor='right'>
                <AddVendors fun={setOpenAddForm} />
            </Drawer>
            <Button onClick={() => setOpenAddForm(true)}>Add</Button>

            <Drawer open={openEditForm} onClose={() => setOpenEditForm(false)} anchor='right'>
                <EditVendors fun={setOpenEditForm} vendorData={vendorFirstData} />
            </Drawer>
            <Button onClick={() => setOpenEditForm(true)}>Edit</Button>

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

                        <Table.Row onClick={() => setVendorFirstData(x)} key={x.Id}>
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
            <div className='container d-flex justify-content-between'>
                <button disabled={pageNumber === 1 ? true : false} type="button" onClick={() => setPageNumber(--pageNumber)} className="btn btn-dark">&larr; Previous</button>
                <button disabled={pageNumber === pagination.totalPage} type="button" onClick={() => setPageNumber(++pageNumber)} className="btn btn-dark">Next &rarr;</button>
            </div>
        </>
    );



}

export default Vendors;