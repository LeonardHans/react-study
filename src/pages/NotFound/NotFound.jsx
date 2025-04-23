import React from 'react'
import { Button } from 'react-bootstrap'
import './NotFound.style.css'

const NotFound = () => {
    return (
        <div className='not-found-main'>
            <h1 style={{ color: 'white' }}>404 Not Found</h1>
            <Button variant="warning" href="/" style={{ marginTop: '20px' }}>
                Go to Home
            </Button>
        </div>
    )
}

export default NotFound