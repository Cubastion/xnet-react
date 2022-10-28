import React, { useState } from 'react'
import { Table } from 'semantic-ui-react';
import Budgetleadger from './Budgetleadger';

const BudgetSubHead = (props) => {
    
    const [leadgerData, setLeadgerData] = useState(props.data.budgetSubHeadLeadgers);
   
    let onClickBudgetSubHeadHandler = (x) => {
        setLeadgerData(x.budgetSubHeadLeadgers)
    }
  

  return (
      <div>
          <div>
              <div>
                  <p>Sub Head</p>
                  <button> Add </button>
                  <button> Edit </button>
              </div>

              <div style={{ width: "100%", overflow: "auto" }}>
                  <Table celled selectable>
                      <Table.Header>
                          <Table.Row>
                              <Table.HeaderCell>NAME</Table.HeaderCell>
                              <Table.HeaderCell>TYPE</Table.HeaderCell>
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
                          </Table.Row>
                      </Table.Header>
                      <Table.Body>
                          {props.data && props.data.length > 0 && props.data.map((x) => (
                              <Table.Row onClick={() => onClickBudgetSubHeadHandler(x)} key={x.Id}>
                                  <Table.Cell>{x.name}</Table.Cell>
                                  <Table.Cell>{x.type}</Table.Cell>
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
                              </Table.Row>
                          ))}
                      </Table.Body>
                  </Table>
              </div>
          </div>
          {
              leadgerData && leadgerData.length > 0 && <Budgetleadger data={leadgerData}></Budgetleadger>
          }
      </div>
  )
}

export default BudgetSubHead