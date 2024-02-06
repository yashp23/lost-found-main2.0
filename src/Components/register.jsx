import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: null,
    objectName: "",
    location: "",
    date: "",
  });

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("username", formData.username);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("password", formData.password);
      formDataToSend.append("confirmPassword", formData.confirmPassword);
      formDataToSend.append("image", formData.image);
      formDataToSend.append("objectName", formData.objectName);
      formDataToSend.append("location", formData.location);
      formDataToSend.append("date", formData.date);

      const response = await axios.post("/register", formDataToSend);
      console.log(response.data);
      // Redirect or show success message
    } catch (error) {
      console.error(error.response.data);
      // Show error message
    }
  };

  return (
    <>
    <Navbar/>
      <div className="lostitem_page">
        <div id="green_el"></div>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        <input type="file" name="image" onChange={handleChange} />
        <label htmlFor="objectName">Object Name:</label>
        <br />
        <input
          type="text"
          id="objectName"
          name="objectName"
          value={formData.objectName}
          onChange={handleChange}
          required
        />
        <br />
        <label htmlFor="location">Location:</label>
        <br />
        <input
          type="text"
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
        />
        <br />
        <label htmlFor="date">Date (YYYY-MM-DD):</label>
        <br />
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
        <br />
        <br />
        <button type="submit">Register</button>
      </form>
    </>
  );
};

function Navbar() {
  const Navigate = useNavigate();
  return (
    <div className="navbar">
      <img src="/imgs/logo.jpg" alt="Logo" />
      <nav id="menu">
        <menu onClick={() => Navigate("/register")}>Register</menu>
        <menu onClick={() => Navigate("/lost-items")}>Lost-Items</menu>
        <menu onClick={() => Navigate("/")}>Home</menu>
      </nav>
    </div>
  );
}

export default RegisterForm;
