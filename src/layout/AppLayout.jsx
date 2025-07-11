import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Outlet, useNavigate } from 'react-router-dom';

const AppLayout = () => {
    const [keyword, setKeyword] = React.useState('');
    const navigate = useNavigate();

    const searchByKeyword = (e) => {
        e.preventDefault();
        navigate(`/movies?q=${keyword}`);
        setKeyword('');
    }

    return (
        <div>
            <Navbar expand='sm' className="bg-body-tertiary" bg="black">
                <Container fluid>
                    <Navbar.Brand href="/" style={{ height: '7vh' }}>
                        <img src={`${process.env.PUBLIC_URL}/leoflix.png`} alt="Logo" style={{ maxWidth: '100%', height: '100%', objectFit: 'contain' }} />
                    </Navbar.Brand>
                    <Nav.Link href="/" style={{ color: 'white' }}>Home</Nav.Link>
                    <Nav.Link href="/movies" style={{ color: 'white' }}>Movies</Nav.Link>
                    <Navbar.Toggle aria-controls="navbarScroll" style={{ backgroundColor: '#cc0000' }} />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100%' }}
                            navbarScroll
                        >
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
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Outlet />
        </div >
    )
}

export default AppLayout