import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../component/ProductCard';

const Home = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/login');
  };

  useEffect(() => {
    getProducts();
  }, []);

  const [products, setProducts] = useState([]);
  const getProducts = async () => {
    let url = `http://localhost:5555/products`;
    let response = await fetch(url);
    let data = await response.json();
    setProducts(data);
  }

  return (
    <div className="products">
      {products.map((product, index) => (<ProductCard product={product}/>))}
    </div>
  )
}

export default Home