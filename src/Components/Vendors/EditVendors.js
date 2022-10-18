import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { Button } from 'semantic-ui-react';
import { tokenPutRequestOption } from '../Helpers/misellaneous';


const EditVendors = (props) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    console.log(props.vendorData, 'below edit vendor')
    const onSubmit = data => {
        const fetchData = async () => {
            try {
                let url = 'https://devxnet.cubastion.net/api/v1/vendor/updateVendor'
                data.Id = props.vendorData.Id
                const response = await fetch(url, tokenPutRequestOption(data));
                const json = await response.json();

                if (json.statusCode === '200') {
                    alert('Vendors Edited Successfully...!!!')
                   props.fun(false)
                }
                else alert(json.statusMessage)
            } catch (error) {
                console.log("error", error);
            }
        };
        fetchData();
    }
    return (

        <Box p={2} width="500px" textAlign="left" role="presentation">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <div>
                        <label name='NAME'>NAME</label>
                        <input type="text"  {...register("name", { required: true, value: props.vendorData.name })} htmlFor='NAME' />
                    </div>
                    <div>
                        <label name='ADDRESS LINE1'>ADDRESS LINE1</label>
                        <input type="text"  {...register("addressLine1", { value: props.vendorData.address.addressLine1 })} htmlFor='ADDRESS LINE1' />
                    </div>
                    <div>
                        <label name='ADDRESS LINE2'>ADDRESS LINE2</label>
                        <input type="text"  {...register("addressLine2", { value: props.vendorData.address.addressLine2 })} htmlFor='ADDRESS LINE2' />
                    </div>
                    <div>
                        <label name='CITY'>CITY</label>
                        <input type="tel"  {...register("city", { value: props.vendorData.address.city })} htmlFor='CITY' />
                    </div>
                    <div>
                        <label name='STATE'>STATE</label>
                        <input type="tel"  {...register("state", { value: props.vendorData.address.state })} htmlFor='STATE' />
                    </div>
                    <div>
                        <label name='PINCODE'>PINCODE</label>
                        <input type="tel"  {...register("pincode", { value: props.vendorData.address.state } )} htmlFor='PINCODE' />
                    </div>
                    <div>
                        <label name='COUNTRY'>COUNTRY</label>
                        <input type="tel"  {...register("country", { value: props.vendorData.address.country })} htmlFor='COUNTRY' />
                    </div>
                    <div>
                        <label name='EMAIL'>EMAIL</label>
                        <input type="tel"  {...register("emailAddress", { required: true, value: props.vendorData.emailAddress })} htmlFor='EMAIL' />
                    </div>
                    <div>
                        <label name='BANK ACCOUNT NUMBER'>BANK ACCOUNT NUMBER</label>
                        <input type="tel"  {...register("bankAccountNumber", { required: true, value: props.vendorData.bankAccountNumber })} htmlFor='BANK ACCOUNT NUMBER' />
                    </div>
                    <div>
                        <label name='BANK IFSC CODE'>BANK IFSC CODE</label>
                        <input type="tel"  {...register("bankIFSCCode", { required: true, value: props.vendorData.bankIFSCCode })} htmlFor='BANK IFSC CODE' />
                    </div>
                    <div>
                        <label name='PAN NUMBER'>PAN NUMBER</label>
                        <input type="tel"  {...register("panNumber", { required: true, value: props.vendorData.panNumber })} htmlFor='PAN NUMBER' />
                    </div>
                    <div>
                        <label name='GST'>GST</label>
                        <input type="tel"  {...register("gst", { required: true, value: props.vendorData.gst })} htmlFor='GST' />
                    </div>
                    <div>
                        <label name='TYPE'>TYPE</label>
                        <select {...register("type", { required: true, value: props.vendorData.type })} htmlFor='TYPE'>
                            <option value="">Select</option>
                            <option value="RECRUITMENT">RECRUITMENT</option>
                            <option value="SERVICES">SERVICES</option>
                            <option value="STAFF">STAFF</option>
                            <option value="OTHERS">OTHERS</option>
                        </select>
                    </div>
                    <Button type='submit' onClick={()=>onSubmit()}>Edit</Button>
                    <Button type='button' onClick={()=>props.fun(false)}>Cancel</Button>
                </div>
            </form>
        </Box>
    );
}

export default EditVendors