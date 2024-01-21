import React, {useRef, useState} from 'react'
import { Form, Button, Card, FormGroup, Alert } from 'react-bootstrap'
import './auth.css';
import { useAuth } from '../../contexts/AuthContexts';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {

  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [ error, setError ] = useState('')
  const [ loading, setLoading ] = useState(false)
  const navigateTo = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()

    try {
        setError('')
        setLoading(true)
        await login(emailRef.current.value, passwordRef.current.value)
        navigateTo('/');
    } catch(error) {
        console.log("Failed to sign in", error);
        setError("Failed to sign in");
    }
    setLoading(false)
   
  }

  return (
    <>

      <Card className='auth-card'>
        <Card.Body>
            <h2 className='text-center mb-4'>Log In</h2>            
            {error && <Alert variant="danger">{error}</Alert>}        
        <Form onSubmit={handleSubmit}>
            <FormGroup id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" ref={emailRef} required autoComplete="username email"></Form.Control>
            </FormGroup>
            <FormGroup id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" ref={passwordRef} required autoComplete="current-password"></Form.Control>
            </FormGroup>            
            <Button disabled={loading} type='submit' className='w-100 btn'>Log In</Button>
        </Form>
        <div className='w-100 text-center mt-3'>
          <Link to="/forgot-password">Forgot Password</Link>
        </div>
        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2'>
        Need an account? <Link to={"/signup"}>Sign Up</Link>
      </div>
    </>
  )
}
