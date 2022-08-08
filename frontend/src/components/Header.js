import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import logo from "../static/img/Logo.svg";

function Header() {
  return (
    <header>
      <div className="aside__container">
        <aside>
          <div className="top">
            <div className="logo">
              <img src={logo} alt=""></img>
              <div>
                <h1>A&Q</h1>
                <p>ingenieria</p>
              </div>
            </div>
            <div className="close" id="close-btn">
            <i className="fas fa-x"></i>
            </div>
          </div>
          <div className="sidebar">
            <div>
            <a href="#">
              <h3> Atributos/Beneficios</h3>
            </a>
            <a href="#">
              <h3> Servicios/Planes</h3>
            </a>
            <a href="#">
              <h3> Preguntas/Respuestas</h3>
            </a>
            </div>
            <div className="sidebar__butons">
              <button className="btn">Solicitud de Pedido</button>
              <button className="btn">Inicia Sesion</button>
            </div>
            
          </div>
        </aside>
      </div>
    </header>
  );
}

export default Header;
