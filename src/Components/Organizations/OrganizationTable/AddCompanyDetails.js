import React, { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { Box } from "@mui/material";
import { Button } from "semantic-ui-react";
import { tokenPostRequestOption } from "../../Helpers/misellaneous";

const CompanyDetails = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const fetchData = async () => {
      try {
        let url =
          "https://devxnet.cubastion.net/api/v1/Organization/addOrganization";
        console.log(data, "below api call");
        const response = await fetch(url, tokenPostRequestOption(data));
        const json = await response.json();
        console.log(json, "----------------->");
        if (json.statusCode === "200") {
          alert("Details Added Successfully!");
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
          <div>
            <div>
              <label name="NAME">NAME</label>
              <input
                type="text"
                {...register("name", { required: true })}
                htmlFor="NAME"
              />
            </div>
            <div>
              <label name="ADDRESS LINE1">ADDRESS LINE1</label>
              <input
                type="text"
                {...register("addressLine1", { required: true })}
                htmlFor="ADDRESS LINE1"
              />
            </div>
            <div>
              <label name="ADDRESS LINE2">ADDRESS LINE2</label>
              <input
                type="text"
                {...register("addressLine2", { required: true })}
                htmlFor="ADDRESS LINE2"
              />
            </div>
            <div>
              <label name="CITY">CITY</label>
              <input type="tel" {...register("city", { required: true })} htmlFor="CITY" />
            </div>
            <div>
              <label name="STATE">STATE</label>
              <input type="tel" {...register("state", { required: true })} htmlFor="STATE" />
            </div>
            <div>
              <label name="PINCODE">PINCODE</label>
              <input
                type="tel"
                {...register("pincode", { required: true })}
                htmlFor="PINCODE"
              />
            </div>
            <div>
              <label name="COUNTRY">COUNTRY</label>
              <input type="tel" {...register("country", { required: true })} htmlFor="COUNTRY" />
            </div>
          </div>

          <div >
            <div>
              <label name="PAN NUMBER">PAN NUMBER</label>
              <input
                type="tel"
                {...register("panNumber")}
                htmlFor="PAN NUMBER"
              />
            </div>
            <div>
              <label name="GST">GST</label>
              <input
                type="tel"
                {...register("gst")}
                htmlFor="GST"
              />
            </div>
            <div>
              <label name="BANK ACCOUNT NUMBER">BANK ACCOUNT NUMBER</label>
              <input
                type="tel"
                {...register("bankAccountNumber")}
                htmlFor="BANK ACCOUNT NUMBER"
              />
            </div>

            <div>
              <label name="BANK IFSC CODE">BANK IFSC CODE</label>
              <input
                type="tel"
                {...register("bankIFSCCode")}
                htmlFor="BANK IFSC CODE"
              />
            </div>
            <div>
              <label name="BANK NAME">BANK NAME</label>
              <input
                type="tel"
                {...register("bankName")}
                htmlFor="BANK NAME"
              />
            </div>
            <div>
              <label name="BANK NAME">BANK BRANCH</label>
              <input
                type="tel"
                {...register("bankBranch")}
                htmlFor="BANK BRANCH"
              />
            </div>
            <div>
              <label name="SWIFT CODE">SWIFT CODE</label>
              <input
                type="tel"
                {...register("swiftCode")}
                htmlFor="SWIFT CODE"
              />
            </div>

            <div>
              <label name="TYPE">CURRENCY</label>
              <select {...register("type", { required: true })} htmlFor="TYPE">
                <option value="">Select</option>
                <option value="RECRUITMENT">INR</option>
                <option value="SERVICES">USD</option>
                <option value="STAFF">EUR</option>
                <option value="OTHERS">JPY</option>
              </select>
            </div>
          </div>
          <Button onClick={onSubmit}>Add</Button>
          <Button onClick={() => props.fun(false)}>Cancel</Button>
        </div>
      </form>
    </Box>
  );
};

export default CompanyDetails;
