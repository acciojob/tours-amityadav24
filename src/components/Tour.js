import React, { useState } from "react";

const Tour = ({ id, image, info, price, name, removeTour }) => {
  const [readMore, setReadMore] = useState(false);

  return (
    <article className="single-tour">
      <img src={image} alt={name} />
      <div>
        <h4>{name}</h4>
        <h4 className="tour-price">${price}</h4>
      </div>
      <p className="tour-info">
        {readMore ? info : `${info.substring(0, 200)}... `}
        <button onClick={() => setReadMore(!readMore)}>
          {readMore ? "See less" : "Show more"}
        </button>
      </p>
      <button className="delete-btn" onClick={() => removeTour(id)}>
        Remove
      </button>
    </article>
  );
};

export default Tour;
