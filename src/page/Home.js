import React, { useEffect, useState } from 'react';
import Masonry from 'react-masonry-css';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../component/ProductCard';

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    getProducts();
  }, []);

  const [products, setProducts] = useState([]);
  const getProducts = async () => {
    //let url = `http://localhost:5555/products`;
    let url = `https://my-json-server.typicode.com/LeonardHans/react-study/products`;
    let response = await fetch(url);
    let data = await response.json();
    setProducts(data);
  }
  
  const msnry = new Masonry('.masonry-grid', {
    itemSelector: '.grid-item',
    columnWidth: '.grid-sizer',
    gutter: '.gutter-sizer',
    percentPosition: true,
    fitWidth: true,
  });
  
  const breakpointColumnsObj = {
    default: 5,
    1150: 4,
    900: 3,
    650: 2,
    400: 1
  };

  return (
    <div style={{ height: 'auto', width: 'auto', backgroundColor: '#111111' }}>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column">
        {products.map((product, index) => (<div key={index} className="masonry-item"><ProductCard product={product} /></div>))}
      </Masonry>
    </div>
  )
}

export default Home