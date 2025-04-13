import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, TextField } from '@mui/material';
import React, { useState } from 'react';
import contactStore from '../store/contactStore';

const ContactList = () => {
  const { contactBook } = contactStore();

  const [target, setTarget] = useState('');

  const onChanged = (event) => {
    setTarget(event.target.value);
  }
  
  return (<Box component="section" sx={{ width: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
    <h1>Contact List</h1>
    <div style={{ display: "flex", alignItems: "flex-end"}}>
      <FontAwesomeIcon icon={faSearch} size='2x'/>
      <TextField id="searchBox" label="Search" variant="standard" onChange={ onChanged } />
    </div>
    <div style={{ width: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
      <Box component="section" sx={{ width: "80%", display: "flex", justifyContent: "space-between"}}>
        <h5>Name</h5>
        <h5>Contact Number</h5>
      </Box>
      {
        contactBook.map( (contact) => {
          if (target === '' || contact.name.includes(target)) {
            return (<Box key={contact.id} component="section" sx={{ width: "80%", display: "flex", justifyContent: "space-between", p: 2, border: '1px dashed grey', gap: 2 }}>
              <p>{contact.name}</p>
              <p>{contact.number}</p>
            </Box>)
          }
          return null;
        })
      }
    </div>
  </Box>)
}

export default ContactList