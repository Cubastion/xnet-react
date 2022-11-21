import React from "react";
import { useForm } from "react-hook-form";
import { Box } from "@mui/material";
import { Button } from "semantic-ui-react";
import { tokenPutRequestOption,tokenRequestOption } from "../../Helpers/misellaneous";
import { useEffect ,useState} from "react";

const EditEmployee = (props) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();
      const onSubmit = (data) => {
        const fetchData = async () => {
          try {
            let url =
              `https://devxnet.cubastion.net/api/v1/employeeStaffing/updateEmployeeStaffing?id=${props?.addEmployee?.Id}`;
            const response = await fetch(url, tokenPutRequestOption(data));
            const json = await response.json();
            console.log(json, "----------------->");
            if (json.statusCode === "200") {
              alert("Staffing Edited Successfully!");
              props.fun(false);
              props.Refresh(true);
            } else alert(json.statusMessage);
          } catch (error) {
            console.log("error", error);
          }
        };
        fetchData();
      };
      
      console.log(props.employeeStaffing,"-------")
      
      return (
        <Box p={2} width="500px" textAlign="left" role="presentation">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div>
            <div style={{'margin':'1rem', 'display':'flex','flexDirection':'column'}}>
              <label name="END DATE">END DATE</label>
              <input
                type="date"
                {...register("endDate", { required: true })}
                defaultValue={props?.employeeStaffing?.endDate}
                htmlFor="END DATE"
              />
            </div>
          </div>
          <Button onClick={onSubmit} style={{margin:"1rem", display:"flex"}}>Edit</Button>
        </div>
      </form>
      <Button onClick={() => props.fun(false)} style={{margin:"1rem", display:"flex"}}>Cancel</Button>
    </Box>
      );
};

export default EditEmployee;