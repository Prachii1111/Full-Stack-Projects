// /* eslint-disable react-hooks/set-state-in-effect */
// import React, { useState, useEffect } from "react";

// const initialState = {
//   FirstName: "",
//   LastName: "",
//   Email: "",
//   Gender: "",
//   Phone: "",
//   Password: "",
//   City: "",
// };

// const App = () => {

//   const [formData, setFormData] = useState(initialState)
//   const [users, setUsers] = useState([]);

//   // fetch users
//   const fetchUsers = async () => {
//     try {
//       const res = await fetch("http://localhost:3000/users");
//       const data = await res.json();
//       setUsers(data);
//     } catch(error) {
//       console.log("Error fetching users:", error);
//     }
//   };

//   // load users on page load
//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     console.log("Submitting formData:", formData);

//     try {
//       const res = await fetch("http://localhost:3000/register", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       const data = await res.json();
//       alert(data.message);

//       setFormData(initialState);

//       // refresh user list
//       fetchUsers();

//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   return (
//     <div style={{ textAlign: "center", marginTop: "50px" }}>
//       <h2>Registration Form</h2>

//       <form onSubmit={handleSubmit}>
//         <input
//           name="FirstName"
//           value={formData.FirstName}
//           placeholder="First Name"
//           onChange={handleChange}
//         />{" "}
//         <br />
//         <br />
//         <input
//           name="LastName"
//           value={formData.LastName}
//           placeholder="Last Name"
//           onChange={handleChange}
//         />{" "}
//         <br />
//         <br />
//         <input
//           name="Email"
//           value={formData.Email}
//           placeholder="Email"
//           onChange={handleChange}
//         />{" "}
//         <br />
//         <br />
//         <input
//           name="Gender"
//           value={formData.Gender}
//           placeholder="Gender"
//           onChange={handleChange}
//         />{" "}
//         <br /> <br />
//         <input
//           name="Phone"
//           value={formData.Phone}
//           placeholder="Phone"
//           onChange={handleChange}
//         />{" "}
//         <br /> <br />
//         <input
//           name="Password"
//           type="password"
//           value={formData.Password}
//           placeholder="Password"
//           onChange={handleChange}
//         />{" "}
//         <br /> <br />
//         <input
//           name="City"
//           value={formData.City}
//           placeholder="City"
//           onChange={handleChange}
//         />{" "}
//         <br /> <br />
//         <button type="submit">Register</button>
//       </form>

//       <hr/>

//       <h2>Users List</h2>

//       {users.length === 0 ? (
//         <p>No users found</p>
//       ) : (
//         users.map((user) => (
//           <div key={user._id} style={{ border: "1px solid black", margin: "10px", padding: "10px" }}>
//             <p><b>Name:</b> {user.FirstName} {user.LastName}</p>
//             <p><b>Email:</b> {user.Email}</p>
//             <p><b>City:</b> {user.City}</p>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default App;

import { Routes, Route, Link } from "react-router-dom";
import Register from "./components/Register";
import Users from "./components/Users";

function App() {
  return (
    <div style={{ textAlign: "center" }}>
      <h2>My App</h2>

      {/* Navigation */}
      <nav>
        <Link to="/">Register</Link> | <Link to="/users">Users List</Link>
      </nav>

      <hr />

      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </div>
  );
}

export default App;
