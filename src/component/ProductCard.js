import React from 'react';

const ProductCard = ({ product }) => {
    console.log(product);
    return (
        <div style={{ width: '200px', height: '100px', border: '1px solid black', margin: '10px' }}>
            <img src={product?.image} style={{ width: '100%', height:'100%', objectFit: 'cover'}}/>
        </div>
    )
}

export default ProductCard