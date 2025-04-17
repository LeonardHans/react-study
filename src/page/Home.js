import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import BookCard from '../component/BookCard';

const Home = () => {
  const navigate = useNavigate();

  const [query, setQuery] = useSearchParams();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchWithLoading = async (url) => {
    setLoading(true);
    const res = await fetch(url);
    const data = await res.json();
    setBooks(data);
    setLoading(false);
  }

  const onEntered = (event) => {
    if (event?.key === "Enter") {
        const keyword = event.target.value;
        navigate(`/?q=${keyword}`);
    }
  }
  
  const func = async () => {
    let queryString = query.get('q');
    if (queryString == null || queryString === '')
      queryString = 'love';
    const url = `https://openlibrary.org/search.json?q=${queryString}&limit=10`;
    await fetchWithLoading(url);
  }

  useEffect(() => {
    func();
  }, [query]);

  return (<div>
      <div style={{ backgroundColor: '#bbbbbb', display:'flex', width: '100%', height: '140px', alignItems: 'center'}}>
          <div style={{ width: '80%', height: '100%', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginLeft: '10%'}}>
              <h1 style={{marginLeft: '30px'}}>Leonard's Library</h1>
          </div>
          <div style={{ width: '80%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginRight: '10%' }}>
              <FontAwesomeIcon icon={faSearch} style={{ marginRight: '10px' }} />
              <input type="text" placeholder="Search" style={{background: '#bbbbbb' }} onKeyDown={(event) => onEntered(event)} />
          </div>
      </div>
      <div style={{ height: 'auto', width: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center'  }}>
        <ClipLoader color='gray' loading={loading} size={200} />
        { !loading && (<div>
          {books?.docs?.length > 0 ?
            (<Container>
                <Row>
                  {books.docs.map((book, index) => (
                    <Col lg={3}>
                      <BookCard key={index} book={book}/>
                    </Col>
                  ))}
              </Row>
            </Container>)
            :
            (<div className="empty-state" style={{ color: '#fff', padding: '20px', textAlign: 'center' }}>
              Nothing regarding ... "{query.get('q')}"
            </div>)
          }
        </div>)}
      </div>
    </div>
  )
}

export default Home