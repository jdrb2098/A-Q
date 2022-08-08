import React, { useState, useEffect, Component } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Image, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import Header from '../components/Header';
import Footer from '../components/Footer'

function HomeScreen({}) {
  return (
    <div>
      <Header />
      <div>
        <h1>hola</h1>
      </div>
      <Footer />
    </div>
  );
}

export default HomeScreen;
