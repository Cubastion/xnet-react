import React, { useEffect, useState } from 'react'
import { Table } from 'semantic-ui-react';
import { tokenRequestOption } from '../Helpers/misellaneous'
import BudgetHead from './BudgetHead';

const BudgetEntry = (props) => {

  const [budgetData, setBudgetData] = useState([]);
  const [budgetHeadData, setBudgetHeadData] = useState([]);

  let FinancialYearHandleChange = event => {
    const fetchData = async () => {
      try {
        let url = 'https://devxnet.cubastion.net//api/v1/budgets/getBudget?fnYear=' + event.target.value;
        const response = await fetch(url, tokenRequestOption());
        const json = await response.json();
        setBudgetData(json.data)
        if (json.data.length === 0 || json.data[0].budgetHeads.length === 0) setBudgetHeadData([])
        else setBudgetHeadData(json.data[0].budgetHeads);
      } catch (error) {
        console.log("error", error);
      }
    }
    fetchData()
  }

  let onClickBudgetHandler = (x) => {
    console.log('x.budgetHeads--->',x.budgetHeads)
    setBudgetHeadData(x.budgetHeads) 
  }

  return (
    <div>
      <div>
        <select name="selectBox" onChange={(event) => FinancialYearHandleChange(event)}>
          {props.fyData && props.fyData.map(fbb =>
            <option key={fbb.Id} value={fbb.name}>{fbb.displayValue}</option>
          )}
        </select>
        <p>Budget</p>
        <Table celled selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>FINANCIAL YEAR</Table.HeaderCell>
              <Table.HeaderCell>VERSION</Table.HeaderCell>
              <Table.HeaderCell>STATUS</Table.HeaderCell>
              <Table.HeaderCell>ANNUAL</Table.HeaderCell>
              <Table.HeaderCell>APR</Table.HeaderCell>
              <Table.HeaderCell>MAY</Table.HeaderCell>
              <Table.HeaderCell>JUN</Table.HeaderCell>
              <Table.HeaderCell>JUL</Table.HeaderCell>
              <Table.HeaderCell>AUG</Table.HeaderCell>
              <Table.HeaderCell>SEP</Table.HeaderCell>
              <Table.HeaderCell>OCT</Table.HeaderCell>
              <Table.HeaderCell>NOV</Table.HeaderCell>
              <Table.HeaderCell>DEC</Table.HeaderCell>
              <Table.HeaderCell>JAN</Table.HeaderCell>
              <Table.HeaderCell>FEB</Table.HeaderCell>
              <Table.HeaderCell>MAR</Table.HeaderCell>
              <Table.HeaderCell>CURRENCY</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {budgetData && budgetData.length > 0 && budgetData.map((x) => (
              <Table.Row onClick={() => onClickBudgetHandler(x)} key={x.Id}>
                <Table.Cell>{x.financialYear}</Table.Cell>
                <Table.Cell>{x.version}</Table.Cell>
                <Table.Cell>{x.status}</Table.Cell>
                <Table.Cell>{x.pTotalAmount}</Table.Cell>
                <Table.Cell>{x.p04}</Table.Cell>
                <Table.Cell>{x.p05}</Table.Cell>
                <Table.Cell>{x.p06}</Table.Cell>
                <Table.Cell>{x.p07}</Table.Cell>
                <Table.Cell>{x.p08}</Table.Cell>
                <Table.Cell>{x.p09}</Table.Cell>
                <Table.Cell>{x.p10}</Table.Cell>
                <Table.Cell>{x.p11}</Table.Cell>
                <Table.Cell>{x.p12}</Table.Cell>
                <Table.Cell>{x.p01}</Table.Cell>
                <Table.Cell>{x.p02}</Table.Cell>
                <Table.Cell>{x.p03}</Table.Cell>
                <Table.Cell>{x.currencyCode}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>

      <div>
        {budgetHeadData.length > 0 &&
          <BudgetHead data={budgetHeadData}></BudgetHead>
        }
      </div>
    </div>


  )
}

export default BudgetEntry