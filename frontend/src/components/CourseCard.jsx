import React from 'react';
import '../CourseCard.css'; // Add styles

const CourseCard = ({ title, price, image }) => {
  return (
    <div className="col-md-4 mb-4">
      <div className="card">
        <img src={`http://localhost:5000/${image}`} className="card-img-top" alt={title} />
        <div className="card-body">
          <h2 className="card-title">{title}</h2>
          <h3 className="card-text">{price} DT / Month</h3>
        </div>
      </div>
    </div>
  );
};


export default CourseCard;
