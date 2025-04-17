import React from 'react';

const BookCard = ({ book }) => {
    return (
        <div style={{ width: '100px', height: '200px', margin: '10px' }}>
            <img src={book?.image} style={{ width: '100%', height:'100%', objectFit: 'cover'}}/>
            <div style={{ padding: '10px' }}>
                <h3 style={{ margin: '0', color: 'gray' }}>{book?.title}</h3>
                <h5 style={{ margin: '0', color: '#333333' }}>{book?.author_name[0]}</h5>
            </div>
        </div>
    )
}

export default BookCard