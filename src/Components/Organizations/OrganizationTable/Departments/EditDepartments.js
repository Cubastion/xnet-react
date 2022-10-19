import React,{useEffect, useState} from 'react';
import { useForm } from "react-hook-form";
import { Box } from '@mui/material';
import { Button } from 'semantic-ui-react';
import { tokenPostRequestOption, tokenRequestOption } from "../../../Helpers/misellaneous";




const EditDepartments = (props) => {
    console.log(props,"---------------->>>")
  
  const { register, handleSubmit, formState: { errors } } = useForm();
  const[editDepartmentForm, setEditDepartmentForm] = useState(false)

  const[deptId, setDeptId]=useState("")
  useEffect(() => {
},[setDeptId])
  
  const onSubmit = (data) => {
      const fetchData = async () => {
          try {
              let url = `https://devxnet.cubastion.net/api/v1/Organization/updateDepartment?id=${props.employeeDetails.Id}`
              data.organizationId = props.orgId
              const response = await fetch(url, tokenPostRequestOption(data));
              const json = await response.json();
             
              if (json.statusCode === '200') {
                  alert('Department Edited Successfully!')
                  props.fun(false)
              }
              else alert(json.statusMessage)
          } catch (error) {
              console.log("error", error);
              
          }
      };
      fetchData();
  }
console.log(props.employeeDetails.Id)
 
  
  return (
      <Box p={2} width="500px" textAlign="left" role="presentation">
          <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                  <div>
                      <label name='DEPARTMENT NAME'>DEPARTMENT NAME</label>
                      <input type="text"  {...register("name", { required: true, value: props.employeeDetails.Id.name})} htmlFor='DEPARTMENT NAME' />
                  </div>

                  <div>
                      <label name='DEPARTMENT HEAD'>DEPARTMENT HEAD</label>
                        <select {...register("ownerId", { required: true,value:props.employeeDetails.Id.ownerId })} htmlFor='DEPARTMENT HEAD' >
                            {props.employeeDetails.map(x =>
                                <option key={x.Id} value={x.Id} >{x.firstName}</option>
                                )}
                        </select>
                  </div>

                  <Button onClick={onSubmit} >Submit</Button>
                  <Button onClick={()=> props.fun(false)}>Cancel</Button>
              </div>
          </form>
          </Box>
  );
}

export default EditDepartments
