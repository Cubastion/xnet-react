import React, { useEffect, useState } from 'react'
import { Table } from 'semantic-ui-react'
import isUndefined from '../Helpers/isUndefined';
import { tokenRequestOption } from '../Helpers/misellaneous'

const Budgetleadger = (props) => {

     
    const [leadgerData, setLeadgerData] = useState([]);



    const fetchData = async () => {
        try {
            let url = `https://devxnet.cubastion.net//api/v1/budgetSubHeadsLeadgers/getDataByBudgetAndHeadAndSubHeadId?budgetId=${props.data[0].budgetId}&budgetHeadId=${props.data[0].budgetHeadId}&budgetSubHeadId=${props.data[0].budgetSubHeadId}`;
            const response = await fetch(url, tokenRequestOption());
            const json = await response.json();
            setLeadgerData(json.data);
        } catch (error) {
            console.log("error", error);
        }
    }
    useEffect(() => {
        fetchData()

    }, [props.data[0].budgetSubHeadId]);


    let onClickLeadger = (x) => {
        
    }






  return (
      <div>
          <div>
              <div>
                  <p>Sub Head Leadger</p>
                  <button> Add </button>
                  <button> Edit </button>
              </div>

              <Table celled selectable>
                  <Table.Header>
                      <Table.Row>
                          <Table.HeaderCell>REFERENCENUM</Table.HeaderCell>
                          <Table.HeaderCell>SOURCE</Table.HeaderCell>
                          <Table.HeaderCell>TYPE</Table.HeaderCell>
                          <Table.HeaderCell>EMPLOYEE</Table.HeaderCell>
                          <Table.HeaderCell>DESCRIPTION</Table.HeaderCell>
                          <Table.HeaderCell>STATUS</Table.HeaderCell>
                          <Table.HeaderCell>MONTH</Table.HeaderCell>
                          <Table.HeaderCell>AMOUNT</Table.HeaderCell>
                      </Table.Row>
                  </Table.Header>
                  <Table.Body>
                      {leadgerData && leadgerData.length > 0 && leadgerData.map((x) => (
                          <Table.Row onClick={() => onClickLeadger(x)} key={x.Id}>
                              <Table.Cell>{x.referenceNum}</Table.Cell>
                              <Table.Cell>{x.source}</Table.Cell>
                              <Table.Cell>{x.type}</Table.Cell>
                              <Table.Cell>{`${isUndefined(x.employeeLeadger?.employee)}-${isUndefined(x.employeeLeadger?.firstName)} ${isUndefined(x.employeeLeadger?.lastName)}`}</Table.Cell>
                              <Table.Cell>{x.description}</Table.Cell>
                              <Table.Cell>{x.status}</Table.Cell>
                              <Table.Cell>{x.bugetSubHeadMonth}</Table.Cell>
                              <Table.Cell>{x.amount}</Table.Cell>
                          </Table.Row>
                      ))}
                  </Table.Body>
              </Table>
          </div>
      </div>
  )
}

export default Budgetleadger