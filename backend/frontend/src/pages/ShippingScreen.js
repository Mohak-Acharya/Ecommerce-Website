import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import ProgressBar from '../constants/ProgressBar';
import { saveShippingAddress } from '../actions/cartActions';

const ShippingScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [zipcode, setZipCode] = useState(shippingAddress.zipcode);
  const [country, setCountry] = useState(shippingAddress.country);


  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, zipcode, country }));
    history.push('/payment');
  };

  return (
    <FormContainer>
      <ProgressBar step1 step2 />
      <h1>Shipping</h1>
      <Form onSubmit={(e) => submitHandler(e)}>
        <Form.Group controlId="address">
          <div className="form-floating mb-3">
            <Form.Control
              required
              type="text"
              placeholder="Enter address"
              value={address ? address : ''}
              onChange={(e) => setAddress(e.target.value)}></Form.Control>
            <Form.Label>Address</Form.Label>
          </div>
        </Form.Group>

        <Form.Group controlId="city">
          <div className="form-floating mb-3">
            <Form.Control
              required
              type="text"
              placeholder="Enter city"
              value={city ? city : ''}
              onChange={(e) => setCity(e.target.value)}></Form.Control>
            <Form.Label>City</Form.Label>
          </div>
        </Form.Group>

        <Form.Group controlId="zipcode">
          <div className="form-floating mb-3">
            <Form.Control
              required
              type="text"
              placeholder="Enter zip code"
              value={zipcode ? zipcode : ''}
              onChange={(e) => setZipCode(e.target.value)}></Form.Control>
            <Form.Label>Postal Code</Form.Label>
          </div>
        </Form.Group>

        <Form.Group controlId="country">
          <div className="form-floating mb-3">
            <Form.Control
              required
              type="text"
              placeholder="Enter country"
              value={country ? country : ''}
              onChange={(e) => setCountry(e.target.value)}></Form.Control>
            <Form.Label>Country</Form.Label>
          </div>
        </Form.Group>

        <Button type="submit" className="btn-lg">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingScreen;
