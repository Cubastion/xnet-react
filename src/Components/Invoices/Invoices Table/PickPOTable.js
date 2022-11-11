import { Box, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Table } from "semantic-ui-react";
import { tokenRequestOption } from "../../Helpers/misellaneous";
const PickPOTable = (props) => {
  const [projectPOs, setProjectPOs] = useState("");
  const [internalSelection, setInternalSelection] = useState("")
  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = `https://devxnet.cubastion.net/api/v1/purchaseOrder/findByProjectId?id=${props.projectId}`;

        const response = await fetch(url, tokenRequestOption());

        const json = await response.json();
        setProjectPOs(json.data);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, []);

  const selectPOFunction = (x) => {
    setInternalSelection(x)
    
  };

  const addSelectedPO = ()=>{
    props.setSelectedProjectPOs(internalSelection);
    props.closeModal(false)
  }

  return (
    <Box>
      <div
        style={{
          margin: "15rem 27rem 5rem 27rem",
          padding: "2rem",
          backgroundColor: "white",
          height: "14rem",
        }}
      >
        <Table striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>PO#</Table.HeaderCell>
              <Table.HeaderCell>Description</Table.HeaderCell>
            </Table.Row>
            {projectPOs &&
              projectPOs.map((x) => (
                <Table.Row
                  onClick={() => selectPOFunction(x)}
                  key={x.Id}
                  style={internalSelection.Id === x.Id?{backgroundColor:"lightgrey"}:{}}
                >
                  <Table.Cell>{x.po}</Table.Cell>
                  <Table.Cell>{x.description}</Table.Cell>
                </Table.Row>
              ))}
          </Table.Header>
          <Table.Body></Table.Body>
        </Table>

        <div style={{ display: "flex", flexDirection: "flex-end" }}>
          <Button disabled={!internalSelection} onClick={addSelectedPO}>Add</Button>
          <Button onClick={()=>props.closeModal(false)}>Cancel</Button>
        </div>
      </div>
    </Box>
  );
};

export default PickPOTable;
