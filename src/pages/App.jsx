import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Start from "./start";
import Login from "./login";
import Register from "./register";
import Recover from "./recover";
import Home from "./home";
import User from "./user";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <Routes>
      <Route path="/" element={<Start />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/recover" element={<Recover />} />
      <Route path="/home" element={<Home />} />
      <Route path="/*" element={<Navigate to="/login" />} />
      <Route path="/user" element={<User />}></Route>
    </Routes>
  );
}

export default App;
