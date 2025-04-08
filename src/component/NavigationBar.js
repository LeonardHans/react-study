import { faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const NavigationBar = () => {
    const navigate = useNavigate();
    const items = [
        { name: 'Home', path: '/' },
        { name: 'Portrait', path: '/about' },
        { name: 'Abstract', path: '/about' },
        { name: 'About', path: '/about' },
    ];
    
    return (<div>
        <div className="navigation-bar">
            <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                <FontAwesomeIcon icon={faUser} style={{ marginRight: '10px',  }} />
                <Button variant="dark" onClick={() => navigate('/login')} >Login</Button>
            </div>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center',  alignItems: 'center' }}>
                <img width={200} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJzqecc-ZohBVG710s4XeLOa51S-VsYbMrog&s" />
            </div>
            <div className='horizontal-layout'>
                {items.map((item, index) => (
                    <div key={index} style={{ margin: '0 10px' }}>
                        <Link to={item.path}>{item.name}</Link>
                    </div>
                ))}
            </div>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                <FontAwesomeIcon icon={faSearch} style={{ marginRight: '10px' }} />
                <input type="text" placeholder="Search" style={{background: '#800000' }} />
            </div>
        </div>
    </div>)
}

export default NavigationBar