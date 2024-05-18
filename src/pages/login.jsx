import React, { useState, useEffect, useRef } from "react";
import { login } from "./../services/userApi";
import Cookies from "universal-cookie";

function logIn() {
  useEffect(() => {
    const cookies = new Cookies();
    const token = cookies.get("token");

    if (token) {
      window.location.href = "/home";
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
      alert("Por favor llena todos los campos");
      works = false;
    } else if (emailReg.test(email) === false) {
      alert("Correo no valido");
      works = false;
    } else if (works === true) {
      const response = await login(email, pssd);
      console.log("response: " + JSON.stringify(response));
      if (response && response.id) {
        alert("Bienvenido");
        // localStorage.setItem("token", response.id);
        const cookies = new Cookies();
        cookies.set("token", response.id, { path: "/" });
        window.location.href = "/home";
      } else {
        alert("Correo o contraseña incorrecta");
      }
    }
  };

  return (
    <>
      <div
        className="allCont backgroundGradient flex justify-center align-center flex-column"
        style={{ paddingBottom: "0px" }}
      >
        <div className="cage80 loginOnDeskop" id="contLogin">
          <div className="loginLogo">
            <img src="logo.png" alt="gymlogs" />
            <h1>GYMLOGS</h1>
          </div>
          <div className="loginForm">
            <form action="" onSubmit={userLogIn}>
              <input type="text" placeholder="Correo Electronico:" id="email" />
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
