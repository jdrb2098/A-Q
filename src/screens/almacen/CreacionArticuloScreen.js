import { useState } from "react";
//import ReactQuill from "react-quill";
//import "react-quill/dist/quill.snow.css";
import Select from "react-select";

const CreacionArticulo = () => {
  //const [value, setValue] = useState("");
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
    <div className="row min-vh-100">
      <div className="col-lg-8 col-md-10 col-12 mx-auto">
        <h3 className="mt-3 mb-0 text-center mb-6">
          Crear Articulos Devolutivos
        </h3>
        {/* <p className="lead font-weight-normal opacity-8 mb-7 text-center">
          This information will let us know more about you.
        </p> */}
        <div className="card">
          {/* <div className="card-body"> */}
          <form className="multisteps-form__form">
            {/* <!--single form panel--> */}
            <div
              className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
              data-animation="FadeIn"
            >
              <h5 className="font-weight-bolder">Datos generales</h5>
              <div className="multisteps-form__content">
                <div className="row mt-3">
                  {/* <div className="col-12 col-sm-6"> */}
                  <label className="form-control ms-0">Tipo de articulo</label>
                  <Select
                    defaultValue={selectedCategory}
                    onChange={setSelectedCategory}
                    options={options}
                  />
                  {/* </div> */}
                </div>
                <div className="row mt-3">
                  <div className="col-12 col-sm-6">
                    <div className="input-group input-group-dynamic">
                      <label
                        htmlFor="exampleFormControlInput1"
                        className="form-label"
                      >
                        Nombre
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
                        Codigo articulo
                      </label>
                      <input
                        className="multisteps-form__input form-control"
                        type="text"
                      />
                    </div>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-12 col-sm-6">
                    <div className="input-group input-group-dynamic">
                      <label
                        htmlFor="exampleFormControlInput1"
                        className="form-label"
                      >
                        Porcentaje de IVA
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
                        Vida util
                      </label>
                      <input
                        className="multisteps-form__input form-control"
                        type="text"
                      />
                    </div>
                  </div>
                </div>
                <div className="row mt-2">
                  <div className="col-12 col-sm-6">
                    <label className="form-control ms-0">
                      Metodo de valoracion
                    </label>
                    <Select
                      defaultValue={selectedCategory}
                      onChange={setSelectedCategory}
                      options={options}
                    />
                  </div>
                  <div className="col-12 col-sm-6">
                    <label className="form-control ms-0">
                      Tipo de depreciacion
                    </label>
                    <Select
                      defaultValue={selectedSize}
                      onChange={setSelectedSize}
                      options={optionsSize}
                    />
                  </div>
                  <div className="row">
                    <div className="col-sm-6 mt-sm-3 mt-5">
                      <div class="form-check form-switch d-flex align-items-center mb-3">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="rememberMe"
                        />
                        <label
                          class="form-check-label mb-0 ms-3"
                          htmlFor="rememberMe"
                        >
                          Visible en solicitudes
                        </label>
                      </div>
                      <div class="form-check form-switch d-flex align-items-center mb-3">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="rememberMe"
                        />
                        <label
                          class="form-check-label mb-0 ms-3"
                          htmlFor="rememberMe"
                        >
                          Crear hoja de vida
                        </label>
                      </div>
                    </div>
                    <div className="col-sm-6 mt-sm-3 mt-5">
                      <div class="form-check form-switch d-flex align-items-center mb-3">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="rememberMe"
                        />
                        <label
                          class="form-check-label mb-0 ms-3"
                          htmlFor="rememberMe"
                        >
                          Control por unidad
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <div className="row">
                  <div className="col-sm-6">
                    <label className="mt-4">Descripcion</label>
                    <p className="form-text text-muted text-xs ms-1 d-inline">
                      (optional)
                    </p>
                     <div id="edit-deschiption" className="h-50">
                          <p>Some initial <strong>bold</strong> text</p>
                        </div>
                    <ReactQuill
                      theme="snow"
                      value={value}
                      onChange={setValue}
                      className="h-50"
                    />
                  </div>
                  <div className="col-sm-6 mt-sm-3 mt-5">
                    <label className="form-control ms-0">Category</label>
                    <Select
                      defaultValue={selectedCategory}
                      onChange={setSelectedCategory}
                      options={options}
                    />
                    <label className="form-control ms-0">Sizes</label>
                    <Select
                      defaultValue={selectedSize}
                      onChange={setSelectedSize}
                      options={optionsSize}
                    />
                  </div>
                </div> */}
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
    // </div>
  );
};
export default CreacionArticulo;
