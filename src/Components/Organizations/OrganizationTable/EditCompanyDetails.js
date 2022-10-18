import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { Button } from 'semantic-ui-react';
import { tokenPutRequestOption } from '../../Helpers/misellaneous';


const EditCompanyDetails = (props) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        const fetchData = async () => {
            try {
                let url = 'https://devxnet.cubastion.net/api/v1/Organization/updateOrganization'
                data.Id = props.companyDetailsData.Id
                const response = await fetch(url, tokenPutRequestOption(data));
                const json = await response.json();

                if (json.statusCode === '200') {
                    alert('Company Details Edited Successfully!')
                   props.fun(false)
                }
                else alert(json.statusMessage)
            } catch (error) {
                console.log("error", error);
            }
        };
        fetchData();
    }
    console.log(props.companyDetailsData.addressLine1)
    
    return (
        <Box p={2} width="500px" textAlign="left" role="presentation">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <div>
                        <label name='NAME'>NAME</label>
                        <input type="text"  {...register("name", { required: true, value: props.companyDetailsData.name })} htmlFor='NAME' />
                    </div>
                    <div>
                        <label name='ADDRESS LINE1'>ADDRESS LINE1</label>
                        <input type="text"  {...register("addressLine1",{required:true, value: props.companyDetailsData.addressLine1})} htmlFor='ADDRESS LINE1' />
                    </div>
                    <div>
                        <label name='ADDRESS LINE2'>ADDRESS LINE2</label>
                        <input type="text"  {...register("addressLine2",{required:true, value: props.companyDetailsData.addressLine2})} htmlFor='ADDRESS LINE2' />
                    </div>
                    <div>
                        <label name='CITY'>CITY</label>
                        <input type="tel"  {...register("city",{required:true, value: props.companyDetailsData.city})} htmlFor='CITY' />
                    </div>
                    <div>
                        <label name='STATE'>STATE</label>
                        <input type="tel"  {...register("state",{required:true, value: props.companyDetailsData.state})} htmlFor='STATE' />
                    </div>
                    <div>
                        <label name='COUNTRY'>COUNTRY</label>
                        <input type="tel"  {...register("country", {required : true , value: props.companyDetailsData.country})} htmlFor='COUNTRY' />
                    </div>
                    <div>
                        <label name='PINCODE'>PINCODE</label>
                        <input type="tel"  {...register("pincode", {required : true , value: props.companyDetailsData.pincode})} htmlFor='PINCODE' />
                    </div>
                    
                    <Button onClick={onSubmit}>Edit</Button>
                    <Button onClick={()=> props.fun(false)}>Cancel</Button>
                </div>
            </form>
            </Box>
    );
}

export default EditCompanyDetails