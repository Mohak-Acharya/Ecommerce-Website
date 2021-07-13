import React, { useState } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import ProgressBar from '../constants/ProgressBar';
import { savePayment } from '../actions/cartActions';

const PaymentScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const { shippingAddress } = cart;

  const [payment, setPayment] = useState('PayPal');

  if (!shippingAddress.address) {
    history.push('/shipping');
  }

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePayment(payment));
    history.push('/placeorder');
  };

  return (
    <FormContainer>
      <ProgressBar step1 step2 step3 />

      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as="legend">Select Payment Method</Form.Label>

          <Col>
            <Form.Check
              type="radio"
              label="PayPal or Credit Card"
              id="paypal"
              name="paymentmethod"
              checked
              onChange={(e) => setPayment(e.target.value)}></Form.Check>
          </Col>
        </Form.Group>

        <Button type="submit" className="btn-lg">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen;
