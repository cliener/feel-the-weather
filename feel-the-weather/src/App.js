import React, { Component } from "react";
import Forecast from "./Forecast";
import logo from "./images/logo-ffcph.svg";
import "./App.css";

class App extends Component {
  ComponentDidMount() {
    console.log("mounting");
  }

  ComponentDidUpdate() {
    console.log("updating");
  }

  render() {
    return (
      <div className="App">
        <div className="ftw-header">
          <img src={logo} className="ftw-logo" alt="logo" />
          <h1>😎 Feel the Weather 🌤</h1>
        </div>
        <Forecast
          location="Taguig"
        />
      </div>
    );
  }
}

export default App;
