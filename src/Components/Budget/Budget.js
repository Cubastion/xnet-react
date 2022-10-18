import React from 'react'
import BudgetEntry from './BudgetEntry'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import MyBudget from './MyBudget';
const Budget = () => {
  return (
    
          <Tabs>
              <TabList>
                  <Tab>Budgets</Tab>
                  <Tab>Budget Entry</Tab>
                  <Tab>My Budget</Tab>
              </TabList>

              <TabPanel>
                Budget Works Here
              </TabPanel>
              <TabPanel>
                   <BudgetEntry/>
              </TabPanel>
              <TabPanel>
                <MyBudget></MyBudget>
              </TabPanel>
          </Tabs>
   
  )
}

export default Budget