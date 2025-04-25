import React, { useEffect, useState } from 'react';
import { Col } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';
import ClipLoader from 'react-spinners/ClipLoader';
import { useVideosQuery } from '../../../hooks/useVideos';
import './Poster.style.css';

const Poster = ({ posterPath, title, id, isTvShow }) => {
    const { data, isLoading, isError, error } = useVideosQuery({ id, isTvShow });
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
    }, [data]);

    if (isLoading) {
        return <ClipLoader color='gray' loading={!isLoading} size={200} style={{ backgroundColor: 'black' }} />;
    }
    if (isError) {
        return <Alert variant='danger'>Error: {error.message}</Alert>;
    }

    const videos = data?.data.results;

    if (!videos) {
        return <ClipLoader color='gray' loading={videos} size={200} style={{ backgroundColor: 'black' }} />;
    }

    const urlPrefix = 'https://media.themoviedb.org/t/p/w300_and_h450_bestv2';

    return (
        <Col lg={6} xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div className='poster-box'>
                <img onClick={handleShow} src={`${urlPrefix}${posterPath})`} alt="poster" style={{ maxWidth: '100%', height: '100%', objectFit: 'contain', position: 'relative' }} />
                <img
                    src="https://cdn-icons-png.flaticon.com/512/5323/5323763.png"
                    alt="Play Button"
                    className="play-button"
                    onClick={handleShow}
                />
            </div>
            <Modal show={show} onHide={handleClose} centered size='lg'>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ textAlign: 'center' }}>
                    <iframe
                        width="100%"
                        height="320"
                        src={`https://www.youtube.com/embed/${videos[0]?.key}`} // 여기에 YouTube 비디오 ID를 설정하세요.
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </Modal.Body>
            </Modal>
        </Col >
    );
}

export default Poster