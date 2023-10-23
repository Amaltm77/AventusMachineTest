import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Manage.css';
import { useNavigate } from 'react-router-dom';
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

function Manage() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get('http://localhost:3001/allusers');
      setUsers(res.data.data);
    };
    fetchUsers();
  }, []);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };


  let navigate = useNavigate();

  const handleEdit = (userId) => {
    const user = users.find(user => user._id === userId);
    navigate('/edit', { state: { user: user } });
  };

  const handleDelete = async (userId) => {
    try {
      const response = await axios.delete(`http://localhost:3001/users/${userId}`);
      if (response.status === 200) {
        alert('Deleted successfully');
        // Remove the user from the local state
        setUsers(users.filter(user => user._id !== userId));
      } else {
        console.error('Failed to delete user:', response);
      }
    } catch (error) {
      console.error('An error occurred while deleting the user:', error);
    }
  };


  const filteredUsers = users.filter(user =>
    user.email && user.email.toLowerCase().includes(search.toLowerCase())
  );


  return (
    <>
      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end', marginRight: '50px' }}>
        <div className="inputBox_container">
          <svg className="search_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" alt="search icon">
          </svg>
          <input
            className="inputBox"
            id="inputBox"
            type="search"
            placeholder="Search For Users"
            onChange={handleSearch}
          />
        </div>
      </div>
      <div className="contentt">
        <table className='customTable'>
          <thead>
            <tr>
              <th>User Email</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Manage Options</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user._id}>
                <td>{user.email}</td>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>
                  <button style={{ margin: '10px' }} onClick={() => handleEdit(user._id)}><AiOutlineEdit /></button>
                  <button style={{ margin: '10px' }} onClick={() => handleDelete(user._id)}><AiOutlineDelete /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Manage;
