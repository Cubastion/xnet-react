import React, { createContext, useState } from "react";
import POAttachmentsTable from "./POTables/POAttachmentsTable";
import POInvoicesTable from "./POTables/POInvoicesTable";
import POForecastsTable from "./POTables/POForecastsTable";
import AllPurchaseOrders from "./POTables/AllPurchaseOrders";
import PONotesTable from "./POTables/PONotesTable";
import POItemsTable from "./POTables/POItemsTable";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
export const SelectedContextPO = createContext("");

const PurchaseOrders = () => {
  const [selectedPO, setSelectedPO] = useState("");
  return (
    <div>
      <SelectedContextPO.Provider value={[selectedPO, setSelectedPO]}>
        <AllPurchaseOrders />
        <div style={{ marginTop: "2rem", marginBottom: "2rem" }}>
          {selectedPO && (
            <>
              <Tabs>
                <TabList>
                  <Tab>Purchase Order Items</Tab>
                  <Tab>Attachments</Tab>
                  <Tab>Invoices</Tab>
                  <Tab>Forecasts</Tab>
                  <Tab>Notes</Tab>
                </TabList>
                <TabPanel>
                  <POItemsTable />
                </TabPanel>
                <TabPanel>
                  <POAttachmentsTable />
                </TabPanel>
                <TabPanel>
                  <POInvoicesTable />
                </TabPanel>
                <TabPanel>
                  <POForecastsTable />
                </TabPanel>
                <TabPanel>
                  <PONotesTable />
                </TabPanel>
              </Tabs>
            </>
          )}
        </div>
      </SelectedContextPO.Provider>
    </div>
  );
};

export default PurchaseOrders;
