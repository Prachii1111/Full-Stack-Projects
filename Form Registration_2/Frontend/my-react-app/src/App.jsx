import React, { useState } from "react";

const App = () => {
  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    Email: "",
    Gender: "",
    Phone: "",
    Password: "",
    City: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Submitting formData:", formData);

    try {
      const res = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      alert(data.message);

      setFormData({
        FirstName: "",
        LastName: "",
        Email: "",
        Gender: "",
        Phone: "",
        Password: "",
        City: "",
      });

    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Registration Form</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="FirstName"
          value={formData.FirstName}
          placeholder="First Name"
          onChange={handleChange}
        />{" "}
        <br />
        <br />
        <input
          name="LastName"
          value={formData.LastName}
          placeholder="Last Name"
          onChange={handleChange}
        />{" "}
        <br />
        <br />
        <input
          name="Email"
          value={formData.Email}
          placeholder="Email"
          onChange={handleChange}
        />{" "}
        <br />
        <br />
        <input
          name="Gender"
          value={formData.Gender}
          placeholder="Gender"
          onChange={handleChange}
        />{" "}
        <br /> <br />
        <input
          name="Phone"
          value={formData.Phone}
          placeholder="Phone"
          onChange={handleChange}
        />{" "}
        <br /> <br />
        <input
          name="Password"
          type="password"
          value={formData.Password}
          placeholder="Password"
          onChange={handleChange}
        />{" "}
        <br /> <br />
        <input
          name="City"
          value={formData.City}
          placeholder="City"
          onChange={handleChange}
        />{" "}
        <br /> <br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default App;
