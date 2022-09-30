import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { userLoginAction } from "../../actions/userActions";
import LogoCormacarena from "../../assets/logos/LogoAQ.png";
import LogBackground from "../../assets/logos/LoginBG.png";
import Header from "../../components/Header";


function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(userLoginAction(email, password));
  };

  return (

    <div>
      <Header/>
      <div
      className="page-header align-items-start min-vh-100"
      style={{
        backgroundImage: `url(${LogBackground})`,
      }}
    >
      
      <span className="mask bg-gradient-dark opacity-6"></span>
      <div className="container my-auto">
        <div className="row">
          <div className="col-lg-4 col-md-8 col-12 mx-auto">
            <div className="card z-index-0 fadeIn3 fadeInBottom">
              <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                <div className="bg-gradient-primary shadow-primary border-radius-lg py-3 pe-1">
                  <h4 className="text-white font-weight-bolder text-center mt-2 mb-0">
                    A&Q
                  </h4>
                </div>
              </div>
              <div className="card-body">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={LogoCormacarena}
                    alt="Logo-Cormacarena"
                    style={{ maxWidth: "40%", maxHeight: "40%" }}
                  />
                </div>
                <form className="text-start" onSubmit={submitHandler}>
                  <div className="input-group input-group-outline my-3">
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      className="form-control"
                      placeholder="Emaill"
                    />
                  </div>
                  <div className="input-group input-group-outline mb-3">
                    <input
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      type="password"
                      className="form-control"
                      placeholder="Password"
                    />
                  </div>
                  <div className="text-center">
                    <button
                      type="submit"
                      className="btn bg-gradient-primary w-100 my-4 mb-2"
                    >
                      Iniciar sesión
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default LoginScreen;
