import { useState } from "react";
import "./App.css";
import Form from "./Form";

function App() {
  return (
    <>
      <div className="card">
        <h1>Resume Generator!</h1>
        <h2>Fill in the form to generate your resume!</h2>
      </div>
      <Form />
    </>
  );
}

export default App;
