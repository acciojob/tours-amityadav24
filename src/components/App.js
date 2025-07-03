import React, { useState, useEffect } from "react";

const url = "https://course-api.com/react-tours-project";

const Loading = () => {
  return (
    <div className="loading">
      <h2>Loading...</h2>
    </div>
  );
};

const Tour = ({ id, image, info, price, name, removeTour }) => {
  const [readMore, setReadMore] = useState(false);

  return (
    <article className="single-tour">
      <img src={image} alt={name} />
      <footer>
        <div className="tour-info">
          <h4>{name}</h4>
          <h4 className="tour-price">${price}</h4>
        </div>
        <p>
          {readMore ? info : `${info.substring(0, 200)}...`}
          <button onClick={() => setReadMore(!readMore)}>
            {readMore ? "See less" : "Show more"}
          </button>
        </p>
        <button className="delete-btn" onClick={() => removeTour(id)}>
          Not Interested
        </button>
      </footer>
    </article>
  );
};

const Tours = ({ tours, removeTour }) => {
  return (
    <section>
      {tours.map((tour) => (
        <Tour key={tour.id} {...tour} removeTour={removeTour} />
      ))}
    </section>
  );
};

const App = () => {
  const [loading, setLoading] = useState(true);
  const [tours, setTours] = useState([]);

  const fetchTours = async () => {
    setLoading(true);
    try {
      const response = await fetch(url);
      const tours = await response.json();
      setTours(tours);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching tours:", error);
    }
  };

  useEffect(() => {
    fetchTours();
  }, []);

  const removeTour = (id) => {
    setTours(tours.filter((tour) => tour.id !== id));
  };

  if (loading) {
    return (
      <main id="main">
        <Loading />
      </main>
    );
  }

  if (tours.length === 0) {
    return (
      <main id="main">
        <div className="title">
          <h2>No more tours</h2>
          <button className="btn" onClick={fetchTours}>
            Refresh
          </button>
        </div>
      </main>
    );
  }

  return (
    <main id="main">
      <h1 className="title">Our Tours</h1>
      <Tours tours={tours} removeTour={removeTour} />
    </main>
  );
};

export default App;
