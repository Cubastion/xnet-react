import React, { useEffect, useState } from 'react'
import BudgetEntry from './BudgetEntry'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import MyBudget from './MyBudget';
import { tokenRequestOption } from '../Helpers/misellaneous';
const Budget = () => {
  let [financialYearData, setFinancialYearData] = useState([]);
  const fetchData = async () => {
    try {
      let url = 'https://devxnet.cubastion.net/api/v1/listOfValues/findByType?type=FINANCIAL_YEAR'
      const response = await fetch(url, tokenRequestOption());
      let json = await response.json();
      setFinancialYearData(json.data)
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    fetchData()
  }, [])



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
        <BudgetEntry fyData={financialYearData} />
      </TabPanel>
      <TabPanel>
        <MyBudget></MyBudget>
      </TabPanel>
    </Tabs>

  )
}

export default Budget