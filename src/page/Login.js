import React from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useNavigate } from 'react-router-dom'

const Login = ({ setAuthentication}) => {
  const navigate = useNavigate();
  const loginUser = (event) => {
    event.preventDefault();
    setAuthentication(true);
    navigate('/');
  }
  return (
    <div style={{ backgroundColor: 'gray', width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center'}}>
      <Form style={{ padding: '20px', width: '300px', border: '1 solid black' }} onSubmit={loginUser}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label style={{ fontWeight: '800' }}>Username</Form.Label>
          <Form.Control type="name" placeholder="Not Applicable" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label style={{ fontWeight: '800' }}>Password</Form.Label>
          <Form.Control type="password" placeholder="Not Applicable" />
        </Form.Group>
        <Button variant="danger" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default Login