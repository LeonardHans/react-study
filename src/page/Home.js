import React, { useEffect, useState } from 'react';
import Masonry from 'react-masonry-css';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../component/ProductCard';

const msnry = new Masonry('.masonry-grid', {
  itemSelector: '.grid-item',
  columnWidth: '.grid-sizer',
  gutter: '.gutter-sizer',
  percentPosition: true
});

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

  const breakpointColumnsObj = {
    default: 6,
    1500: 5,
    1250: 4,
    1000: 3,
    750: 2,
    500: 1
  };

  return (
    <div style={{ height: 'auto', width: 'auto', backgroundColor: '#111111' }}>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column">
        {products.map((product, index) => (<div class="masonry-item"><ProductCard product={product} /></div>))}
      </Masonry>
    </div>
  )
}

export default Home