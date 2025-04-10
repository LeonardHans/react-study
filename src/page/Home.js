import React, { useEffect, useState } from 'react';
import Masonry from 'react-masonry-css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import ProductCard from '../component/ProductCard';

const Home = () => {
  const navigate = useNavigate();

  const [query, setQuery] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchWithLoading = async (url) => {
    setLoading(true);
    const res = await fetch(url);
    const data = await res.json();
    setProducts(data);
    setLoading(false);
  }

  const getProducts = async () => {
    const queryString = query.get('q') ?? "";

    //const url = `http://localhost:5555/products?q=${queryString}`;
    const url = `https://my-json-server.typicode.com/LeonardHans/react-study/products?q=${queryString}`;

    await fetchWithLoading(url);
  }

  
  useEffect(() => {
    getProducts();
  }, [query]);

  const msnry = new Masonry('.masonry-grid', {
    itemSelector: '.grid-item',
    columnWidth: '.grid-sizer',
    gutter: '.gutter-sizer',
    percentPosition: true,
    fitWidth: true,
  });
  
  const breakpointColumnsObj = {
    default: 5,
    1100: 4,
    900: 3,
    700: 2,
    500: 1
  };

  return (<div style={{ height: 'auto', width: 'auto', backgroundColor: '#111111' }}>
      <ClipLoader color='gray' loading={loading} size={200} />
      { !loading && (<div>
        {products.length > 0 ?
          (<Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column">
            {products.map((product, index) => (
              <div key={index} className="masonry-item">
                <ProductCard product={product} />
              </div>
            ))}
          </Masonry>)
          :
          (<div className="empty-state" style={{ color: '#fff', padding: '20px', textAlign: 'center' }}>
            Nothing regarding ... "{query.get('q')}"
          </div>)
        }
      </div>)}
    </div>
  )
}

export default Home