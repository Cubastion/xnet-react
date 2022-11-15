import React from "react";
import { useForm } from "react-hook-form";
import { Box } from "@mui/material";
import { Button } from "semantic-ui-react";
import { tokenPostRequestOption,tokenRequestOption } from "../../Helpers/misellaneous";
import { useEffect ,useState} from "react";

const AddEmployee = (props) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();
      const[designation,setDesignation] = useState();
      const[clientName, setClientName] = useState();
      const onSubmit = (data) => {
        const fetchData = async () => {
          try {
            let url =
              "https://devxnet.cubastion.net/api/v1/clients/addClient";
            const response = await fetch(url, tokenPostRequestOption(data));
            const json = await response.json();
            console.log(data, "----------------->");
            if (json.statusCode === "200") {
              alert("Clients Added Successfully!");
              props.fun(false);
              props.addRefresh(true);
            } else alert(json.statusMessage);
          } catch (error) {
            console.log("error", error);
          }
        };
        fetchData();
      };

      useEffect(() => {
        var url=`https://devxnet.cubastion.net/api/v1/listOfValues/findByType?type=DESIGNATION_CD`
        const fetchDesignationData = async() => {
            try{
                const response = await fetch(url, tokenRequestOption());
                const json = await response.json();
                console.log(json)
                if(json.statusCode==="200") {
                    setDesignation(json.data)
                } else alert(json.statusMessage);
            } catch(error) {
                console.log("error",error)
            }

        }
        fetchDesignationData();
      },[]);



      useEffect(() => {
        var url=`https://devxnet.cubastion.net/api/v1/projects/getAllProjectsByClientId?clientId`
        const fetchClientData = async() => {
            try{
                const response = await fetch(url, tokenRequestOption());
                const json = await response.json();
                console.log(json)
                if(json.statusCode==="200") {
                  setClientName(json.data)
                } else alert(json.statusMessage);
            } catch(error) {
                console.log("error",error)
            }

        }
        fetchClientData();
      },[]);

console.log(clientName,"---")

    

      
      return (
        <Box p={2} width="500px" textAlign="left" role="presentation">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div>
            <div style={{'margin':'1rem', 'display':'flex','flexDirection':'column'}}>
              <label name="EMPLOYEE">EMPLOYEE</label>
              <input
                type="text"
                {...register("employee", { required: true })}
                htmlFor="EMPLOYEE"
              />
            </div>
            <div >
                <div style={{'margin':'1rem', 'display':'flex','flexDirection':'column'}}>
                    <label name="CLIENT" onClick={() =>setClientName() }>CLIENT </label>
                    <select {...register("role")} htmlFor="CLIENT">
                        <option value="">SELECT</option>
            {clientName && clientName.map((x) => (
                        <option value={x.Id} key={x.Id}>{x.displayValue}</option>
                        ))}
                    </select>
            
              </div>

            
          </div>
            <div style={{'margin':'1rem', 'display':'flex','flexDirection':'column'}}>
              <label name="PROJECT">PROJECT</label>
              <input
                type="text"
                {...register("project")}
                htmlFor="PROJECT"
              />
            </div>
            <div style={{'margin':'1rem', 'display':'flex','flexDirection':'column'}}>
              <label name="START DATE">START DATE</label>
              <input
                type="text"
                {...register("startDate")}
                htmlFor="START DATE"
              />
            </div>
            <div style={{'margin':'1rem', 'display':'flex','flexDirection':'column'}}>
              <label name="END DATE">END DATE</label>
              <input type="tel" {...register("endDate")} htmlFor="END DATE" />
            </div>
            <div style={{'margin':'1rem', 'display':'flex','flexDirection':'column'}}>
              <label name="STAFFING(%)">STAFFING(%)</label>
              <input
                type="tel"
                {...register("staffing")}
                htmlFor="STAFFING(%)"
              />
            </div>
          </div>

          <div >
                <div style={{'margin':'1rem', 'display':'flex','flexDirection':'column'}}>
                    <label name="ROLE" onClick={() =>setDesignation() }>ROLE </label>
                    <select {...register("role")} htmlFor="ROLE">
                        <option value="">SELECT</option>
            {designation && designation.map((x) => (
                        <option value={x.Id} key={x.Id}>{x.displayValue}</option>
                        ))}
                    </select>
            
              </div>

            
          </div>
          <Button onClick={onSubmit}>Add</Button>
        </div>
      </form>
      <Button onClick={() => props.fun(false)} style={{margin:5}}>Cancel</Button>
    </Box>
      );
};

export default AddEmployee;