import React, { useState ,useEffect  }from 'react';
import { Navbar,Nav, Container } from 'react-bootstrap';
import '../css/main.css';


const NavbarComp = () => {
    const [changeColor, setChangeColor] = useState (false);
    
    const changeBackgroundColor = () => {
        if (window.scrollY > 680) {
    setChangeColor(true);
    } else {
        setChangeColor(false);
        }
    };
    
    useEffect(() => {
        changeBackgroundColor();

        window.addEventListener ("scroll",changeBackgroundColor);
    });


    return (   
    <div className="sticky-top">
        <Navbar variant="dark" expand="lg" className={changeColor ? "color-active" : "" }>
      <Container>
        <Navbar.Brand href="#home">Yayasan Nurul Iman</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto text-center">
            <Nav.Link href="#home" className="mx-2">Beranda</Nav.Link>
            <Nav.Link href="#link" className="mx-2">Berita</Nav.Link>
            <Nav.Link href="#link" className="mx-2">Informasi</Nav.Link>
            <Nav.Link href="#link" className="mx-2">Pendaftaran TPQ</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

    </div>

    )
}
export default NavbarComp;