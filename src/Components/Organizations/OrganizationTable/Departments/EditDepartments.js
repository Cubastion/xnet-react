import React,{useEffect, useState} from 'react';
import { useForm } from "react-hook-form";
import { Box } from '@mui/material';
import { Button } from 'semantic-ui-react';
import { tokenPutRequestOption, tokenRequestOption } from "../../../Helpers/misellaneous";




const EditDepartments = (props) => {
    // console.log(props)
    console.log(props.employeeDepartment,"---------------->>>")
  
  const { register, handleSubmit, formState: { errors } } = useForm();
const [department, setDepartment] = useState("");
const[dept,setDept] = useState("");


  const[deptId, setDeptId]=useState("")
  useEffect(() => {
},[setDeptId])
  
  const onSubmit = (data) => {
      const fetchData = async () => {
          try {   
            // var bodyParser = require('body-parser');
            // app.use(bodyParser.json()); 
              let url = `https://devxnet.cubastion.net/api/v1/Organization/updateDepartment?id=${props.employeeDepartment.Id}`
              data.organizationId = props.orgId
              const response = await fetch(url, tokenPutRequestOption(data));
              const json = await response.json();
             
              if (json.statusCode === '200') {
                  alert('Department Edited Successfully!')
                  props.fun(false)
                props.refresh(true)
                setDepartment(json.data)
              }
              else alert(json.statusMessage)
          } catch (error) {
              console.log("error", error);
              
          }
      };
      fetchData();
  }
console.log(props.department,"------------->>>>>>>>>>.")

 
  
  return (
     
      <Box p={2} width="500px" textAlign="left" role="presentation">
          <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                  <div style={{'margin':'1rem', 'display':'flex','flexDirection':'column'}}>
                      <label name='DEPARTMENT NAME'>DEPARTMENT NAME</label>
                      <input type="text"  {...register("name", { required: true, value: props?.employeeDepartment?.name})} htmlFor='DEPARTMENT NAME' />
                  </div>

                  <div style={{'margin':'1rem', 'display':'flex','flexDirection':'column'}}>
                      <label name='DEPARTMENT HEAD'>DEPARTMENT HEAD</label>
                        <select {...register("ownerId", { required: true,value: props?.employeeDepartment?.ownerId  })} htmlFor='DEPARTMENT HEAD' >
                            {props.employeeDetails.map(x =>
                                <option key={x.Id} value={x.Id} >{x.firstName} {x.lastName}</option>
                                )}
                        </select>
                  </div>

                  <Button onClick={onSubmit} >Submit</Button>
                  
              </div>
          </form>
          <Button onClick={()=> props.fun(false)} style={{margin:5}}>Cancel</Button>
          </Box>
  );
}

export default EditDepartments
