import React, { useEffect } from 'react';
import { Button, Image, Card, ListGroup, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Message from '../components/Message';
import ProgressBar from '../constants/ProgressBar';
import { createOrder } from '../actions/orderActions';
import { ORDER_RESET } from '../constants/orderConstants';

const PlaceOrderScreen = ({ history }) => {

  const orderCreate = useSelector(state => state.orderCreate)
  const {order, error, success} = orderCreate

  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart);
  cart.itemsPrice = cart.cartItems.reduce((acc, item) => acc + item.price*item.qty, 0).toFixed(2)  

  cart.shippingPrice = (cart.itemsPrice > 100 ? 0 : 10).toFixed(2)
  cart.taxPrice = Number(0.082 * cart.itemsPrice).toFixed(2)
  cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2)

  if(!cart.paymentMethod)
  {
    history.push('/payment')
  }

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
      dispatch({type : ORDER_RESET})
    }
  }, [success, history, order, dispatch]);


  const placeOrder = () => {
      dispatch(
        createOrder({
          orderItems: cart.cartItems,
          shippingAddress: cart.shippingAddress,
          paymentMethod: cart.paymentMethod,
          itemsPrice: cart.itemsPrice,
          shippingPrice: cart.shippingPrice,
          taxPrice: cart.taxPrice,
          totalPrice: cart.totalPrice,
        })
      );
  }
  return (
    <div>
      <ProgressBar step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping Address</h2>

              <p>
                <strong>Shipping: </strong>
                {cart.shippingAddress.address}, {cart.shippingAddress.city}{' '}
                {cart.shippingAddress.zipcode}, {cart.shippingAddress.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>

              <p>
                <strong>Method: </strong>
                {cart.paymentMethod}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Ordered Items</h2>

              {cart.cartItems.length === 0 ? (
                <Message variant="info">Your cart is Empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((item, index) => {
                    return (
                      <ListGroup.Item key={index}>
                        <Row>
                          <Col md={2}>
                            <Image
                              src={item.image}
                              alt={item.name}
                              fluid
                              rounded
                            />
                          </Col>

                          <Col>
                            <Link to={`/product/${item.product}`}>
                              {item.name}
                            </Link>
                          </Col>

                          <Col md={4}>
                            {item.qty} &times; ${item.price} = $
                            {(item.qty * item.price).toFixed(2)}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    );
                  })}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>
                    <b>Items:</b>
                  </Col>
                  <Col>${cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>
                    <b>Shipping:</b>
                  </Col>
                  <Col>${cart.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>
                    <b>Tax:</b>
                  </Col>
                  <Col>${cart.taxPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>
                    <b>Total:</b>
                  </Col>
                  <Col>${cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>

              {error ? (<ListGroup.Item>
                {error && <Message variant="danger">{error}</Message>}
              </ListGroup.Item>) : (
                <React.Fragment />
              )}
              
              <ListGroup.Item className="d-grid gap-2">
                  <Button
                    type="button"
                    className="btn-lg"
                    disabled={cart.cartItems === 0}
                    onClick={placeOrder}>
                    Place Order
                  </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default PlaceOrderScreen;
