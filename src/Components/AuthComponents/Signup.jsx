import React, {useRef, useState} from 'react'
import { Form, Button, Card, FormGroup, Alert } from 'react-bootstrap'
import './auth.css';
import { useAuth } from '../../contexts/AuthContexts';
import { Link, useNavigate } from 'react-router-dom';

export default function Signup() {

  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [ error, setError ] = useState('')
  const [ loading, setLoading ] = useState(false)
  const navigateTo = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault()

    if(passwordRef.current.value !== passwordConfirmRef.current.value) {
        return setError("Passwords do not match")
    }

    try {
        setError('')
        setLoading(true)
        await signup(emailRef.current.value, passwordRef.current.value)
        navigateTo('/');
    } catch(error) {
        console.log("Failed to create an account:", error);
        setError("Failed to create an account");
    }
    setLoading(false)
   
  }

  return (
    <>
      <Card className='auth-card'>
        <Card.Body>
            <h2 className='text-center mb-4'>Sign Up</h2>            
            {error && <Alert variant="danger">{error}</Alert>}        
        <Form onSubmit={handleSubmit}>
            <FormGroup id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" ref={emailRef} required autoComplete="username email"></Form.Control>
            </FormGroup>
            <FormGroup id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" ref={passwordRef} required autoComplete="new-password"></Form.Control>
            </FormGroup>
            <FormGroup id="password-confirma">
                <Form.Label>Password Confirmation</Form.Label>
                <Form.Control type="password" ref={passwordConfirmRef} required autoComplete="new-password"></Form.Control>
            </FormGroup>
            <Button disabled={loading} type='submit' className='w-100 btn'>Sign Up</Button>
        </Form>
        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2'>
        Already have an account? <Link to={"/login"}>Log In</Link>
      </div>
    </>
  )
}
