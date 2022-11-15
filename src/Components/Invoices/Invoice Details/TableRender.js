import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import React from "react";
import AttachmentsTable from "./invoice Tables/AttachmentsTable";
import InvoiceItemsTable from "./invoice Tables/InvoiceItemsTable";

const TableRender = () => {
  return (
    <>
      <Tabs>
        <TabList>
          <Tab>Invoices Items</Tab>
          <Tab>Attachments</Tab>
        </TabList>
        <TabPanel>
          <InvoiceItemsTable />
        </TabPanel>
        <TabPanel>
          <AttachmentsTable />
        </TabPanel>
      </Tabs>
    </>
  );
};

export default TableRender;
