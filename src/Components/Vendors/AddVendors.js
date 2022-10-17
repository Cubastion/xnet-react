import { Box } from '@mui/material';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';

const AddVendors = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [addVendorsData, setAddVendorsData] = useState({})
    const onSubmit = data => {
        
        setAddVendorsData(data)
    }
    
    return (
        <Box p={2} width="500px" textAlign="left" role="presentation">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <div>
                        <label name='NAME'>NAME</label>
                        <input type="text"  {...register("name", { required: true })} htmlFor='NAME' />
                    </div>
                    <div>
                        <label name='ADDRESS LINE1'>ADDRESS LINE1</label>
                        <input type="text"  {...register("addressLine1")} htmlFor='ADDRESS LINE1' />
                    </div>
                    <div>
                        <label name='ADDRESS LINE2'>ADDRESS LINE2</label>
                        <input type="text"  {...register("addressLine2")} htmlFor='ADDRESS LINE2' />
                    </div>
                    <div>
                        <label name='CITY'>CITY</label>
                        <input type="tel"  {...register("city")} htmlFor='CITY' />
                    </div>
                    <div>
                        <label name='STATE'>STATE</label>
                        <input type="tel"  {...register("state")} htmlFor='STATE' />
                    </div>
                    <div>
                        <label name='PINCODE'>PINCODE</label>
                        <input type="tel"  {...register("pincode")} htmlFor='PINCODE' />
                    </div>
                    <div>
                        <label name='COUNTRY'>COUNTRY</label>
                        <input type="tel"  {...register("country")} htmlFor='COUNTRY' />
                    </div>
                    <div>
                        <label name='EMAIL'>EMAIL</label>
                        <input type="tel"  {...register("emailAddress", { required: true })} htmlFor='EMAIL' />
                    </div>
                    <div>
                        <label name='BANK ACCOUNT NUMBER'>BANK ACCOUNT NUMBER</label>
                        <input type="tel"  {...register("bankAccountNumber", { required: true })} htmlFor='BANK ACCOUNT NUMBER' />
                    </div>
                    <div>
                        <label name='BANK IFSC CODE'>BANK IFSC CODE</label>
                        <input type="tel"  {...register("bankIFSCCode", { required: true })} htmlFor='BANK IFSC CODE' />
                    </div>
                    <div>
                        <label name='PAN NUMBER'>PAN NUMBER</label>
                        <input type="tel"  {...register("panNumber", { required: true })} htmlFor='PAN NUMBER' />
                    </div>
                    <div>
                        <label name='GST'>GST</label>
                        <input type="tel"  {...register("gst", { required: true })} htmlFor='GST' />
                    </div>
                    <div>
                        <label name='TYPE'>TYPE</label>
                        <select {...register("type", { required: true })} htmlFor='TYPE'>
                            <option value="">Select</option>
                            <option value="RECRUITMENT">RECRUITMENT</option>
                            <option value="SERVICES">SERVICES</option>
                            <option value="STAFF">STAFF</option>
                            <option value="OTHERS">OTHERS</option>
                        </select>
                    </div>
                    <div>
                        <input type="submit" />
                    </div>
                </div>
            </form>
            </Box>
    );
}

export default AddVendors
