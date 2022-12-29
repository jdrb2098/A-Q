import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Logo from "../assets/logos/LogoHAQ.png";
import BGPrincipal from "../assets/logos/icons/Bannerprincipal.png"
function Footer() {
  return (
    <div>
        <Container fluid >
        <Row>
            <Col>
            <img alt="ISAMC" src={Logo} />
            </Col>
            <Col>
            <Container>
                <Row>
                    <Col>
                        <p>Únete </p>
                    </Col>
                    <Col>
                        <p>Servicios / planes</p>
                    </Col>
                    <Col>
                        <p>Preguntas Frecuentes</p>
                    </Col>
                </Row>
            </Container>
            </Col>
            <Col>
                <p>© Photo, Inc. 2019. We love our users!</p>
            </Col>
        </Row>
        </Container>
        
    </div>
  )
}

export default Footer