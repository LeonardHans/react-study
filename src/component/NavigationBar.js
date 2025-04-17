import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../NavigationBar.css';
import '../Sidebar.css';

const NavigationBar = ({ authentiation, setAuthentication, refreshProduct }) => {
    const navigate = useNavigate();

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const onEntered = (event) => {
        if (event?.key === "Enter") {
            const keyword = event.target.value;
            navigate(`/?q=${keyword}`);
        }
    }
    
    return (<div>
        <div className="navbar">
            <div style={{display: 'flex'}}>
                <h1 style={{marginRight: '30px', cursor: 'pointer'}} onClick={ () => navigate('/')}>Leonard's Library</h1>
            </div>
            <div style={{display: 'flex', justifyContent: 'flex-end', marginLeft: 'auto'}}>
                <h1 style={{marginRight: '30px', cursor: 'pointer'}} onClick={ () => navigate('/')}>Home</h1>
                <h1 style={{marginRight: '30px', cursor: 'pointer'}} onClick={ () => navigate('/favorite')}>Favorite</h1>
                <h1 style={{marginRight: '10px', cursor: 'pointer'}} onClick={ () => navigate('/login')}>Login</h1>
            </div>
            <div className={`toggle-box ${isSidebarOpen ? 'active' : ''}`}>
                <button className="menu-toggle" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>☰</button>
            </div>
        </div>
    </div>)
}

export default NavigationBar