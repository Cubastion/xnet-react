import React from "react";
import PoNavigator from "./PoNavigator";

const InternalPOAll = () => {
  return (
    <>
      <div>
        <PoNavigator
          selection={{
            value: "internal-po-approval-level-all",
            label: "Internal PO Approval Level All",
          }}
        />
      </div>
    </>
  );
};

export default InternalPOAll;
