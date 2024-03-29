import React from "react";
import { useForm } from "react-hook-form";
import { tokenPutRequestOption } from "../../../Helpers/misellaneous";
import { Box } from "@mui/system";
import { Button } from "semantic-ui-react";


const EditClientDetails=(props) => {
    // console.log(props.clientDetails.title,"------------")
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();
// const [clientData,setClientData] = useState([]);
    const onSubmit=(data) =>{
      
        let value={...data,clientId:props.clientDetails.Id}
        const fetchData= async() => {
          try{
            let url="https://devxnet.cubastion.net/api/v1/clientContact/updateClient?id="+ props.toBeEditedClientDetail.Id;
            const response = await fetch(url, tokenPutRequestOption(value));
            const json = await response.json();
            if(json.statusCode === "200") {
              alert("Clients Details Edited Successfully !");
              props.fun(false);
              props.refresh(true);
            }else alert(json.statusMessage);
          } catch(error) {
            console.log("error",error);
          }
        };
        fetchData();
        console.log(value,"--------")
      };
      
console.log(props.toBeEditedClientDetail.Id,"------------")
// console.log(props.clientDetails.contactDetails.title,"++++++++++")
    return(
        <>
            <Box p={2} width="500px" textAlign="left" role="presentation">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div>
          <div style={{'margin':'1rem', 'display':'flex','flexDirection':'column'}}>
              <label name="title">TITLE</label>
              <select defaultValue={props.toBeEditedClientDetail.title}
              {...register("title", {required: true})}
                 htmlFor="title">
                <option value="">Select</option>
                <option value="Mr.">Mr.</option>
                <option value="Mrs.">Mrs.</option>
                <option value="Ms.">Ms.</option>
              </select>
            </div>
            <div style={{'margin':'1rem', 'display':'flex','flexDirection':'column'}}>
              <label name="FIRST NAME">FIRST NAME</label>
              <input defaultValue={props.toBeEditedClientDetail.firstName}
                type="text"
                {...register("firstName", {
                    required: true,
                    })}

                htmlFor="FIRST NAME"
              />
            </div>
            <div style={{'margin':'1rem', 'display':'flex','flexDirection':'column'}}>
              <label name="MIDDLE NAME">MIDDLE NAME</label>
              <input defaultValue={props.toBeEditedClientDetail.middleName}
                type="text"
                {...register("middleName")}
                htmlFor="MIDDLE NAME"
              />
            </div>
            <div style={{'margin':'1rem', 'display':'flex','flexDirection':'column'}}>
              <label name="LAST NAME">LAST NAME</label>
              <input defaultValue={props.toBeEditedClientDetail.lastName}
                type="text"
                {...register("lastName")}
                htmlFor="LAST NAME"
              />
            </div>
            <div style={{'margin':'1rem', 'display':'flex','flexDirection':'column'}}>
              <label name="DESIGNATION">DESIGNATION</label>
              <input type="text" {...register("designation")} htmlFor="DESIGNATION" defaultValue={props.toBeEditedClientDetail.designation}/>
            </div>
            <div style={{'margin':'1rem', 'display':'flex','flexDirection':'column'}}>
              <label name="EMAIL">EMAIL</label>
              <input type="email" {...register("emailAddress")} htmlFor="EMAIL" defaultValue={props.toBeEditedClientDetail.emailAddress}/>
            </div>
            <div style={{'margin':'1rem', 'display':'flex','flexDirection':'column'}}>
              <label name="PHONE (MOBILE)">PHONE (MOBILE)</label>
              <input  defaultValue={props.toBeEditedClientDetail.mobilePhone}
                type="number"
                {...register("mobilePhone")}
                htmlFor="PHONE (MOBILE)"
              />
            </div>
            <div style={{'margin':'1rem', 'display':'flex','flexDirection':'column'}}>
              <label name="PHONE (WORK)">PHONE (WORK)</label>
              <input type="tel" {...register("workPhone")} htmlFor="PHONE (WORK)" defaultValue={props.toBeEditedClientDetail.workPhone}/>
            </div>
          </div>

          <div >
            <div style={{'margin':'1rem', 'display':'flex','flexDirection':'column'}}>
              <label name="CONTACT TYPE">CONTACT TYPE</label>
              <input  defaultValue={props.toBeEditedClientDetail.contactType}
                type="tel"
                {...register("contactType")}
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
