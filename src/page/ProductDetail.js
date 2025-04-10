import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getProducts();
    }, []);

    const fetchWithLoading = async (url) => {
        setLoading(true);
        const res = await fetch(url);
        const data = await res.json();
        setProduct(data);
        setLoading(false);
    }

    const getProducts = async () => {
        //const url = `http://localhost:5555/products/` + id;
        const url = `https://my-json-server.typicode.com/LeonardHans/react-study/products/` + id;
        await fetchWithLoading(url);
    }

    return (<div style={{ backgroundColor: 'black', width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <ClipLoader color='gray' loading={loading} size={200} />
        { !loading && (
        <div style={{ width: '80%', height: 'auto', marginTop: '10px' }}>
            <img src={product?.image} style={{width: '100%', height:'auto', objectFit: 'cover'}}/>
            <div style={{ width: '100%' }}>
                <h1 style={{ textAlign: 'left', color: '#bbbbbb' }}>{product?.name}</h1>
                <h5 style={{ textAlign: 'right', color: '#333333' }}>{product?.writer}</h5>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    {product?.tag?.map((tag, index) => (
                        <p key={index} style={{ margin: '3px', textAlign: 'right', color: '#555555', overflow: 'hidden' }}>#{tag}</p>
                    ))}
                </div>
                <p></p>
                {product?.salePercentage ?
                    (<div>
                        <p className= 'sparkle-text' style={{ margin: '0', color: 'yellow', fontWeight: '500' }}>SALE</p>
                        <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                            <p style={{ textDecoration: 'line-through', margin: '0', color: 'gray' }}>${product?.price}</p>
                            <h3 style={{ margin: '0', color: 'white', fontWeight: '700' }}>&nbsp;&nbsp;➡ ${product?.price * product.salePercentage}</h3>
                        </div>
                    </div>)
                    :
                    <h3 style={{ margin: '0', color: 'white', fontWeight: '700' }}>${product?.price}</h3>
                }
                <Button variant="warning">Buy Now</Button>
            </div>
        </div>
        )}
        
    </div>)
}

export default ProductDetail