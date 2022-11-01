import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "semantic-ui-react";
import { tokenPutRequestOption } from "../../Helpers/misellaneous";

const EditCompanyDetails = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let [organization, setOrganization] = useState([]);
  let [organizationData, setOrganizationData] = useState([]);

  const onSubmit = (data) => {
    console.log(organizationData,"------------------>>>>")
    const fetchData = async () => {
      try {
        let url =
          "https://devxnet.cubastion.net/api/v1/Organization/updateOrganization?id=" + props.companyDetailsData.Id;
        const response = await fetch(url, tokenPutRequestOption(data));
        const json = await response.json();

        if (json.statusCode === "200") {
          alert("Company Details Edited Successfully!");
          props.fun(false);
          props.refresh(true);
          
         
          
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
            <label name="NAME">NAME</label>
            <input
              type="text"
              {...register("name", {
                required: true,
                value: props.companyDetailsData.name,
              })}
              htmlFor="NAME"
            />
          </div>
          <div style={{'margin':'1rem', 'display':'flex','flexDirection':'column'}}>
            <label name="ADDRESS LINE1">ADDRESS LINE1</label>
            <input
              type="text"
              {...register("addressLine1", {
                required: true,
                value: props.companyDetailsData.address.addressLine1,
              })}
              htmlFor="ADDRESS LINE1"
            />
          </div>
          <div style={{'margin':'1rem', 'display':'flex','flexDirection':'column'}}>
            <label name="ADDRESS LINE2">ADDRESS LINE2</label>
            <input
              type="text"
              {...register("addressLine2", {
                required: true,
                value: props.companyDetailsData.address.addressLine2,
              })}
              htmlFor="ADDRESS LINE2"
            />
          </div>
          <div style={{'margin':'1rem', 'display':'flex','flexDirection':'column'}}>
            <label name="CITY">CITY</label>
            <input
              type="text"
              {...register("city", {
                required: true,
                value: props.companyDetailsData.address.city,
              })}
              htmlFor="CITY"
            />
          </div>
          <div style={{'margin':'1rem', 'display':'flex','flexDirection':'column'}}>
            <label name="STATE">STATE</label>
            <input
              type="text"
              {...register("state", {
                required: true,
                value: props.companyDetailsData.address.state,
              })}
              htmlFor="STATE"
            />
          </div>
          <div style={{'margin':'1rem', 'display':'flex','flexDirection':'column'}}>
            <label name="COUNTRY">COUNTRY</label>
            <input
              type="text"
              {...register("country", {
                required: true,
                value: props.companyDetailsData.address.country,
              })}
              htmlFor="COUNTRY"
            />
          </div>
          <div style={{'margin':'1rem', 'display':'flex','flexDirection':'column'}}>
            <label name="PINCODE">PINCODE</label>
            <input
              type="tel"
              {...register("pincode", {
                required: true,
                value: props.companyDetailsData.address.pincode,
              })}
              htmlFor="PINCODE"
            />
          </div>
        </div>

        <div>
          <div style={{'margin':'1rem', 'display':'flex','flexDirection':'column'}}>
            <label name="PAN NUMBER">PAN NUMBER</label>
            <input
              type="tel"
              {...register("panNumber", {
                
                value: props.companyDetailsData.pan,
              })}
              htmlFor="PAN NUMBER"
            />
          </div>
          <div style={{'margin':'1rem', 'display':'flex','flexDirection':'column'}}>
            <label name="GST">GST</label>
            <input
              type="tel"
              {...register("gst", {
                
                value: props.companyDetailsData.gst,
              })}
              htmlFor="GST"
            />
          </div>
          <div style={{'margin':'1rem', 'display':'flex','flexDirection':'column'}}>
            <label name="BANK ACCOUNT NUMBER">BANK ACCOUNT NUMBER</label>
            <input
              type="tel"
              {...register("bankAccountNumber", {
               
                value: props.companyDetailsData.accountNumber,
              })}
              htmlFor="BANK ACCOUNT NUMBER"
            />
          </div>

          <div style={{'margin':'1rem', 'display':'flex','flexDirection':'column'}}>
            <label name="BANK IFSC CODE">BANK IFSC CODE</label>
            <input
              type="tel"
              {...register("bankIFSCCode", {
                
                value: props.companyDetailsData.IFSC,
              })}
              htmlFor="BANK IFSC CODE"
            />
          </div>
          <div style={{'margin':'1rem', 'display':'flex','flexDirection':'column'}}>
            <label name="BANK NAME">BANK NAME</label>
            <input
              type="tel"
              {...register("bankName", {
                
                value: props.companyDetailsData.bankName,
              })}
              htmlFor="BANK NAME"
            />
          </div>
          <div style={{'margin':'1rem', 'display':'flex','flexDirection':'column'}}>
            <label name="BANK NAME">BANK BRANCH</label>
            <input
              type="tel"
              {...register("bankBranch", {
                
                value: props.companyDetailsData.bankBranch,
              })}
              htmlFor="BANK BRANCH"
            />
          </div>
          <div style={{'margin':'1rem', 'display':'flex','flexDirection':'column'}}>
            <label name="SWIFT CODE">SWIFT CODE</label>
            <input
              type="tel"
              {...register("swiftCode", {
                
                value: props.companyDetailsData.swiftCode,
              })}
              htmlFor="SWIFT CODE"
            />
          </div>

          <div style={{'margin':'1rem', 'display':'flex','flexDirection':'column'}}>
            <label name="TYPE">CURRENCY</label>
            <select
              {...register("type", {
                required: true,
                value: props.companyDetailsData.currencyCode,
              })}
              htmlFor="TYPE"
            >
              <option value="">Select</option>
              <option value="INR">INR</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="JPY">JPY</option>
            </select>
          </div>
          <Button onClick={onSubmit}>Edit</Button>
        </div>
      </form>
      <Button onClick={() => props.fun(false)} style={{margin:5}}>Cancel</Button>
    </Box>
  );
};

export default EditCompanyDetails;
