import React ,{createContext,useState} from 'react'
import AllPurchaseOrders from './POTables/AllPurchaseOrders'
import POItemsTable from './POTables/POItemsTable'
export const SelectedContextPO = createContext("")
const PurchaseOrders = () => {

 const [selectedPO, setSelectedPO] = useState("")
  return (
    <div>
        <SelectedContextPO.Provider value={[selectedPO, setSelectedPO]}>
        <AllPurchaseOrders/>
        <div style={{'marginTop':'2rem','marginBottom':'2rem'}}>
        {selectedPO && <POItemsTable/>}
        </div>
        </SelectedContextPO.Provider>
    </div>
  )
}

export default PurchaseOrders