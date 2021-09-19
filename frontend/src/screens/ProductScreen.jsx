import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Col,
  Image,
  Row,
  ListGroup,
  Card,
  Button,
  Container,
  Form,
} from "react-bootstrap";
import { useParams, useHistory } from "react-router-dom";
import Rating from "../components/Rating";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../actions/productActions";
import { addItemToCart } from "../actions/cartActions";

const ProductScreen = () => {
  const [qty, setQty] = useState(1);
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  const { product, loading, error } = useSelector(
    (state) => state.productReducer
  );

  console.log("state below:");
  console.log(product);

  useEffect(() => {
    dispatch(getProduct(id));
  }, [dispatch]);

  const addToCart = () => {
    dispatch(addItemToCart(id, qty));
    history.push(`/cart/${id}`);
  };

  return (
    console.log(`qty selected:${qty}`) || (
      <div>
        <h1>Test</h1>

        {loading && <h1>Loading...</h1>}
        {error && <h3>{error}</h3>}

        {product && (
          <Row>
            <Col lg={4}>
              <Image src={product?.image} fluid />
            </Col>

            <Col lg={4}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h1>{product?.name} </h1>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product?.rating}
                    color="#f1c40f"
                    text={product?.numReviews}
                  />
                </ListGroup.Item>
                <ListGroup.Item>${product?.price}</ListGroup.Item>
                <ListGroup.Item>{product?.description}</ListGroup.Item>
              </ListGroup>
            </Col>

            <Col lg={4}>
              <Card>
                <ListGroup>
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>${product?.price}</Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product?.countInStock > 0
                          ? "In Stock"
                          : "Not in stock"}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty:</Col>
                        <Col>
                          <Form.Control
                            value={qty}
                            as="select"
                            onChange={(e) => setQty(parseInt(e.target.value))}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (quantity) => (
                                <option key={quantity + 1} value={quantity + 1}>
                                  {quantity + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                    <Button
                      onClick={addToCart}
                      className="btn-block"
                      type="button"
                      disabled={product?.countInStock === 0}
                      style={{
                        width: "100%",
                      }}
                    >
                      Add to Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        )}
      </div>
    )
  );
};

export default ProductScreen;
