import React from "react";
import {  Navigate, Route, Routes } from "react-router-dom";
import Start from "./start";
import Login from "./login";
import Register from "./register"
import Recover from "./recover"

function App() {
  // const [count, setCount] = useState(0);

  return (
    <Routes>
      <Route path="/" element={<Start/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/recover" element={<Recover/>} />
      <Route path="/*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
