import React,{useEffect, useState} from 'react';
import { useForm } from "react-hook-form";
import { Box } from '@mui/material';
import { Button } from 'semantic-ui-react';
import { tokenPostRequestOption } from '../../../Helpers/misellaneous';




const CompanyDetails = (props) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => {
      const fetchData = async () => {
          try {
              let url = 'https://devxnet.cubastion.net/api/v1/Organization/addOrganization'
              console.log(data, 'below api call')
              const response = await fetch(url, tokenPostRequestOption(data));
              const json = await response.json();
              console.log(json,"----------------->")
              if (json.statusCode === '200') {
                  alert('Details Added Successfully!')
                  props.fun(false)
              }
              else alert(json.statusMessage)
          } catch (error) {
              console.log("error", error);
              // debugger;
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
                      <input type="tel"  {...register("pincode", {required : true })} htmlFor='PINCODE' />
                  </div>
                  <div>
                      <label name='COUNTRY'>COUNTRY</label>
                      <input type="tel"  {...register("country")} htmlFor='COUNTRY' />
                  </div>
                  <Button onClick={onSubmit}>Add</Button>
                  <Button>Cancel</Button>
              </div>
          </form>
          </Box>
  );
}

export default CompanyDetails
