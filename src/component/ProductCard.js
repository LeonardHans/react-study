import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/product/${product?.id}`, { state: { product } });
    }
    return (
        <div onClick={() => handleClick(product)} style={{ width: '200px', height: 'auto', margin: '10px' }}>
            <img src={product?.image} style={{ width: '100%', height:'100%', objectFit: 'cover'}}/>
            <div style={{ padding: '10px' }}>
                <h3 style={{ margin: '0', color: 'gray' }}>{product?.name}</h3>
                <h5 style={{ margin: '0', color: '#333333' }}>{product?.writer}</h5>
                {product?.tag?.map((tag, index) => (
                    <p key={index} style={{ margin: '0', color: '#555555' }}>#{tag}</p>
                ))}
                {product?.salePercentage ?
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                            <p style={{ textDecoration: 'line-through', margin: '0', color: 'gray' }}>${product?.price}</p>
                            <p style={{ margin: '0', color: 'white' }}>➡ ${product?.price * product.salePercentage}</p>
                        </div>
                        <p style={{ margin: '0', color: 'yellow', fontWeight: '700' }}>SALE</p>
                    </div>
                    :
                    <p style={{ margin: '0', color: 'white' }}>${product?.price}</p>
                }
            </div>
        </div>
    )
}

export default ProductCard