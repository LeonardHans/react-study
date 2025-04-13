import { Box, Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import contactStore from '../store/contactStore';

const ContactForm = () => {
    const { addContact } = contactStore();
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    
    return (<Box component="section" sx={{ width: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", p: 2, gap: 2 }}>
        <h1>Contact Form</h1>
        <TextField id="name" label="Name" variant="outlined" value={name} onChange={ (e) => setName(e.target.value) } />
        <TextField id="number" label="Contact Number" variant="outlined" value={number} onChange={ (e) => setNumber(e.target.value) }/>
        <Button variant='outlined' size="large" onClick={ () => {
            if (!name.trim() || !number.trim()) return;
            addContact(name, number);
        }}>Add New</Button>
        
    </Box>)
}

export default ContactForm