import React from "react";
import { useForm } from "react-hook-form";
import { Box } from "@mui/material";
import { Button } from "semantic-ui-react";
import { tokenPostRequestOption } from "../../../Helpers/misellaneous";
const AddClientDetails = (props) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();
     
      const onSubmit = (data) => {
        
        let value={...data,clientId:props.clientDetails.Id}
        
        // console.log(value,"---------------")
        const fetchData = async () => {
          try {
            let url =
              `https://devxnet.cubastion.net/api/v1/clientContact/addClientContact`;
            const response = await fetch(url, tokenPostRequestOption(value));
            const json = await response.json();
            console.log(data, "----------------->");
            if (json.statusCode === "200") {
              alert("Client Details Added Successfully!");
              props.fun(false);
              props.addRefresh(true);
            } else alert(json.statusMessage);
          } catch (error) {
            console.log("error", error);
          }
        };
        fetchData();
      };
      

      return (
        <Box p={2} width="500px" textAlign="left" role="presentation">
      <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <div style={{'margin':'1rem', 'display':'flex','flexDirection':'column'}}>
              <label name="TITLE">TITLE</label>
              <select 
              {...register("title",)}
                 htmlFor="TITLE">
                <option value="">Select</option>
                <option value="Mr.">Mr.</option>
                <option value="Mrs.">Mrs.</option>
                <option value="Ms.">Ms.</option>
              </select>
            </div>
            <div style={{'margin':'1rem', 'display':'flex','flexDirection':'column'}}>
              <label name="FIRST NAME">FIRST NAME</label>
              <input
                type="text"
                {...register("firstName", { })}
                htmlFor="FIRST NAME"
              />
            </div>
            <div style={{'margin':'1rem', 'display':'flex','flexDirection':'column'}}>
              <label name="MIDDLE NAME">MIDDLE NAME</label>
              <input
                type="text"
                {...register("middleName")}
                htmlFor="MIDDLE NAME"
              />
            </div>
            <div style={{'margin':'1rem', 'display':'flex','flexDirection':'column'}}>
              <label name="LAST NAME">LAST NAME</label>
              <input
                type="text"
                {...register("lastName")}
                htmlFor="LAST NAME"
              />
            </div>
            <div style={{'margin':'1rem', 'display':'flex','flexDirection':'column'}}>
              <label name="DESIGNATION">DESIGNATION</label>
              <input type="text" {...register("designation")} htmlFor="DESIGNATION" />
            </div>
            <div style={{'margin':'1rem', 'display':'flex','flexDirection':'column'}}>
              <label name="EMAIL">EMAIL</label>
              <input type="text" {...register("emailAddress")} htmlFor="EMAIL" />
            </div>
            <div style={{'margin':'1rem', 'display':'flex','flexDirection':'column'}}>
              <label name="PHONE (MOBILE)">PHONE (MOBILE)</label>
              <input
                type="number"
                {...register("mobilePhone")}
                htmlFor="PHONE (MOBILE)"
              />
            </div>
            

          
            <div style={{'margin':'1rem', 'display':'flex','flexDirection':'column'}}>
              <label name="PHONE (WORK)">PHONE (WORK)</label>
              <input
                type="number"
                {...register("workPhone")}
                htmlFor="PHONE (WORK)"
              />
            </div>
            <div style={{'margin':'1rem', 'display':'flex','flexDirection':'column'}}>
              <label name="CONTACT TYPE">CONTACT TYPE</label>
              <input
                type="text"
                {...register("contactType")}
                htmlFor="CONTACT TYPE"
              />
            </div>
          <Button onClick={onSubmit}>Add</Button>
        </div>
      </form>
      <Button onClick={() => props.fun(false)} style={{margin:5}}>Cancel</Button>
    </Box>
      );
};

export default AddClientDetails;