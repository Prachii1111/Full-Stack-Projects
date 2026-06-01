/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";

const Users = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const res = await fetch("http://localhost:3000/users");
    const data = await res.json();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h2>All Users</h2>

      {users.length === 0 ? (
        <p>No users found</p>
      ) : (
        users.map((user) => (
          <div key={user._id} style={{ border: "1px solid black", margin: "10px", padding: "10px" }}>
            <p><b>Name:</b> {user.FirstName} {user.LastName}</p>
            <p><b>Email:</b> {user.Email}</p>
            <p><b>City:</b> {user.City}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Users;