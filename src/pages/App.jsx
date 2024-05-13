import React from "react";
import { Navigate, Route, Routes, useParams } from "react-router-dom";
import Start from "./start";
import Login from "./login";
import Register from "./register";
import Recover from "./recover";
import Home from "./home";
import User from "./user";
import Routine from "./routine";
import EditPlanedRoutine from "./editPlanedRoutine";


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
      <Route path="/routines" element={<Routine />}></Route>
      <Route path="/editPlanedRoutine/:id" element={<EditPlanedRoutine />}></Route>
    </Routes>
  );
}

export default App;
