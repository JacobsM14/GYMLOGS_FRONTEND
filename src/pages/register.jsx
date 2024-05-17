import React, { useState, useEffect } from "react";
import { register } from "./../services/userApi";

function Register() {
  const registerUser = async (event) => {
    event.preventDefault();
    const user = event.target.user.value;
    const email = event.target.email.value;
    const pssd = event.target.passwd.value;
    const confirmpssd = event.target.confirmpasswd.value;
    const privacy = event.target.privacy.checked;
    const emailReg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const pssdReg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/;
    console.log(user, email, pssd, confirmpssd, privacy);

    if (user === "" || email === "" || pssd === "" || confirmpssd === "") {
      alert("Por favor llena todos los campos");
    } else if (emailReg.test(email) === false) {
      alert("Correo no valido");
    } else if (pssd !== confirmpssd) {
      alert("Las contraseñas no coinciden");
    } else if (privacy === false) {
      alert("Acepta las politicas de privacidad");
    } else if (
      pssd.length < 8 &&
      pssd.length > 16 &&
      pssdReg.test(pssd) === false
    ) {
      alert("La contraseña debe tener entre 8 y 16 caracteres");
    } else {
      const response = await register(user, email, pssd);
      if (response) {
        if (response && response.username) {
          alert("Usuario registrado correctamente");
          window.location.href = "/login";
        } else {
          alert("Error al registrar usuario");
        }
      } else {
        alert("Error al registrar usuario");
      }
    }
  };

  return (
    <>
      <div className="allCont flex justify-center align-center flex-column backgroundGradient">
        <div className="cage80 loginOnDeskop">
          <div className="loginLogo">
            <img src="logo.png" alt="gymlogs" />
            <h1>GYMLOGS</h1>
          </div>
          <div className="loginForm">
            <form action="" onSubmit={registerUser}>
              <input type="text" placeholder="Usuario:" name="user" id="user" />
              <input
                type="text"
                placeholder="Correo Electronico:"
                name="email"
                id="email"
              />
              <input
                type="password"
                placeholder="Contraseña:"
                name="passwd"
                id="passwd"
              />
              <input
                type="password"
                placeholder="Confirmar Contraseña:"
                name="confirmpasswd"
                id="confirmpasswd"
              />
              <div className="checkboxForm">
                <input type="checkbox" name="pricacy" id="privacy" />
                <label id="privacy">
                  <a href="/privacyPolitics">Acepto las politicad de Privacidad</a>
                </label>
              </div>
              <input type="submit" className="button2" value="REGISTRARSE" />
            </form>
            <a href="/login">
              <button className="button1">YA TIENES UNA CUENTA?</button>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
