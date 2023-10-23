import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Userlist.css';
import { GrChapterPrevious, GrChapterNext } from "react-icons/gr";

const Userlist = () => {
    const [users, setUsers] = useState([]);
    const [start, setStart] = useState(0);
    const usersPerPage = 10;

    useEffect(() => {
        const fetchUsers = async () => {
            const res = await axios.get('http://localhost:3001/allusers');
            setUsers(res.data.data);
        };
        fetchUsers();
    }, []);

    const handleNext = () => {
        setStart(prevStart => prevStart + usersPerPage);
    };

    const handlePrevious = () => {
        setStart(prevStart => Math.max(prevStart - usersPerPage, 0));
    };

    return (
        <div>
            <table className='customTable'>
                <thead>
                    <tr>
                        <th>User Email</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                    </tr>
                </thead>
                <tbody>
                    {users.slice(start, start + usersPerPage).map(user => (
                        <tr key={user.id}>
                            <td>{user.email}</td>
                            <td>{user.first_name}</td>
                            <td>{user.last_name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={handlePrevious} disabled={start === 0}><GrChapterPrevious /></button>
            <button onClick={handleNext} disabled={start + usersPerPage >= users.length}><GrChapterNext /></button>
        </div>
    );
};

export default Userlist;
