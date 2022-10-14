import React from 'react'
import { Form, Input, TextArea, Button, Select } from 'semantic-ui-react'

const genderOptions = [
  { key: 'm', text: 'Male', value: 'male' },
  { key: 'f', text: 'Female', value: 'female' },
  { key: 'o', text: 'Other', value: 'other' },
]
const [isDrawerOpen, setIsDrawerOpen] = useState(false);
const [windowSize, setWindowSize] = useState(getWindowSize());

const CompanyDetails = () => (
  <Form>
    <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        variant={windowSize.innerWidth <= "750" ? "temporary" : "permanent"}
      ></Drawer>
    <Form.Group widths='equal'>
      <Form.Field
        id='form-input-control-first-name'
        control={TextArea}
        label='First name'
        placeholder='First name'
      />
      <Form.Field
        id='form-input-control-location'
        control={TextArea}
        label='Location'
        placeholder='Location'
      />
     
   
    <Form.Field
      id='form-textarea-control-address-line1'
      control={TextArea}
      label='Address Line 1'
      placeholder='Address Line 1'
    />
    <Form.Field
      id='form-textarea-control-address-line2'
      control={TextArea}
      label='Address Line 2'
      placeholder='Address Line 2'
    />
    <Form.Field
        id='form-input-control-city'
        control={TextArea}
        label='City'
        placeholder='City'
      />
      <Form.Field
        id='form-input-control-state'
        control={TextArea}
        label='State'
        placeholder='State'
      />
      <Form.Field
        id='form-input-control-pincode'
        control={TextArea}
        label='Pincode'
        placeholder='Pincode'
      />
    <Form.Field
        id='form-input-control-country'
        control={TextArea}
        label='Country'
        placeholder='Country'
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

export default CompanyDetails
