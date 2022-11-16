// import React from "react";
// import { useForm } from "react-hook-form";
// import { Box } from "@mui/material";
// import { Button } from "semantic-ui-react";
// import { tokenPostRequestOption,tokenRequestOption } from "../../Helpers/misellaneous";
// import { useEffect ,useState} from "react";
// import AsyncSelect from "react-select/dist/declarations/src/Async";

// const SearchEmployee = (props) => {
//     const {
//         register,
//         handleSubmit,
//         formState: { errors },
//       } = useForm();
//       const[pageNumber,setPageNumber] = useState(1);
//       const[totalPages,setTotalPages] = useState(0);
//       const [inputValue, setValue] = useState('');
//       const [selectedValue, setSelectedValue] = useState(null);
//       const handleInputChange = value => {
//         setValue(value);
//       };
//       const handleChange = value => {
//         setSelectedValue(value);
//       };

//         const loadOptions = async (inputValue) => {
//             try {
//              let url =
//                `https://devxnet.cubastion.net/api/v1/search/findByGenericQuery/employeeStaffing?page=${pageNumber}`;
//              const response = await fetch(url, tokenPostRequestOption());
//              const json = await response.json();
//                return json.data
//                setTotalPages(json.paginate.totalPages);
//            } catch (error) {
//              console.log("error", error);
//            }
//          };

    
      

      
//       return (
//         <Box p={2} width="500px" textAlign="left" role="presentation">
//       <form>
//         <div>
//         <div >
//               <label name="EMPLOYEE CODE">EMPLOYEE CODE</label>
//               <AsyncSelect
//         cacheOptions
//         defaultOptions
//         value={selectedValue}
//         getOptionLabel={e => e.firstName + " " + e.lastName }
//         getOptionValue={e => e.id}
//         loadOptions={loadOptions}
//         onInputChange={handleInputChange}
//         onChange={handleChange}
//       />
//             </div>
//           <Button>Search</Button>
//         </div>
//       </form>
//       <Button onClick={() => props.fun(false)} style={{margin:5}}>Cancel</Button>
//     </Box>
//       );
// };

// export default SearchEmployee;