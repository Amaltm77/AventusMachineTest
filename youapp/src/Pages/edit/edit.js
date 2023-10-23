import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

function Edit() {
    const location = useLocation();
    const user = location.state.user;

    const [firstName, setFirstName] = useState(user.first_name);
    const [lastName, setLastName] = useState(user.last_name);
    const [email, setEmail] = useState(user.email);

    useEffect(() => {
        if (user) {
            setFirstName(user.first_name);
            setLastName(user.last_name);
            setEmail(user.email);
        }
    }, [user]);

    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedUser = {
            first_name: firstName,
            last_name: lastName,
            email: email
        };

        try {
            const response = await axios.patch(`http://localhost:3001/users/${user._id}`, updatedUser);
            if (response.status === 200) {
                alert('Updated successfully');
                navigate('/admin/Manage');
            } else {
                console.error('Failed to update user:', response);
            }
        } catch (error) {
            console.error('An error occurred while updating the user:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} />
            <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} />
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
            <button type="submit">Update User</button>
        </form>
    );
}

export default Edit;
