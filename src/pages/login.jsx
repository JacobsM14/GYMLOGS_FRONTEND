import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "./../services/userApi";
import Cookies from "universal-cookie";

function logIn() {
  const navigate = useNavigate();
  // ADDON
  const [isAddonVisible, setIsAddonVisible] = useState(false);
  const [isUserValidError, setIsUserValidError] = useState(false);
  // ADVISES FOR INPUTS
  const [inputInserMailAdvise, setInputInserMailAdvise] = useState(false);
  const [inputInserPasswordAdvise, setInputInserPasswordAdvise] =
    useState(false);

  useEffect(() => {
    const cookies = new Cookies();
    const token = cookies.get("token");

    if (token) {
      navigate("/home");
    }
  }, []);

  const userLogIn = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const pssd = event.target.pssd.value;
    const emailReg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    let works = true;
    console.log(email, pssd);
    if (email === "" || pssd === "") {
      setInputInserMailAdvise(true);
      setInputInserPasswordAdvise(true);
      works = false;
    } else if (emailReg.test(email) === false) {
      setInputInserPasswordAdvise(false);
      works = false;
    } else if (works === true) {
      const response = await login(email, pssd);
      if (response && response.id) {
        const cookies = new Cookies();
        cookies.set("token", response.id, { path: "/" });
        cookies.set("userRole", response.urole, { path: "/" });
        navigate("/home");
      } else {
        setIsAddonVisible(true);
        setIsUserValidError(true);
      }
    }
  };

  return (
    <>
      <div
        className="allCont backgroundGradient flex justify-center align-center flex-column"
        style={{ paddingBottom: "0px" }}
      >
        <div
          className="addonSet align-center"
          style={{
            display: isAddonVisible ? "flex" : "none",
          }}
        >
          <div
            id="showUserError"
            className="cage90 backgroundWhite marginAuto addonSetContainer"
            style={{ display: isUserValidError ? "block" : "none" }}
          >
            <h2>EL MAIL Y LA CONTRASEÑA NO COINCIDEN</h2>
            <button
              onClick={() => {
                setIsAddonVisible(false);
                setIsUserValidError(false);
              }}
            >
              OK
            </button>
          </div>
        </div>
        <div className="cage80 loginOnDeskop" id="contLogin">
          <div className="loginLogo">
            <img src="logo.png" alt="gymlogs" />
            <h1>GYMLOGS</h1>
          </div>
          <div className="loginForm">
            <form action="" onSubmit={userLogIn}>
              <p
                className="adviseFormText cage90 block marginAuto"
                style={{
                  display:
                    inputInserMailAdvise || inputInserMailAdvise
                      ? "flex"
                      : "none",
                }}
              >
                Inserta un correo electronico valido*
              </p>
              <input type="text" placeholder="Correo Electronico:" id="email" />
              <p
                className="adviseFormText cage90 block marginAuto"
                style={{
                  display:
                    inputInserPasswordAdvise || inputInserPasswordAdvise
                      ? "flex"
                      : "none",
                }}
              >
                Inserta una contraseña*
              </p>
              <input type="password" placeholder="Contraseña:" id="pssd" />
              <input type="submit" className="button1" value="INICIAR SESION" />
              <a href="">Has olvidado tu contraseña?</a>
            </form>
            <a href="/register">
              <button className="button2">REGISTRARSE</button>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default logIn;
