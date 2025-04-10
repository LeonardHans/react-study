import { faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import '../Sidebar.css';

const NavigationBar = ({ authentiation, setAuthentication, refreshProduct }) => {
    const navigate = useNavigate();

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const menu = [
        { name: 'Home', path: '/' },
        { name: 'Portrait', path: '/?q=Portrait' },
        { name: 'Landscape', path: '/?q=Landscape' },
        { name: 'Abstract', path: '/?q=Abstract' },
        { name: 'Realism', path: '/?q=Realism' },
        { name: 'About', path: '/about' },
    ];

    const onEntered = (event) => {
        if (event?.key === "Enter") {
            const keyword = event.target.value;
            navigate(`/?q=${keyword}`);
        }
    }
    
    return (<div classNem="n">
        <div className="navigation-bar">
            <div className={`toggle-box ${isSidebarOpen ? 'active' : ''}`}>
                <button className="menu-toggle" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>☰</button>
            </div>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                <FontAwesomeIcon icon={faUser} style={{ marginRight: '10px',  }} />
                { authentiation === false ?
                    <Button variant="dark" onClick={() => navigate('/login')} >Login</Button>
                    :
                    <Button variant="dark" onClick={() => { setAuthentication(false); navigate('/'); } } >Logout</Button>
                }
            </div>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center',  alignItems: 'center' }}>
                <img style={{ cursor: 'pointer' }} width={200} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJzqecc-ZohBVG710s4XeLOa51S-VsYbMrog&s" onClick={() => navigate('/')} />
            </div>
            <div className={`menu ${isSidebarOpen ? 'active' : ''}`}>
                {menu.map((item, index) => (
                    <div key={index} className='menu-item'>
                        <Link style={{ fontFamily: 'Underdog', src:'./font/Underdog.ttf' }} to={item.path}>{item.name}</Link>
                    </div>
                ))}
            </div>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                <FontAwesomeIcon icon={faSearch} style={{ marginRight: '10px' }} />
                <input type="text" placeholder="Search" style={{background: '#800000' }} onKeyDown={(event) => onEntered(event)} />
            </div>
        </div>
    </div>)
}

export default NavigationBar