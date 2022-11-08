import React, { createContext, useEffect, useState } from "react";
import { tokenRequestOption } from "../Helpers/misellaneous";
import InternalPOLineItemsTable from "./InternalPOLineItemsTable";
import PoNavigator from "./PoNavigator";
import InternalPOTable from "./POTables/InternalPOTable";
export const selectedInternalPO = createContext();
// https://devxnet.cubastion.net//api/v1/budgets/getActiveBudget
const InternalPO = () => {
  const [activeBudget, setActiveBudget] = useState(null);
  const [selectedInternalPOItemFromTable, setSelectedInternalPOItemFromTable] =
    useState("");
  const [eligibleforApproval, setEligibleforApproval] = useState(false);
  useEffect(() => {
    var url = `https://devxnet.cubastion.net//api/v1/budgets/getActiveBudget`;
    const fetchData = async () => {
      try {
        const response = await fetch(url, tokenRequestOption());
        const json = await response.json();
        setActiveBudget(json.data);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div>
        <PoNavigator
          selection={{ value: "internal-po", label: "Internal PO" }}
        />
      </div>
      <selectedInternalPO.Provider
        value={[
          selectedInternalPOItemFromTable,
          setSelectedInternalPOItemFromTable,
        ]}
      >
        <div>
          <InternalPOTable
            eligibleforApproval={eligibleforApproval}
            activeBudget={activeBudget}
          />
        </div>
        <div style={{'marginBottom': '3rem'}}>
          <InternalPOLineItemsTable
            activeBudget={activeBudget}
            setEligibleforApproval={setEligibleforApproval}
            selectedInternalPO={selectedInternalPO}
          />
        </div>
      </selectedInternalPO.Provider>
    </>
  );
};

export default InternalPO;
