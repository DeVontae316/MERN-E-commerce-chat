import React, { useEffect, useState } from "react";
import { addItemToCart, deleteCartItem } from "../actions/cartActions";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useHistory } from "react-router-dom";
import { Col, ListGroup, Row, Image, Form, Button } from "react-bootstrap";

const CartScreen = ({ match, location }) => {
  const id = match.params.id;
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;
  const history = useHistory();

  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cartReducer);

  console.log("cart reducer state below:");
  console.log(cartItems ? cartItems : "waiting..");

  const handleDeleteItem = (id) => {
    console.log(`item:${id} will be deleted from our state`);
    dispatch(deleteCartItem(id));
  };
  const checkOutHandler = () => {
    console.log(`checking out`);
    history.push("/login?redirect=shipping");
  };
  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <h1>
            Cart Empty:<Link to="/">Go Back</Link>
          </h1>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={item._id}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} rounded fluid />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item._id}`}>{item?.name}</Link>
                  </Col>
                  <Col>
                    <Row>{item.price}</Row>
                  </Col>
                  <Col md={2}>
                    <Form.Control
                      as="select"
                      value={item?.qty}
                      onChange={(e) =>
                        dispatch(
                          addItemToCart(item._id, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((quantity) => (
                        <option key={quantity + 1} value={quantity + 1}>
                          {quantity + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>

                  <Col md={2}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => handleDeleteItem(item._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <ListGroup>
          <ListGroup.Item>
            <h4>
              Total items:
              {cartItems.reduce((acc, item) => {
                return acc + item.qty;
              }, 0)}
            </h4>
          </ListGroup.Item>
          <ListGroup.Item>
            <h4>
              Total price: $
              {cartItems
                .reduce((acc, item) => {
                  return acc + item.qty * item.price;
                }, 0)
                .toFixed(2)}
            </h4>
          </ListGroup.Item>
          <ListGroup.Item>
            <Button
              type="button"
              className="btn-block"
              onClick={checkOutHandler}
              disabled={cartItems.length === 0}
            >
              Procced to checkout
            </Button>
          </ListGroup.Item>
        </ListGroup>
      </Col>
      {/*  <Col md={2}></Col> */}
    </Row>
  );
};

export default CartScreen;
