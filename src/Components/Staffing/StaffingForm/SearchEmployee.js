import React from "react";
import { useForm } from "react-hook-form";
import { Box } from "@mui/material";
import { Button } from "semantic-ui-react";
import { tokenPostRequestOption,tokenRequestOption } from "../../Helpers/misellaneous";
import { useEffect ,useState} from "react";


const SearchEmployee = (props) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();
      const[pageNumber,setPageNumber] = useState(1);
      const[totalPages,setTotalPages] = useState(0);
      const [inputValue, setValue] = useState('');
      const [selectedValue, setSelectedValue] = useState(null);

      const onSubmit = (data) => {
        const fetchData = async () => {
          try {
            let url =
              `https://devxnet.cubastion.net/api/v1/search/findByGenericQuery/employeeStaffing?page=${pageNumber}`;
            const response = await fetch(url, tokenPostRequestOption());
            const json = await response.json();
            console.log(data, "----------------->");
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
                <label name="EMPLOYEE CODE" style={{margin:"1rem", display:"flex"}}>EMPLOYEE CODE</label>
                <input type="text" {...register("employeeCode")}
                htmlFor="EMPLOYEE CODE">
                </input>
            </div>
            <div>
                <label name="CLIENT NAME" style={{margin:"1rem", display:"flex"}}>CLIENT NAME</label>
                <input type="text" {...register("clientName")}
                htmlFor="CLIENT NAME">
                </input>
            </div>
            <div>
                <label name="PROJECT" style={{margin:"1rem", display:"flex"}}>PROJECT</label>
                <input type="text" {...register("projet")}
                htmlFor="PROJECT">
                </input>
            </div>
            

        
          <Button style={{margin:"1rem", display:"flex"}}>Search</Button>
        </div>
      </form>
      <Button onClick={() => props.fun(false)} style={{margin:"1rem", display:"flex"}}>Cancel</Button>
    </Box>
      );
};

export default SearchEmployee;