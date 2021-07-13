import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';
import { register } from '../actions/userActions';

const RegisterScreen = ({ location, history }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [confirmpass, setConfirmPass] = useState('');
  const [message, setMessage] = useState('');

  const dispatch = useDispatch();

  const redirect = location.search ? location.search.split('=')[1] : '/';

  const userRegister = useSelector((state) => state.userRegister);
  const { error, loading, userInfo } = userRegister;

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (pass !== confirmpass) {
      setMessage('Passwords do not match!');
    } else {
      dispatch(register(name, email, pass));
    }
  };
  return (
    <FormContainer>
      <h1>Register Yourself</h1>
      {message && <Message variant="danger">{message}</Message>}
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name">
          <div className="form-floating mb-3">
            <Form.Control
              required
              type="name"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}></Form.Control>
            <Form.Label>Name</Form.Label>
          </div>
        </Form.Group>

        <Form.Group controlId="email">
          <div className="form-floating mb-3">
            <Form.Control
              required
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}></Form.Control>
            <Form.Label>Email address</Form.Label>
          </div>
        </Form.Group>

        <Form.Group controlId="password">
          <div className="form-floating mb-3">
            <Form.Control
              autoComplete="true"
              required
              type="password"
              placeholder="Enter password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}></Form.Control>
            <Form.Label>Password</Form.Label>
          </div>
        </Form.Group>

        <Form.Group controlId="passwordConfirm">
          <div className="form-floating mb-3">
            <Form.Control
              autoComplete="true"
              required
              type="password"
              placeholder="Confirm password"
              value={confirmpass}
              onChange={(e) => setConfirmPass(e.target.value)}></Form.Control>
            <Form.Label>Confirm Password</Form.Label>
          </div>
        </Form.Group>

        <Button type="submit" variant="primary" className="btn-lg">
          Register
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          {' '}
          Already have an account ?{' '}
          <Link to={`/login?redirect=${redirect}`}> Sign In </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
