import React from "react";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
const PoNavigator = (props) => {
  console.log(props.selection)
    const poNavs = [
    { value: "all-purchase", label: "All Purchase Order" },
    { value: "my-purchase", label: "My Purchase Order" },
    { value: "internal-po", label:"Internal PO"},
    {
      value: "internal-po-approval-level-1",
      label: "Internal PO Approval Level 1",
    },
    {
      value: "internal-po-approval-level-2",
      label: "Internal PO Approval Level 2",
    },
    {
      value: "internal-po-approval-level-all",
      label: "Internal PO Approval Level All",
    },
  ];

 const navigate = useNavigate()

  return (
    <div style={{'width': '250px', 'margin':'1rem', display: "flex", flexDirection: "column"}}>
      <Select defaultValue={props.selection} onChange={(val)=>{navigate(`/${val.value}`)}} options={poNavs} />
    </div>
  );
};

export default PoNavigator;
