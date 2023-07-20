import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
// import '../css/main.css';

const ServiceComp = () => {
    return (
    <div className='min-vh-100 d-flex align-items-center' id='pendaftaran'>
        <Container>
        <Row className="mb-5">
            <Col>
                <h1 className='text-center fw-bold'>Service</h1>
                <p className='text-center'>Lorem ipsum dolor sit 
                    amet consectetur adipisicing elit. Saepe, nemo.</p>
            </Col>
        </Row>
        <Row>
            <Col className='text-center py-5 px-3 '>
                 <i class="fa-solid fa-coins fs-2 mb-4"></i>
                 <h5 className='fw-bold'>Harga terjangkau</h5>
                 <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            </Col>

            <Col className='text-center py-5 px-3 '>
                <i class="fa-solid fa-thumbs-up fs-2 mb-4"></i>
                 <h5 className='fw-bold'>Fasilitas Terbaik</h5>
                 <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            </Col>

            <Col className='text-center py-5 px-3 '>
                 <i class="fa-solid fa-shield-halved fs-2 mb-4"></i>
                 <h5 className='fw-bold'>Tersertifikasi</h5>
                 <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            </Col>
        </Row>
        </Container>
    </div>

    )
}
 
export default ServiceComp;