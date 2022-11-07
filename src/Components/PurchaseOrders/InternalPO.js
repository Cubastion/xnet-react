import React, { useEffect, useState } from "react";
import { tokenRequestOption } from "../Helpers/misellaneous";
import PoNavigator from "./PoNavigator";
import InternalPOTable from "./POTables/InternalPOTable";
const InternalPO = () => {
  const [internalPO, setInternalPO] = useState("");
  const [selectedInternalPO, setSelectedInternalPO] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  useEffect(() => {
    var url = `https://devxnet.cubastion.net//api/v1/internalPOs/findAll?page=${pageNumber}`;
    const fetchData = async () => {
      try {
        const response = await fetch(url, tokenRequestOption());
        const json = await response.json();
        setInternalPO(json.data);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, [pageNumber]);

  return (
    <>
      <div>
        <PoNavigator
          selection={{ value: "internal-po", label: "Internal PO" }}
        />
      </div>
      <div style={{'overflow':'scroll'}}>

      <InternalPOTable/>
      </div>
    </>
  );
};

export default InternalPO;
