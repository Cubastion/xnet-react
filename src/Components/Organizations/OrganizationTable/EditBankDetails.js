import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { Button } from 'semantic-ui-react';
import { tokenPutRequestOption } from '../../Helpers/misellaneous';


const EditBankDetails = (props) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        const fetchData = async () => {
            try {
                let url = 'https://devxnet.cubastion.net/api/v1/Organization/updateOrganization'
                data.Id = props.bankDetailsData.Id
                const response = await fetch(url, tokenPutRequestOption(data));
                const json = await response.json();

                if (json.statusCode === '200') {
                    alert('Bank Details Edited Successfully!')
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
                          <label name='PAN NUMBER'>PAN NUMBER</label>
                          <input type="tel"  {...register("panNumber", { required: true, value: props.bankDetailsData.panNumber })} htmlFor='PAN NUMBER' />
                      </div>
                      <div>
                          <label name='GST'>GST</label>
                          <input type="tel"  {...register("gst", { required: true, value: props.bankDetailsData.gst })} htmlFor='GST' />
                      </div>
                      <div>
                          <label name='BANK ACCOUNT NUMBER'>BANK ACCOUNT NUMBER</label>
                          <input type="tel"  {...register("bankAccountNumber", { required: true, value: props.bankDetailsData.bankAccountNumber })} htmlFor='BANK ACCOUNT NUMBER' />
                      </div>
                      
                      <div>
                          <label name='BANK IFSC CODE'>BANK IFSC CODE</label>
                          <input type="tel"  {...register("bankIFSCCode", { required: true, value: props.bankDetailsData.bankIFSCCode })} htmlFor='BANK IFSC CODE' />
                      </div>
                      <div>
                          <label name='BANK NAME'>BANK NAME</label>
                          <input type="tel"  {...register("bankName", { required: true, value: props.bankDetailsData.bankName })} htmlFor='BANK NAME' />
                      </div>
                      <div>
                          <label name='BANK NAME'>BANK BRANCH</label>
                          <input type="tel"  {...register("bankBranch", { required: true, value: props.bankDetailsData.bankAccountNumber })} htmlFor='BANK BRANCH' />
                      </div>
                      <div>
                          <label name='SWIFT CODE'>SWIFT CODE</label>
                          <input type="tel"  {...register("swiftCode", { required: true, value: props.bankDetailsData.swiftCode })} htmlFor='SWIFT CODE' />
                      </div>
                      
                      <div>
                          <label name='TYPE'>CURRENCY</label>
                          <select {...register("type", { required: true, value: props.bankDetailsData.type })} htmlFor='TYPE'>
                              <option value="">Select</option>
                              <option value="INR">INR</option>
                              <option value="USD">USD</option>
                              <option value="EUR">EUR</option>
                              <option value="JPY">JPY</option>
                          </select>
                      </div>
                      <Button onClick={onSubmit}>Add</Button>
                      <Button onClick={()=> props.fun(false)}>Cancel</Button>
                  </div>
            </form>
            </Box>
    );
}

export default EditBankDetails