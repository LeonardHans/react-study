import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useMediaQuery } from 'react-responsive';
import { Outlet, useNavigate } from 'react-router-dom';

const AppLayout = () => {
    const [keyword, setKeyword] = React.useState('');
    const navigate = useNavigate();
    const isSmallScreen = useMediaQuery({ query: '(max-width: 690px)' });

    const searchByKeyword = (e) => {
        e.preventDefault();
        navigate(`/movies?q=${keyword}`);
        setKeyword('');
    }

    return (
        <div>
            <Navbar bg="black" expand="lg" style={{ height: isSmallScreen ? '14vh' : '7vh' }}>
                <Container fluid style={{ position: 'fixed', display: 'flex', justifyContent: 'space-between', height: isSmallScreen ? '14vh' : '7vh', width: '100%', backgroundColor: 'black', zIndex: 10, overflow: 'hidden' }}>

                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <Navbar.Brand href="/">
                            <img src={`${process.env.PUBLIC_URL}/leoflix.png`} alt="Logo" style={{ maxHeight: '7vh', objectFit: 'contain' }} />
                        </Navbar.Brand>
                        <Nav.Link href="/" style={{ color: 'white' }}>Home</Nav.Link>
                        <Nav.Link href="/movies" style={{ color: 'white' }}>Movies</Nav.Link>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', width: isSmallScreen ? '100%' : 'auto' }}>
                        <Form className="d-flex" onSubmit={searchByKeyword}>
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                                value={keyword}
                                onChange={(e) => setKeyword(e.target.value)}
                            />
                            <Button variant="danger" onClick={searchByKeyword}>Search</Button>
                        </Form>
                    </div>

                    {/*
                    <Navbar.Collapse id="navbarScroll" >
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100%', }}
                            navbarScroll
                        >
                            <Nav.Link href="/" style={{ color: 'white' }}>Home</Nav.Link>
                            <Nav.Link href="/movies" style={{ color: 'white' }}>Movies</Nav.Link>
                        </Nav>
                        <Form className="d-flex" onSubmit={searchByKeyword}>
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                                value={keyword}
                                onChange={(e) => setKeyword(e.target.value)}
                            />
                            <Button variant="danger" onClick={searchByKeyword}>Search</Button>
                        </Form>
                    </Navbar.Collapse>*/}
                </Container>
            </Navbar>
            <Outlet />
        </div >
    )
}

export default AppLayout