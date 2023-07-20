import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../css/main.css';


const HeroComp = () => {
    return (
    <div className= "hero min-vh-100 w-100" id='beranda'>
        <Container>
        <Row>
            <Col className='text-white text-center fs-1'>
                <h1>farhan assegaf</h1>
                <p className='heroNav text-white text-center text-white-50'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente perspiciatis </p>
            </Col>
        </Row>
        </Container>
    </div>

    )
}
 
export default HeroComp;