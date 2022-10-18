import React,{useEffect, useState} from 'react';
import { useForm } from "react-hook-form";
import { Box } from '@mui/material';
import { Button } from 'semantic-ui-react';
import { tokenPostRequestOption } from '../../Helpers/misellaneous';




const BankDetails = (props) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => {
      const fetchData = async () => {
          try {
              let url = 'https://devxnet.cubastion.net/api/v1/Organization/addOrganization'
              console.log(data, 'below api call')
              const response = await fetch(url, tokenPostRequestOption(data));
              const json = await response.json();
            //   console.log(json,"----------------->")
              if (json.statusCode === '200') {
                  alert('BankDetails Added Successfully!')
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
                        <input type="tel"  {...register("panNumber", { required: true })} htmlFor='PAN NUMBER' />
                    </div>
                    <div>
                        <label name='GST'>GST</label>
                        <input type="tel"  {...register("gst", { required: true })} htmlFor='GST' />
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
                        <label name='BANK NAME'>BANK NAME</label>
                        <input type="tel"  {...register("bankName", { required: true })} htmlFor='BANK NAME' />
                    </div>
                    <div>
                        <label name='BANK NAME'>BANK BRANCH</label>
                        <input type="tel"  {...register("bankBranch", { required: true })} htmlFor='BANK BRANCH' />
                    </div>
                    <div>
                        <label name='SWIFT CODE'>SWIFT CODE</label>
                        <input type="tel"  {...register("swiftCode", { required: true })} htmlFor='SWIFT CODE' />
                    </div>
                    
                    <div>
                        <label name='TYPE'>CURRENCY</label>
                        <select {...register("type", { required: true })} htmlFor='TYPE'>
                            <option value="">Select</option>
                            <option value="RECRUITMENT">INR</option>
                            <option value="SERVICES">USD</option>
                            <option value="STAFF">EUR</option>
                            <option value="OTHERS">JPY</option>
                        </select>
                    </div>
                    <Button onClick={onSubmit}>Add</Button>
                    <Button onClick={()=> props.fun(false)}>Cancel</Button>
                </div>
          </form>
          </Box>
  );
}

export default CompanyDetails
