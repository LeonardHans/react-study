import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState({});

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        //let url = `http://localhost:5555/products/` + id;
        let url = `https://my-json-server.typicode.com/products/` + id;
        let response = await fetch(url);
        let data = await response.json();
        setProduct(data);
    }
    return (
        <div>{ product?.name }</div>
    )
}

export default ProductDetail