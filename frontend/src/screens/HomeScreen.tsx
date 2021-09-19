/* dependencies */
import React, { useState, useEffect } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import axios from "axios";

/* components */
import { products } from "../products";
import Product from "../components/Product";

/* Actions */
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../actions/productActions";

/* Types */
import { Props } from "../components/Product";

const HomeScreen = () => {
  const [state, setState] = useState([]);
  const dispatch = useDispatch();
  const { products, error, loading } = useSelector(
    (state: any) => state.productsReducer
  );

  console.log("state results below:");
  console.log(loading);
  console.log(products);
  console.log(`my err :${error}`);

  useEffect(() => {
    console.log("Get products below:");
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <div>
      {loading && <h1>loading...</h1>}
      {error && <h3>{error}</h3>}
      {products && (
        <Row>
          {products?.map((item: any) => (
            <Col key={item._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={item} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default HomeScreen;
