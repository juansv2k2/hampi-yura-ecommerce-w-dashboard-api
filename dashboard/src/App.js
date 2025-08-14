import React from "react";
import SideBar from "./components/SideBar";
import ContentWrapper from "./components/ContentWrapper";
// import { Switch, Route } from "react-router-dom";
import "./assets/css/app.css";

function App() {
  return (
    <React.Fragment>
      <div id="wrapper">
        <SideBar />
        <ContentWrapper />
      </div>
    </React.Fragment>
  );
}

export default App;
