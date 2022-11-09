import React from "react";
import { useForm } from "react-hook-form";
import { Box } from "@mui/material";
import { Button } from "semantic-ui-react";
import { tokenPostRequestOption,tokenRequestOption } from "../../../Helpers/misellaneous";
import { useEffect ,useState} from "react";

const AddLeads = (props) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();
      const[sourceData,setSourceData]=useState()
      const[stageData,setStageData]=useState()
     
      const onSubmit = (data) => {
        const fetchData = async () => {
          try {
            let url =
              "https://devxnet.cubastion.net/api/v1/leads/addLeads";
            const response = await fetch(url, tokenPostRequestOption(data));
            const json = await response.json();
            console.log(data, "----------------->");
            if (json.statusCode === "200") {
              alert("Leads Added Successfully!");
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
        var url=`https://devxnet.cubastion.net/api/v1/listOfValues/findByType?type=LEAD_SOURCE`
        const fetchSourceData = async() => {
            try{
                const response = await fetch(url, tokenRequestOption());
                const json = await response.json();
                console.log(json)
                if(json.statusCode==="200") {
                    setSourceData(json.data)
                } else alert(json.statusMessage);
            } catch(error) {
                console.log("error",error)
            }

        }
        fetchSourceData();
      },[]);

      useEffect(() => {
        var url=`https://devxnet.cubastion.net/api/v1/listOfValues/findByType?type=LEAD_STAGE`
        const fetchStageData = async() => {
            try{
                const response = await fetch(url, tokenRequestOption());
                const json = await response.json();
                console.log(json)
                if(json.statusCode==="200") {
                    setStageData(json.data)
                } else alert(json.statusMessage);
            } catch(error) {
                console.log("error",error)
            }

        }
        fetchStageData();
      },[]);
      console.log(stageData,"---------->")
      
      return (
        <Box p={2} width="500px" textAlign="left" role="presentation">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div>
            <div style={{'margin':'1rem', 'display':'flex','flexDirection':'column'}}>
              <label name="NAME">NAME</label>
              <input
                type="text"
                {...register("name", { required: true })}
                htmlFor="NAME"
              />
            </div>
            <div style={{'margin':'1rem', 'display':'flex','flexDirection':'column'}}>
              <label name="LEAD DESCRIPTION">LEAD DESCRIPTION</label>
              <input
                type="text"
                {...register("shortDescription", { required: true })}
                htmlFor="LEAD DESCRIPTION"
              />
            </div>
            <div style={{'margin':'1rem', 'display':'flex','flexDirection':'column'}}>
                    <label name="SOURCE" onClick={() =>setSourceData() }>SOURCE </label>
                    <select {...register("stage")} htmlFor="SOURCE">
                        <option value="">SELECT</option>
            {sourceData && sourceData.map((x) => (
                        <option value={x.Id} key={x.Id}>{x.source}</option>
                        ))}
                    </select>
            
                </div>   
            <div style={{'margin':'1rem', 'display':'flex','flexDirection':'column'}}>
                    <label name="STAGE" onClick={()=> setStageData() }>STAGE </label>
                    <select {...register("stage")} htmlFor="STAGE">
                        <option value="">SELECT</option>
            {stageData && stageData.map((x) => (
                        <option value={x.Id} key={x.Id}>{x.name}</option>
                        ))}
                    </select>
                </div>    
            <div style={{'margin':'1rem', 'display':'flex','flexDirection':'column'}}>
              <label name="REMARKS">REMARKS</label>
              <textarea {...register("remarks")} htmlFor="REMARKS" />
            </div>
          </div>          
                 
          <Button onClick={onSubmit}>Add</Button>
        </div>
      </form>
      <Button onClick={() => props.fun(false)} style={{margin:5}}>Cancel</Button>
    </Box>
      );
};



let shreya = () =>{

}

export default AddLeads;