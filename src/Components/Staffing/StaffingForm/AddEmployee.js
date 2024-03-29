import React from "react";
import { useForm } from "react-hook-form";
import { Box } from "@mui/material";
import { Button } from "semantic-ui-react";
import { tokenPostRequestOption,tokenRequestOption } from "../../Helpers/misellaneous";
import { useEffect ,useState} from "react";
import AsyncSelect from 'react-select/async';

const AddEmployee = (props) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();
      const[designation,setDesignation] = useState();
      const[clientName, setClientName] = useState();
      const[client,setClient] = useState();
      const [inputValue, setValue] = useState('');
      const [selectedValue, setSelectedValue] = useState(null);
      const [projects,setProjects]=useState([]);
      const handleInputChange = value => {
    setValue(value);
  };

  // handle selection
  const handleChange = value => {
    setSelectedValue(value);
  }

  // load options using API call
  const loadOptions = async (inputValue) => {
    if(inputValue.length>3)
   { try {
      let url =
        `https://devxnet.cubastion.net/api/v1/employee/getEmployees?query=${inputValue}`;
      const response = await fetch(url, tokenRequestOption());
      const json = await response.json();
        return json.data
    } catch (error) {
      console.log("error", error);
    }}
  };

      const onSubmit = (data) => {
        data.employeeId=selectedValue?.Id;
        console.log(JSON.stringify(data,null,4));
        const fetchData = async () => {
          try {
            let url =
              "https://devxnet.cubastion.net/api/v1/employeeStaffing/addEmployeeStaffing";
            const response = await fetch(url, tokenPostRequestOption(data));
            const json = await response.json();
            console.log("----------------->",data);
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

      console.log("----",selectedValue)

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
console.log(designation, "------->>>")

      useEffect(() => {
        let url =`https://devxnet.cubastion.net/api/v1/clients/getAllClientsForFilter`
        const fetchClientData = async() => {
          try{
              const response = await fetch(url, tokenRequestOption());
              const json = await response.json();
              console.log(json)
              if(json.statusCode==="200") {
                setClient(json.data)
              } else alert(json.statusMessage);
          } catch(error) {
              console.log("error",error)
          }
      }
      fetchClientData();
      },[]);

const projectOptions = async(id) => {
  console.log("calling client filter");
  let url=`https://devxnet.cubastion.net/api/v1/projects/getAllProjectsByClientId?clientId=${id}`
  try{
    const response = await fetch(url, tokenRequestOption());
    console.log("response recieved");
    const json = await response.json();
    setProjects(json.data)
    console.log(json)
  } catch(error) {
    console.log("error", error)
  }
};
      return (
        <Box p={2} width="500px" textAlign="left" role="presentation">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div>
            <div >
              <label name="EMPLOYEE">EMPLOYEE</label>
              <AsyncSelect
        cacheOptions
        defaultOptions
        value={selectedValue}
        getOptionLabel={e => e.firstName + " " + e.lastName }
        getOptionValue={e => e.id}
        loadOptions={loadOptions}
        onInputChange={handleInputChange}
        onChange={handleChange}
        // {...register("employeeId")}
      />
            </div>
            <div >
                <div style={{'margin':'1rem', 'display':'flex','flexDirection':'column'}}>
                    <label name="CLIENT" >CLIENT</label>
                    <select {...register("clientId")}  onChange={(e) => projectOptions(e.target.value)}  >
                        <option value="">SELECT</option>
            {client?.length>0 && client?.map((x) => (
                        <option value={x.Id} key={x.Id}>{x.name}</option>
                        ))}
                    </select>           
              </div>
          </div>
          <div >
                <div style={{'margin':'1rem', 'display':'flex','flexDirection':'column'}}>
                    <label name="PROJECT" >PROJECT </label>
                      <select {...register("projectId")} htmlFor="PROJECT"  >
                        <option value="">SELECT</option>
                        {projects?.length>0 && projects?.map((x) => (
                        <option value={x.Id} key={x.Id}>{x.name}</option>
                        ))}
                    </select>
              </div>
          </div>
            <div style={{'margin':'1rem', 'display':'flex','flexDirection':'column'}}>
              <label name="START DATE">START DATE</label>
              <input
                type="date"
                {...register("startDate")}
                htmlFor="START DATE"
              />
            </div>
            <div style={{'margin':'1rem', 'display':'flex','flexDirection':'column'}}>
              <label name="END DATE">END DATE</label>
              <input type="date" {...register("endDate")} htmlFor="END DATE" />
            </div>
            <div >
                <div style={{'margin':'1rem', 'display':'flex','flexDirection':'column'}}>
                    <label name="ROLE" onClick={() =>setDesignation() }>ROLE </label>
                    <select {...register("role")} htmlFor="ROLE">
                        <option value="">SELECT</option>
            {designation && designation.map((x) => (
                        <option value={x.displayValue} key={x.Id}>{x.displayValue}</option>
                        ))}
                    </select>            
              </div>           
          </div>           
            <div style={{'margin':'1rem', 'display':'flex','flexDirection':'column'}}>
              <label name="STAFFING(%)">STAFFING(%)</label>
              <input
                value="100"
                {...register("staffing")} 
                htmlFor="STAFFING(%)"
              />
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