import React from 'react'
import { Form, TextArea, Button } from 'semantic-ui-react'


const BankDetails = () => (
        <Form>
        <Form.Group widths='inline'>
          <Form.Input fluid label='PAN' placeholder='PAN' />
          <Form.Input fluid label='GST' placeholder='GST' />
        </Form.Group>
        <Form.Group widths='inline'>
          <Form.Input fluid label='ACCOUNT NUMBER' placeholder='ACCOUNT NUMBER' />
          <Form.Input fluid label='IFSC CODE' placeholder='IFSC CODE' />
        </Form.Group>
        <Form.Group widths='inline'>
          <Form.Input fluid label='BANK NAME' placeholder='BANK NAME' />
          <Form.Input fluid label='BANK BRANCH' placeholder='BANK BRANCH' />
        </Form.Group>
        <Form.Button>Submit</Form.Button>
      </Form>
)

export default BankDetails