import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../css/main.css';


const HeroComp = () => {
    return (
    <div className= "hero min-vh-100 w-100">
        <Container>
        <Row>
            <Col className='text-white text-center'>
                <h1>farhan assegaf</h1>
                <h2>web developer</h2>
            </Col>
        </Row>
        </Container>
    </div>

    )
}
 
export default HeroComp;