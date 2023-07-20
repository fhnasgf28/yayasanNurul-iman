import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const FooterComp = () => {
    return (
        <div className="footer pb-3 pt-4" id="footer">
            <Container>
                <Row>
                    <Col>
                        <h3 className="fw-bold text-white">Ngoding</h3>
                    </Col>
                    <Col className="text-end">
                    <i class="fa-brands fa-facebook text-white fs-1 mx-lg-3 mx-2"></i>
                    <i class="fa-brands fa-twitter text-white fs-1 mx-lg-3 mx-2"></i>
                    <i class="fa-brands fa-linkedin text-white fs-1 mx-lg-3 mx-2"></i>
                    </Col>
                </Row>
                <Row >
                   <Col>
                    <p className="text-center text-white-50">&copy; Copyright Yayasan Nurul Iman 2023</p>
                   </Col> 
                </Row>
            </Container>
        </div>
    );
};

export default FooterComp