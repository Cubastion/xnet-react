import React from 'react'
import { Form, Input, TextArea, Button, Select } from 'semantic-ui-react'

const [isDrawerOpen, setIsDrawerOpen] = useState(false);
const [windowSize, setWindowSize] = useState(getWindowSize());

const BankDetails = () => (
  <Form>
    <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        variant={windowSize.innerWidth <= "750" ? "temporary" : "permanent"}
      ></Drawer>
    <Form.Group widths='equal'>
      <Form.Field
        id='form-input-control-pan'
        control={TextArea}
        label='PAN'
        placeholder='PAN'
      />
      <Form.Field
        id='form-input-control-gst'
        control={TextArea}
        label='GST'
        placeholder='GST'
      />
     
   
    <Form.Field
      id='form-textarea-control-account-number'
      control={TextArea}
      label='Account Number'
      placeholder='Account Number'
    />
    <Form.Field
      id='form-textarea-control-ifsc-code'
      control={TextArea}
      label='IFSC Code'
      placeholder='IFSC Code'
    />
    <Form.Field
        id='form-input-control-bank-details'
        control={TextArea}
        label='Bank Detail'
        placeholder='Bank Details'
      />
      <Form.Field
        id='form-input-control-bank-name'
        control={TextArea}
        label='Bank Name'
        placeholder='Bank Name'
      />
      
      
    
      <Form.Field
      id='form-button-control-public'
      control={Button}
      content='Add'
      label='Label with htmlFor'
    />
    <Form.Field
      id='form-button-control-public'
      control={Button}
      content='Cancel'
      label='Label with htmlFor'
    />
    </Form.Group>
  </Form>
)

export default BankDetails