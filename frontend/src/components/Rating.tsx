import React from "react";

interface Props {
  value: number;
  text: number;
  color: string;
}

const Rating = ({ value, text, color }: Props) => {
  return (
    <div className="rating">
      <div>
        {[1, 2, 3, 4, 5].map((i) =>
          value >= i ? (
            <span key={i}>
              <i style={{ color }} className={"fa fa-star"} />
            </span>
          ) : value === i - 0.5 ? (
            <span key={i}>
              <i style={{ color }} className={"fas fa-star-half-alt"} />
            </span>
          ) : (
            <span key={i}>
              <i style={{ color }} className={"far fa-star"} />
            </span>
          )
        )}
      </div>
    </div>
  );
};

export default Rating;
