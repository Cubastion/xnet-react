import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { tokenPutRequestOption } from "../../../Helpers/misellaneous";
import { Box } from "@mui/system";
import { Button } from "semantic-ui-react";


const EditClientDetails=(props) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();

    const onSubmit=(data) =>{
        const fetchData= async() => {
            try{
                let url=`https://devxnet.cubastion.net/api/v1/clientContact/updateClient?id`;
                const response = await fetch(url, tokenPutRequestOption(data));
                const json = await response.json();
                if(json.statusCode === "200") {
                    alert("Clients Details Edited Successfully !");
                    props.fun(false);
                }else alert(json.statusMessage);
            } catch(error) {
                console.log("error",error);
            }
        };
        fetchData();
    };
    // console.log(clientDetails,"------------")

    return(
        <>
            <Box p={2} width="500px" textAlign="left" role="presentation">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div>
          <div style={{'margin':'1rem', 'display':'flex','flexDirection':'column'}}>
              <label name="TYPE">TITLE</label>
              <select 
              {...register("type", { 
                required: true
                })}
                 htmlFor="TYPE">
                <option value="">Select</option>
                <option value="RECRUITMENT">Mr.</option>
                <option value="SERVICES">Mrs.</option>
                <option value="STAFF">Ms.</option>
              </select>
            </div>
            <div style={{'margin':'1rem', 'display':'flex','flexDirection':'column'}}>
              <label name="FIRST NAME">FIRST NAME</label>
              <input
                type="text"
                {...register("firstName", { 
                    required: true,
                    })}
                htmlFor="FIRST NAME"
              />
            </div>
            <div style={{'margin':'1rem', 'display':'flex','flexDirection':'column'}}>
              <label name="MIDDLE NAME">MIDDLE NAME</label>
              <input
                type="text"
                {...register("middleName", {
                    })}
                htmlFor="MIDDLE NAME"
              />
            </div>
            <div style={{'margin':'1rem', 'display':'flex','flexDirection':'column'}}>
              <label name="LAST NAME">LAST NAME</label>
              <input
                type="text"
                {...register("lastName", {})}
                htmlFor="LAST NAME"
              />
            </div>
            <div style={{'margin':'1rem', 'display':'flex','flexDirection':'column'}}>
              <label name="DESIGNATION">DESIGNATION</label>
              <input type="text" {...register("designation",{})} htmlFor="DESIGNATION" />
            </div>
            <div style={{'margin':'1rem', 'display':'flex','flexDirection':'column'}}>
              <label name="EMAIL">EMAIL</label>
              <input type="email" {...register("emailAddress",{})} htmlFor="EMAIL" />
            </div>
            <div style={{'margin':'1rem', 'display':'flex','flexDirection':'column'}}>
              <label name="PHONE (MOBILE)">PHONE (MOBILE)</label>
              <input
                type="number"
                {...register("mobilePhone",{})}
                htmlFor="PHONE (MOBILE)"
              />
            </div>
            <div style={{'margin':'1rem', 'display':'flex','flexDirection':'column'}}>
              <label name="PHONE (WORK)">PHONE (WORK)</label>
              <input type="tel" {...register("workPhone",{})} htmlFor="PHONE (WORK)" />
            </div>
          </div>

          <div >
            <div style={{'margin':'1rem', 'display':'flex','flexDirection':'column'}}>
              <label name="CONTACT TYPE">CONTACT TYPE</label>
              <input
                type="tel"
                {...register("contactType",{})}
                htmlFor="CONTACT TYPE"
              />
            </div>
            
          </div>
          <Button onClick={onSubmit}>Edit</Button>
        </div>
      </form>
      <Button onClick={() => props.fun(false)} style={{margin:5}}>Cancel</Button>
    </Box>
        </>
    );

    

};
export default EditClientDetails;
