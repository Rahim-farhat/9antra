import React, { useEffect, useState } from "react";
import axios from "axios";
import "../AdminPage.css";
import CourseCard from "../components/CourseCard.jsx";

const AdminPage = () => {
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({ title: "", price: "", image: null });
  const [isEditing, setIsEditing] = useState(false);
  const [currentCourseId, setCurrentCourseId] = useState(null);


  useEffect(() => {
    const fetchCourses = async () => {
      const res = await axios.get("http://localhost:5000/api/courses");
      setCourses(res.data);
    };
    fetchCourses();
  }, []);

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("price", form.price);
    if (form.image) formData.append("image", form.image);

    try {
      if (isEditing) {
        
        await axios.put(
          `http://localhost:5000/api/courses/${currentCourseId}`,
          formData
        );
        alert("Course updated successfully");
      } else {
        
        await axios.post("http://localhost:5000/api/courses", formData);
        alert("Course created successfully");
      }
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };


  const handleEdit = (course) => {
    setIsEditing(true);
    setCurrentCourseId(course._id);
    setForm({ title: course.title, price: course.price, image: null });
  };


  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/courses/${id}`);
      alert("Course deleted successfully");
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="admin-page">
      <nav className="navbar" id="target">
        <img src="/LogoBridge.png" alt="Logo" />
        <h1>Admin Panel</h1>
      </nav>

      <form onSubmit={handleSubmit} className="form-container">
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="form-input"
        />
        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          className="form-input"
        />
        <input
          type="file"
          onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
          className="form-input"
        />
        <button type="submit" className="buttons">
          {isEditing ? "Update Course" : "Add Course"}
        </button>
      </form>

      <div className="courses-grid">
        {courses.map((course) => (
          <div key={course._id}>
            <CourseCard key={course._id} {...course} />
            <a href="#target">
              <button className="buttons" onClick={() => handleEdit(course)}>
                Edit
              </button>
            </a>
            <a href="#target">
              <button
                className="buttons"
                onClick={() => handleDelete(course._id)}
              >
                Delete
              </button>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPage;
