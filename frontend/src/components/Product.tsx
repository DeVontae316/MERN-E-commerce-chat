import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

import Rating from "./Rating";

export interface Props {
  product: {
    _id: string | never;
    name: string | never;
    image: string | never;
    description: string | never;
    brand: string | never;
    category: string | never;
    price: number | never;
    countInStock: number | never;
    rating: number | never;
    numReviews: number | never;
  };
}

const Product = ({ product }: Props) => {
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/product/${product?._id}`}>
        <Card.Img src={product?.image} variant="bottom" />
      </Link>
      <Card.Body>
        <Link to={`/product/${product?._id}`}>
          <Card.Title>
            <strong>{product?.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as="div">
          <Rating
            color={"#f1c40f"}
            value={product.rating}
            text={product.numReviews}
          />
        </Card.Text>

        <Card.Text as="h3">${product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
