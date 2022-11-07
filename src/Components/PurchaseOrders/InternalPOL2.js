import React from 'react'
import PoNavigator from "./PoNavigator";

const InternalPOL2 = () => {
  return (
   
    <>
      <div>
        <PoNavigator
          selection={{
            value: "internal-po-approval-level-2",
            label: "Internal PO Approval Level 2",
          }}
        />
      </div>
    </>
  )
}


export default InternalPOL2