import React from "react";
import img1 from "../assets/imgs/img1.png";
import img2 from "../assets/imgs/img2.png";
import img3 from "../assets/imgs/img3.png";
import img6 from "../assets/imgs/img6.png";
import img4 from "../assets/imgs/img4.png";
import img5 from "../assets/imgs/img5.png";
import Logo from "../assets/logos/eps/LogoHorizontalByMacarenia.svg";
function LogoScreen() {
  return (
    <div className="container">
      <div class="pt-3 pb-5">
        <img src={Logo} alt="logo"/>
      </div>
      <div className="row mt-5">
        <div className="col-lg-4 col-md-6">
          <div className="card" data-animation="true">
            <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
              <a className="d-block blur-shadow-image" href="asd">
                <img
                  src={img1}
                  alt="img-blur-shadow"
                  className="img-fluid shadow border-radius-lg"
                />
              </a>
              <div className="colored-shadow"></div>
            </div>
            <div className="card-body text-center">
              <div className="d-flex mt-n6 mx-auto">
                <a
                  className="btn btn-link text-primary ms-auto border-0"
                  data-bs-toggle="tooltip"
                  data-bs-placement="bottom"
                  title="Refresh"
                  href="asd"
                >
                  <i className="material-icons text-lg">refresh</i>
                </a>
                <button
                  className="btn btn-link text-info me-auto border-0"
                  data-bs-toggle="tooltip"
                  data-bs-placement="bottom"
                  title="Edit"
                >
                  <i className="material-icons text-lg">edit</i>
                </button>
              </div>
              <h5 className="font-weight-normal mt-3">
                <a href="https">Recaudo</a>
              </h5>
              <p className="mb-0">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec
                dictum nisl. Aenean tortor quam, accumsan at nunc at, pulvinar
                posuere justo. Quisque fermentum, risus quis aliquam ultricies,
                nisi{" "}
              </p>
            </div>
            <hr className="dark horizontal my-0" />
            <div className="card-footer d-flex">
              <p className="font-weight-normal my-auto"></p>
              <i className="material-icons position-relative ms-auto text-lg me-1 my-auto">
                place
              </i>
              <p className="text-sm my-auto"> </p>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6 mt-5 mt-md-0">
          <div className="card" data-animation="true">
            <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
              <a className="d-block blur-shadow-image" href="asd">
                <img
                  src={img2}
                  alt="img-blur-shadow"
                  className="img-fluid shadow border-radius-lg"
                />
              </a>
              <div className="colored-shadow"></div>
            </div>
            <div className="card-body text-center">
              <div className="d-flex mt-n6 mx-auto">
                <a
                  className="btn btn-link text-primary ms-auto border-0"
                  data-bs-toggle="tooltip"
                  data-bs-placement="bottom"
                  title="Refresh"
                  href="ad"
                >
                  <i className="material-icons text-lg">refresh</i>
                </a>
                <button
                  className="btn btn-link text-info me-auto border-0"
                  data-bs-toggle="tooltip"
                  data-bs-placement="bottom"
                  title="Edit"
                >
                  <i className="material-icons text-lg">edit</i>
                </button>
              </div>
              <h5 className="font-weight-normal mt-3">
                <a href="https">Seguimiento Planes</a>
              </h5>
              <p className="mb-0">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec
                dictum nisl. Aenean tortor quam, accumsan at nunc at, pulvinar
                posuere justo. Quisque fermentum, risus quis aliquam ultricies,
                nisi{" "}
              </p>
            </div>
            <hr className="dark horizontal my-0" />
            <div className="card-footer d-flex">
              <p className="font-weight-normal my-auto"></p>
              <i className="material-icons position-relative ms-auto text-lg me-1 my-auto">
                place
              </i>
              <p className="text-sm my-auto"> </p>
            </div>
          </div>
        </div>
        <div className="col-lg-4 mt-5 mt-lg-0">
          <div className="card" data-animation="true">
            <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
              <a className="d-block blur-shadow-image" href="asd">
                <img
                  src={img3}
                  alt="img-blur-shadow"
                  className="img-fluid shadow border-radius-lg"
                />
              </a>
              <div className="colored-shadow"></div>
            </div>
            <div className="card-body text-center">
              <div className="d-flex mt-n6 mx-auto">
                <a
                  className="btn btn-link text-primary ms-auto border-0"
                  data-bs-toggle="tooltip"
                  data-bs-placement="bottom"
                  title="Refresh"
                  href="asd"
                >
                  <i className="material-icons text-lg">refresh</i>
                </a>
                <button
                  className="btn btn-link text-info me-auto border-0"
                  data-bs-toggle="tooltip"
                  data-bs-placement="bottom"
                  title="Edit"
                >
                  <i className="material-icons text-lg">edit</i>
                </button>
              </div>
              <h5 className="font-weight-normal mt-3">
                <a href="https">Conservación</a>
              </h5>
              <p className="mb-0">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec
                dictum nisl. Aenean tortor quam, accumsan at nunc at, pulvinar
                posuere justo. Quisque fermentum, risus quis aliquam ultricies,
                nisi{" "}
              </p>
            </div>
            <hr className="dark horizontal my-0" />
            <div className="card-footer d-flex">
              <p className="font-weight-normal my-auto"></p>
              <i className="material-icons position-relative ms-auto text-lg me-1 my-auto">
                place
              </i>
              <p className="text-sm my-auto"> </p>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-lg-4 col-md-6">
          <div className="card" data-animation="true">
            <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
              <a className="d-block blur-shadow-image" href="asd">
                <img
                  src={img4}
                  alt="img-blur-shadow"
                  className="img-fluid shadow border-radius-lg"
                  
                />
              </a>
              <div className="colored-shadow"></div>
            </div>
            <div className="card-body text-center">
              <div className="d-flex mt-n6 mx-auto">
                <a
                  className="btn btn-link text-primary ms-auto border-0"
                  data-bs-toggle="tooltip"
                  data-bs-placement="bottom"
                  title="Refresh"
                  href="asd"
                >
                  <i className="material-icons text-lg">refresh</i>
                </a>
                <button
                  className="btn btn-link text-info me-auto border-0"
                  data-bs-toggle="tooltip"
                  data-bs-placement="bottom"
                  title="Edit"
                >
                  <i className="material-icons text-lg">edit</i>
                </button>
              </div>
              <h5 className="font-weight-normal mt-3">
                <a href="https">Gestión Documental</a>
              </h5>
              <p className="mb-0">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec
                dictum nisl. Aenean tortor quam, accumsan at nunc at, pulvinar
                posuere justo. Quisque fermentum, risus quis aliquam ultricies,
                nisi{" "}
              </p>
            </div>
            <hr className="dark horizontal my-0" />
            <div className="card-footer d-flex">
              <p className="font-weight-normal my-auto"></p>
              <i className="material-icons position-relative ms-auto text-lg me-1 my-auto">
                place
              </i>
              <p className="text-sm my-auto"> </p>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6 mt-5 mt-md-0">
          <div className="card" data-animation="true">
            <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
              <a className="d-block blur-shadow-image" href="asd">
                <img
                  src={img5}
                  alt="img-blur-shadow"
                  className="img-fluid shadow border-radius-lg"
                />
              </a>
              <div className="colored-shadow"></div>
            </div>
            <div className="card-body text-center">
              <div className="d-flex mt-n6 mx-auto">
                <a
                  className="btn btn-link text-primary ms-auto border-0"
                  data-bs-toggle="tooltip"
                  data-bs-placement="bottom"
                  title="Refresh"
                  href="asd"
                >
                  <i className="material-icons text-lg">refresh</i>
                </a>
                <button
                  className="btn btn-link text-info me-auto border-0"
                  data-bs-toggle="tooltip"
                  data-bs-placement="bottom"
                  title="Edit"
                >
                  <i className="material-icons text-lg">edit</i>
                </button>
              </div>
              <h5 className="font-weight-normal mt-3">
                <a href="https">Recurso hídrico</a>
              </h5>
              <p className="mb-0">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec
                dictum nisl. Aenean tortor quam, accumsan at nunc at, pulvinar
                posuere justo. Quisque fermentum, risus quis aliquam ultricies,
                nisi{" "}
              </p>
            </div>
            <hr className="dark horizontal my-0" />
            <div className="card-footer d-flex">
              <p className="font-weight-normal my-auto"></p>
              <i className="material-icons position-relative ms-auto text-lg me-1 my-auto">
                place
              </i>
              <p className="text-sm my-auto"> </p>
            </div>
          </div>
        </div>
        <div className="col-lg-4 mt-5 mt-lg-0">
          <div className="card" data-animation="true">
            <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
              <a className="d-block blur-shadow-image" href="asd">
                <img
                  src={img6}
                  alt="img-blur-shadow"
                  className="img-fluid shadow border-radius-lg"
                />
              </a>
              <div className="colored-shadow"></div>
            </div>
            <div className="card-body text-center">
              <div className="d-flex mt-n6 mx-auto">
                <a
                  className="btn btn-link text-primary ms-auto border-0"
                  data-bs-toggle="tooltip"
                  data-bs-placement="bottom"
                  title="Refresh"
                  href="ad"
                >
                  <i className="material-icons text-lg">refresh</i>
                </a>
                <button
                  className="btn btn-link text-info me-auto border-0"
                  data-bs-toggle="tooltip"
                  data-bs-placement="bottom"
                  title="Edit"
                >
                  <i className="material-icons text-lg">edit</i>
                </button>
              </div>
              <h5 className="font-weight-normal mt-3">
                <a href="https">Almacén</a>
              </h5>
              <p className="mb-0">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec
                dictum nisl. Aenean tortor quam, accumsan at nunc at, pulvinar
                posuere justo. Quisque fermentum, risus quis aliquam ultricies,
                nisi{" "}
              </p>
            </div>
            <hr className="dark horizontal my-0" />
            <div className="card-footer d-flex">
              <p className="font-weight-normal my-auto"></p>
              <i className="material-icons position-relative ms-auto text-lg me-1 my-auto">
                place
              </i>
              <p className="text-sm my-auto"> </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LogoScreen;
