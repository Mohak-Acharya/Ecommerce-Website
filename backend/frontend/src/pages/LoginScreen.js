import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';
import { login } from '../actions/userActions';

const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const dispatch = useDispatch();

  const redirect = location.search ? location.search.split('=')[1] : '/';

  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, pass));
  };

  return (
    <FormContainer>
      <h1>Sign In</h1>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
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
              required
              autoComplete="true"
              type="password"
              placeholder="Enter password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}></Form.Control>
            <Form.Label>Password</Form.Label>
          </div>
        </Form.Group>

        <Button type="submit" variant="primary" className="btn-lg">
          Sign In
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          {' '}
          Need an account ?{' '}
          <Link to={`/register?redirect=${redirect}`}> Sign Up </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
