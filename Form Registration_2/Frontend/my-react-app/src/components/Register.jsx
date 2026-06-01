import { useState } from "react";

const initialState = {
  FirstName: "",
  LastName: "",
  Email: "",
  Gender: "",
  Phone: "",
  Password: "",
  City: "",
};

const Register = () => {
  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch("http://localhost:3000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    alert("User Registered ✅");
    setFormData(initialState);
  };

  return (
    <div>
      <h2>Register</h2>

      <form onSubmit={handleSubmit}>
        <input name="FirstName" value={formData.FirstName} onChange={handleChange} placeholder="First Name" /><br /><br />
        <input name="LastName" value={formData.LastName} onChange={handleChange} placeholder="Last Name" /><br /><br />
        <input name="Email" value={formData.Email} onChange={handleChange} placeholder="Email" /><br /><br />
        <input name="Gender" value={formData.Gender} onChange={handleChange} placeholder="Gender" /><br /><br />
        <input name="Phone" value={formData.Phone} onChange={handleChange} placeholder="Phone" /><br /><br />
        <input name="Password" type="password" value={formData.Password} onChange={handleChange} placeholder="Password" /><br /><br />
        <input name="City" value={formData.City} onChange={handleChange} placeholder="City" /><br /><br />

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;