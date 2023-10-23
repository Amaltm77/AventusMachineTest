import React, { useState } from 'react';
import axios from 'axios';
import './Registration.css'
const RegistrationForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      first_name: firstName,
      last_name: lastName,
      email: email
    };
    console.log(user);

    await axios.post('http://localhost:3001/insert', user)
      .then(() => {
        alert('Data inserted successfully');
        // Reset the form
        setFirstName("");
        setLastName("");
        setEmail("");
      })
      .catch((error) => {
        console.error(`There was an error creating the user: ${error}`);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit} method='post' className='form'>
        <h1>Insert User Data</h1>
        <label htmlFor='first_name'>First Name</label>
        <input type="text" placeholder="First Name" value={firstName} onChange={e => setFirstName(e.target.value)} name='first_name' />
        <label htmlFor='last_name'>Last Name</label>
        <input type="text" placeholder="Last Name" value={lastName} onChange={e => setLastName(e.target.value)} name='last_name' />
        <label htmlFor='email'>Email</label>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} name='email' />
        <button type="submit">Create User</button>
      </form>
    </div>
  );
};

export default RegistrationForm;
