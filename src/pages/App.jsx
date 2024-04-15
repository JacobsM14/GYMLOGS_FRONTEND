import React from "react";
import {  Navigate, Route, Routes } from "react-router-dom";
import Login from "./login";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <Routes>
      <Route path="/" element={<h1>Hola</h1>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
