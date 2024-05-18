import React from "react";
import { Navigate, Route, Routes, useParams } from "react-router-dom";
import Start from "./start";
import Login from "./login";
import Register from "./register";
import Recover from "./recover";
import Home from "./home";
import User from "./user";
import EditUser from "./editUser";
import PrivacyPolitics from "./privacyPolitics";
import PremiumAccount from "./userPremium";
import Routine from "./routine";
import EditPlanedRoutine from "./editPlanedRoutine";
import EditFreeRoutine from "./editFreeRoutine";
import EditSession from "./editSession";

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
      <Route path="/editUser" element={<EditUser />}></Route>
      <Route path="/privacyPolitics" element={<PrivacyPolitics />}></Route>
      <Route path="/premiumAccount" element={<PremiumAccount />}></Route>
      <Route path="/routines" element={<Routine />}></Route>
      <Route
        path="/editPlanedRoutine/:id"
        element={<EditPlanedRoutine />}
      ></Route>
      <Route path="/editFreeRoutine/:id" element={<EditFreeRoutine />}></Route>
      <Route path="/editSession/:id" element={<EditSession />}></Route>
    </Routes>
  );
}

export default App;
