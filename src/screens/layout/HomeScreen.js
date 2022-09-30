import React from "react";
import { Outlet } from "react-router-dom";
import Aside from "../../components/Aside";

function HomeScreen() {
  return (
    <div className="g-sidenav-show  bg-gray-200">
      <Aside />
      <main className="main-content position-relative h-100 border-radius-lg pb-5">
        <div className="container-fluid ">
          {/* aqui debe ir lo que se renderiza condicional */}
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default HomeScreen;
