import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Select from "react-select";
import Footer from "../components/Footer";
import Header from "../components/Header";
import BGPrincipal from "../assets/logos/icons/Bannerprincipal.png";
import gridImg1 from "../assets/logos/icons/Ilus-Optimiza.svg"
import gridImg2 from "../assets/logos/icons/Ilus-Ahorra.svg"
import gridImg3 from "../assets/logos/icons/Ilus-Compara.svg"
import gridImg4 from "../assets/logos/icons/Ilus-Agiliza.svg"
import BGGrid from "../assets/logos/icons/backgrid.png"
 
function PrincipalScreen() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

  const options = [
    { label: "Clothing", value: "CL" },
    { label: "Real Estate", value: "RL" },
    { label: "Electronics", value: "EL" },
    { label: "Others", value: "OT" },
  ];

  const optionsSize = [
    { label: "Large", value: "LG" },
    { label: "Extra large", value: "ELG" },
    { label: "Extra small", value: "ESM" },
  ];
  return (
    <div>
      <Header />
      <Container
        fluid
        style={{ height: "100vh", backgroundImage: `url(${BGPrincipal})` }}
      >
        <Row className="px-5" style={{ height: "100%", width: "100%" }}>
          <Col>
            <Container>
              <h2>
                La mejor solución para optimizar los procesos de compra de tu
                empresa
              </h2>
              <p>
                Trabajamos para generar ahorros en la gestión de abastecimiento
                en las diferentes áreas empresariales de nuestro clientes.
              </p>
              <button
                type="submit"
                className="btn bg-gradient-primary  my-4 mb-2"
              >
                Contactanos
              </button>
            </Container>
          </Col>
          <Col></Col>
        </Row>
      </Container>
      <Container fluid className="py-5">
        <Row>
          <Col>
            <Container>
              <Row style={{alignItems:'center' , justifyContent:'center'}}>
                <h4 className="w-80">Incremento de ahorros y beneficios en un 20% </h4>
              </Row>
            </Container>
          </Col>
          <Col>
            <Container>
              <Row style={{alignItems:'center', justifyContent:'center'}}>
                <h4 className="w-80">
                  Optimización del 90% del tiempo de los procesos de tratamiento
                  de SOLPED
                </h4>
              </Row>
            </Container>
          </Col>
          <Col>
            <Container>
              <Row style={{alignItems:'center', justifyContent:'center'}}>
                <h4 className="w-80">
                  Mejoramiento de los índices de productividad de las
                  negociaciones
                </h4>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
      <Container fluid >
        <Row>
          <Col xs={5} style={{backgroundImage: `url(${BGGrid})`, backgroundSize:"cover", backgroundPosition:"center" }}>
            <Container className="h-100">
                <Row className="h-100">
                <Col>
                <h2>Comprar con nosotros es comprar con confianza</h2>
                <p>
              Mediante el uso de nuestro aplicativo web, podrás tener la
              información de toda tu área de abastecimiento en un mismo lugar.{" "}
                </p></Col>
                </Row>
            </Container>
          </Col>
          <Col xs={7}>
            <Container>
              <Row style={{paddingBottom:"40px"}}>
                <Col style={{paddingRight:"50px"}}>
                  <div style={{backgroundImage:`url(${gridImg1})`, display:"flex", height:"180px",backgroundPosition:"center",backgroundSize:"contain",backgroundRepeat:"no-repeat",alignItems:"flex-end"}}>
                    <h4 style={{margin:"0"}}>Optimiza</h4>
                  </div>
                  <div>
                    <p>
                      Haz un seguimiento detallado de la ejecución de los
                      procesos de compra llevados acabo por tu equipo de
                      trabajo, monitoreando el presupuesto y la trazabilidad de
                      las solicitudes generadas.{" "}
                    </p>
                  </div>
                </Col>
                <Col>
                  <divv style={{backgroundImage:`url(${gridImg3})`, display:"flex", height:"180px",backgroundPosition:"center",backgroundSize:"contain",backgroundRepeat:"no-repeat",alignItems:"flex-end"}}>
                    <h4>Compara</h4>
                  </divv>
                  <div>
                    <p>
                      Te brindamos información actualizada de los precios de
                      distintos proveedores para que elijas el que mejor se
                      ajusta a tus necesidades.
                    </p>
                  </div>
                </Col>
              </Row>
              <Row style={{paddingBottom:"40px"}}>
                <Col style={{paddingRight:"50px"}}>
                  <div style={{backgroundImage:`url(${gridImg4})`, display:"flex", height:"180px",backgroundPosition:"center",backgroundSize:"contain",backgroundRepeat:"no-repeat",alignItems:"flex-end"}}>
                    <h4 >Agiliza</h4>
                  </div>
                  <div>
                    <p>
                      Ahorra tiempo gracias a nuestra sistematización,
                      automatización y estandarización de los procesos de
                      compra.
                    </p>
                  </div>
                </Col>
                <Col>
                  <div style={{backgroundImage:`url(${gridImg2})`, display:"flex", height:"180px",backgroundPosition:"center",backgroundSize:"contain",backgroundRepeat:"no-repeat",alignItems:"flex-end"}}>
                    <h4>Ahorra</h4>
                  </div>
                  <div>
                    <p>
                      Gracias a la posibilidad de comparación informativa en
                      tiempo real, identifica oportunidades de estratégias de
                      negociación con tus provedores y generar así un ahorro de
                      los costos de tu empresa.
                    </p>
                  </div>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
      <Container>
        <h4>Así lo hacemos</h4>
        <Row>
          <Col>
            <h2>01</h2>
            <h4>Análisis</h4>
            <p>Revisamos el estado de trus procesos de abastecimiento </p>
          </Col>
          <Col>
            <h2>03</h2>
            <h4>Objetivos</h4>
            <p>
              Definimos las metas a alcanzar y las políticas de los procesos de
              compra de tu empresa.
            </p>
          </Col>
          <Col>
            <h2>05</h2>
            <h4>Evaluacion</h4>
            <p>
              Realizamos revisiones periódicas del proceso y generamos informes
              detallando los ahorros generados.
            </p>
          </Col>
        </Row>
        <Row>
          <Col></Col>
        </Row>
        <Row>
          <Col>
            <h2>02</h2>
            <h4>Oportunidad de mejora</h4>
            <p>
              Identificamos las falencias en los procesos actualies con el fin
              de optimizar los recursos.
            </p>
          </Col>
          <Col>
            <h2>04</h2>
            <h4>Ejecución</h4>
            <p>
              Sistematizamos el proceso de abastecimiento para agilizar y
              controlar la trazabilidad.
            </p>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row>
          <Col></Col>
          <Col>
            <Row>
              <Col>
                <h3>Obtén datos relevantes sobre tus habitos de compra </h3>
                <p>
                  Gracias a la sistematización del proceso de compra, podrás
                  tener a la mano los datos de tu empresa y de manera digital.
                  Lo que te permite obtener en tiempo real el estado de las
                  diferentes solicitudes del área de abastecimiento.
                </p>
              </Col>
            </Row>
            <Container>
              <Row>
                <Col></Col>
                <Col>
                  <p>Obtén un comparativo mes a mes de tus gastos</p>
                </Col>
              </Row>
              <Row>
                <Col></Col>
                <Col>
                  <p>
                    Ten un control de gastos comparando tu presupuesto vs tus
                    gastos reales
                  </p>
                </Col>
              </Row>
              <Row>
                <Col></Col>
                <Col>
                  <p>
                    Aprovecha nuestros indicadores de gestión para la planeación
                    de tus operaciones
                  </p>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row>
          <Col>
            <h2>¿Quieres saber cómo podemos ayudarte a cumplir tus metas?</h2>
          </Col>
          <Col>
            <Container>
              <div className="row min-vh-100">
                <div className="">
                  <div className="card">
                    {/* <div className="card-body"> */}
                    <form className="multisteps-form__form">
                      {/* <!--single form panel--> */}
                      <div
                        className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
                        data-animation="FadeIn"
                      >
                        <h5 className="font-weight-bolder">
                          Déja tus datos y muy pronto te contactaremos
                        </h5>
                        <div className="multisteps-form__content">
                          <div className="row mt-3">
                            <div className="col-12 col-sm-6">
                              <div className="input-group input-group-dynamic">
                                <label
                                  htmlFor="exampleFormControlInput1"
                                  className="form-label"
                                >
                                  First name
                                </label>
                                <input
                                  className="multisteps-form__input form-control"
                                  type="text"
                                />
                              </div>
                            </div>
                            <div className="col-12 col-sm-6 mt-3 mt-sm-0">
                              <div className="input-group input-group-dynamic">
                                <label
                                  htmlFor="exampleFormControlInput1"
                                  className="form-label"
                                >
                                  Last name
                                </label>
                                <input
                                  className="multisteps-form__input form-control"
                                  type="text"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="row mt-3">
                            <div className="col-12">
                              <div className="input-group input-group-dynamic">
                                <label
                                  htmlFor="exampleFormControlInput1"
                                  className="form-label"
                                >
                                  Email address
                                </label>
                                <input
                                  className="multisteps-form__input form-control"
                                  type="text"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="row mt-3">
                            <div className="col-12">
                              <div className="input-group input-group-dynamic">
                                <label
                                  htmlFor="exampleFormControlInput1"
                                  className="form-label"
                                >
                                  Nombre de la empresa
                                </label>
                                <input
                                  className="multisteps-form__input form-control"
                                  type="text"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="button-row d-flex mt-4">
                            <button
                              className="btn bg-gradient-primary ms-auto mb-0"
                              type="button"
                              title="Send"
                            >
                              Guardar
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </Container>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
}

export default PrincipalScreen;
