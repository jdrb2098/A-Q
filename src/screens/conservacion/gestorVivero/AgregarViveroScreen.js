import React, { useState } from "react";
import Select from "react-select";

function AgregarViveroScreen() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [inputList, setInputList] = useState([{ Latitud: "", longitud: "" }]);
  const options = [
    { label: "Acacías", value: "CL" },
    { label: "Barranca de Upía", value: "CL" },
    { label: "Cabuyaro", value: "CL" },
    { label: "Castilla La Nueva", value: "CL" },
    { label: "Cubarral", value: "CL" },
    { label: "Cumaral", value: "CL" },
    { label: "El Calvario", value: "CL" },
  ];

  const optionsSize = [
    { label: "Large", value: "LG" },
    { label: "Extra large", value: "ELG" },
    { label: "Extra small", value: "ESM" },
  ];
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, { Latitud: "", longitud: "" }]);
  };
  return (
    <div className="row min-vh-100">
      <div className="col-lg-10 col-md-10 col-12 mx-auto">
        <h3 className="mt-3 mb-0 text-center mb-6">Agregar Vivero</h3>
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
                <div class="row">
                  <div className="col-12 col-sm-6">
                    <div className="input-group input-group-dynamic">
                      <input
                        className="multisteps-form__input form-control"
                        type="text"
                        placeholder="Nombre del vivero"
                      />
                    </div>
                  </div>
                  <div className="col-12 col-sm-6">
                    <Select
                      defaultValue={selectedCategory}
                      onChange={setSelectedCategory}
                      options={options}
                      placeholder="Municipio"
                    />
                  </div>
                </div>

                {inputList.map((x, i) => (
                  <div className="row mt-3">
                    <div className="col-12 col-sm-4">
                      <div className="input-group input-group-dynamic">
                        <input
                          className="multisteps-form__input form-control"
                          type="text"
                          name="latitud"
                          placeholder="Latitud"
                          value={x.Latitud}
                          onChange={(e) => handleInputChange(e, i)}
                        />
                      </div>
                    </div>
                    <div className="col-12 col-sm-4">
                      <div className="input-group input-group-dynamic">
                        <input
                          className="multisteps-form__input form-control"
                          type="text"
                          name="longitud"
                          placeholder="Longitud"
                          value={x.longitud}
                          onChange={(e) => handleInputChange(e, i)}
                        />
                      </div>
                    </div>
                    <div className="btn-box col-12 col-sm-4 row justify-content-center">
                      {inputList.length !== 1 && (
                        <button
                          className="btn bg-gradient-danger ms-auto mb-0"
                          onClick={() => handleRemoveClick(i)}
                        >
                          Eliminar
                        </button>
                      )}
                      {inputList.length - 1 === i && (
                        <button className="btn bg-gradient-sucess ms-auto mb-0" onClick={handleAddClick}>Agregar</button>
                      )}
                    </div>
                  </div>
                ))}

                <div className="row mt-3">
                  <div className="col-12 col-sm-6">
                    <div className="input-group input-group-dynamic">
                      <label
                        htmlFor="exampleFormControlInput2"
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
                        htmlFor="exampleFormControlInput2"
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
                      <div className="form-check form-switch d-flex align-items-center mb-3">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="rememberMe"
                        />
                        <label
                          className="form-check-label mb-0 ms-3"
                          htmlFor="rememberMe"
                        >
                          Visible en solicitudes
                        </label>
                      </div>
                      <div className="form-check form-switch d-flex align-items-center mb-3">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="rememberMe"
                        />
                        <label
                          className="form-check-label mb-0 ms-3"
                          htmlFor="rememberMe"
                        >
                          Crear hoja de vida
                        </label>
                      </div>
                    </div>
                    <div className="col-sm-6 mt-sm-3 mt-5">
                      <div className="form-check form-switch d-flex align-items-center mb-3">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="rememberMe"
                        />
                        <label
                          className="form-check-label mb-0 ms-3"
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
  );
}

export default AgregarViveroScreen;
