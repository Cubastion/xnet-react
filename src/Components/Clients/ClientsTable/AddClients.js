import React from "react";
import { useForm } from "react-hook-form";
import { Box } from "@mui/material";
import { Button } from "semantic-ui-react";
import { tokenPostRequestOption,tokenRequestOption } from "../../Helpers/misellaneous";
import { useEffect ,useState} from "react";

const AddClients = (props) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();
      const [calenderData,setCalenderData] = useState()
      const[image,setImage]=useState([]);
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
        var url=`https://devxnet.cubastion.net/api/v1/holidayCalendar/getAllHolidayCalendar`
        const fetchCalenderData = async() => {
            try{
                const response = await fetch(url, tokenRequestOption());
                const json = await response.json();
                console.log(json)
                if(json.statusCode==="200") {
                    setCalenderData(json.data)
                } else alert(json.statusMessage);
            } catch(error) {
                console.log("error",error)
            }

        }
        fetchCalenderData();
      },[]);

      const [imageURLs, setImageURLs] = useState([]);
      useEffect(() => {
        if(image.length < 1) return;
        const newImageUrls =[];
        image.forEach(image => newImageUrls.push(URL.createObjectURL(image)));
        setImageURLs(newImageUrls);
      },[image]);
       
      function onImageChange(e) {
        setImage([...e.target.files]);
      }

      

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
              <label name="ALIAS NAME">ALIAS NAME</label>
              <input
                type="text"
                {...register("aliasName", { required: true })}
                htmlFor="ALIAS NAME"
              />
            </div>
            <div style={{'margin':'1rem', 'display':'flex','flexDirection':'column'}}>
              <label name="ADDRESS LINE1">ADDRESS LINE1</label>
              <input
                type="text"
                {...register("addressLine1")}
                htmlFor="ADDRESS LINE1"
              />
            </div>
            <div style={{'margin':'1rem', 'display':'flex','flexDirection':'column'}}>
              <label name="ADDRESS LINE2">ADDRESS LINE2</label>
              <input
                type="text"
                {...register("addressLine2")}
                htmlFor="ADDRESS LINE2"
              />
            </div>
            <div style={{'margin':'1rem', 'display':'flex','flexDirection':'column'}}>
              <label name="CITY">CITY</label>
              <input type="tel" {...register("city")} htmlFor="CITY" />
            </div>
            <div style={{'margin':'1rem', 'display':'flex','flexDirection':'column'}}>
              <label name="STATE">STATE</label>
              <input type="tel" {...register("state")} htmlFor="STATE" />
            </div>
            <div style={{'margin':'1rem', 'display':'flex','flexDirection':'column'}}>
              <label name="PINCODE">PINCODE</label>
              <input
                type="tel"
                {...register("pincode")}
                htmlFor="PINCODE"
              />
            </div>
            <div style={{'margin':'1rem', 'display':'flex','flexDirection':'column'}}>
              <label name="COUNTRY">COUNTRY</label>
              <input type="tel" {...register("country")} htmlFor="COUNTRY" />
            </div>
          </div>

          <div >
            <div style={{'margin':'1rem', 'display':'flex','flexDirection':'column'}}>
              <label name="PAN NUMBER">PAN NUMBER</label>
              <input
                type="tel"
                {...register("pan")}
                htmlFor="PAN NUMBER"
              />
            </div>
            <div style={{'margin':'1rem', 'display':'flex','flexDirection':'column'}}>
              <label name="GST">GST</label>
              <input
                type="tel"
                {...register("gst")}
                htmlFor="GST"
              />
            </div>
            <div style={{'margin':'1rem', 'display':'flex','flexDirection':'column'}}>
              <label name="ACCOUNT MANAGER">ACCOUNT MANAGER</label>
              <input
                type="text"
                {...register("accountManager")}
                htmlFor="ACCOUNT MANAGER"
              />
            </div>
                <div style={{'margin':'1rem', 'display':'flex','flexDirection':'column'}}>
                    <label name="HOLIDAY CALENDAR" onClick={() =>setCalenderData() }>HOLIDAY CALENDAR </label>
                    <select {...register("holidayCalendar")} htmlFor="HOLIDAY CALENDAR">
                        <option value="">SELECT</option>
            {calenderData && calenderData.map((x) => (
                        <option value={x.Id} key={x.Id}>{x.calendarName}</option>
                        ))}
                    </select>
            
              </div>
              <div style={{'margin':'1rem', 'display':'flex','flexDirection':'column'}}>
              <label name="attachment" onChange={onImageChange}>LOGO</label>
              <input type="file" {...register("attachment")} htmlFor="LOGO" />
            </div>

            
          </div>
          <Button onClick={onSubmit}>Add</Button>
        </div>
      </form>
      <Button onClick={() => props.fun(false)} style={{margin:5}}>Cancel</Button>
    </Box>
      );
};

export default AddClients;