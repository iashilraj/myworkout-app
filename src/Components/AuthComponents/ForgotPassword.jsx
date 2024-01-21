import React, {useRef, useState} from 'react'
import { Form, Button, Card, FormGroup, Alert } from 'react-bootstrap'
import './auth.css';
import { useAuth } from '../../contexts/AuthContexts';
import { Link } from 'react-router-dom';

export default function ForgotPassword() {

  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [ error, setError ] = useState('')
  const [ loading, setLoading ] = useState(false)
  const [ message, setMessage ] = useState("")

  async function handleSubmit(e) {
    e.preventDefault()

    try {
        setMessage("")
        setError('')
        setLoading(true)
        await resetPassword(emailRef.current.value)
        setMessage('Check your inbox for further instructions')
    } catch(error) {
        console.log("Failed to sign in", error);
        setError("Failed to reset password");
    }
    setLoading(false)
   
  }

  return (
    <>

      <Card className='auth-card'>
        <Card.Body>
            <h2 className='text-center mb-4'>Password reset</h2>            
            {error && <Alert variant="danger">{error}</Alert>}
            {message && <Alert variant="success">{message}</Alert>}
        <Form onSubmit={handleSubmit}>
            <FormGroup id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" ref={emailRef} required autoComplete="username email"></Form.Control>
            </FormGroup>         
            <Button disabled={loading} type='submit' className='w-100 btn'>Reset Password</Button>
        </Form>
        <div className='w-100 text-center mt-3'>
          <Link to="/login">Login</Link>
        </div>
        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2'>
        Need an account? <Link to={"/signup"}>Sign Up</Link>
      </div>
    </>
  )
}
