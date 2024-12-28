import React, { useEffect, useState } from "react";
import axios from "axios";
import CourseCard from "../components/CourseCard.jsx";
import "../LandingPage.css";

const LandingPage = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/courses");
        setCourses(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCourses();
  }, []);

  return (
    <div className="landing-page">
      
      <nav className="navbar">
        <img src="/LogoBridge.png" alt="Logo" />
      </nav>

      
      <div className="hero-section">
        <img src="/bridge.png" alt="Hero" />
        <div className="hero-overlay">
          <h2>Improve your skills on your own</h2>
          <h2>To prepare for a better future</h2>
          <button>REGISTER NOW</button>
        </div>
      </div>

      
      <div>
        <div className="courses-head">
          <h1>Discover Our Courses</h1>
          <button>View More</button>
        </div>
        <div className="courses-grid">
          {courses.map((course) => (
            <CourseCard key={course._id} {...course} />
          ))}
        </div>
      </div>

     
      <div className="contact-form">
        <h1>Contact Us</h1>
        <form>
          <p>NAME</p>
          <input type="text" placeholder="Jiara Martins" required />
          <p>EMAIL</p>
          <input
            type="email"
            placeholder="hello@reallygreatsite.com"
            required
          />
          <p>MESSAGE</p>
          <textarea placeholder="Write your message here" rows="4" required />
          <button type="submit">Send the message</button>
        </form>
      </div>
    </div>
  );
};

export default LandingPage;
