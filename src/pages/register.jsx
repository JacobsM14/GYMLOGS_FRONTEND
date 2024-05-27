import React, { useState, useEffect, useRef } from "react";
import { register } from "./../services/userApi";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  // ADDON
  const [isAddonVisible, setIsAddonVisible] = useState(false);
  const [isUserRegistered, setIsUserRegistered] = useState(false);
  const [isUserValidError, setIsUserValidError] = useState(false);

  // ADVISES FOR INPUTS
  const [allInputAdvise, setAllInputAdvise] = useState(false);
  const [inputInsertMailValidAdvise, setInputInsertMailValidAdvise] =
    useState(false);
  const [inputInsertPasswordAdvise, setInputInserPasswordAdvise] =
    useState(false);
  const [
    inputInsertCorrectPasswordAdvise,
    setInputInsertCorrectPasswordAdvise,
  ] = useState(false);
  const [inputInsertPrivacyAdvise, setInputInsertPrivacyAdvise] =
    useState(false);

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
      setAllInputAdvise(true);
    } else if (emailReg.test(email) === false) {
      setAllInputAdvise(false);
      setInputInsertMailValidAdvise(true);
    } else if (pssd !== confirmpssd) {
      setInputInserPasswordAdvise(true);
      setAllInputAdvise(false);
      setInputInsertMailValidAdvise(false);
    } else if (privacy === false) {
      setInputInsertPrivacyAdvise(true);
      setInputInserPasswordAdvise(false);
      setAllInputAdvise(false);
      setInputInsertMailValidAdvise(false);
    } else if (pssdReg.test(pssd) === false) {
      setInputInsertCorrectPasswordAdvise(true);
      setInputInsertPrivacyAdvise(false);
      setAllInputAdvise(false);
      setInputInsertMailValidAdvise(false);
    } else {
      const response = await register(user, email, pssd);
      if (response && !response.error && response.username) {
        setIsUserRegistered(true);
        setIsAddonVisible(true);
      } else {
        setIsUserValidError(true);
        setIsAddonVisible(true);
      }
    }
  };

  return (
    <>
      <div
        className="allCont flex justify-center align-center flex-column backgroundGradient"
        style={{ paddingBottom: "0px" }}
      >
        <div
          className="addonSet align-center"
          style={{
            display: isAddonVisible ? "flex" : "none",
          }}
        >
          <div
            id="userNotRegisteredBad"
            className="cage90 backgroundWhite marginAuto addonSetContainer"
            style={{ display: isUserValidError ? "block" : "none" }}
          >
            <h2>USUARIO NO SE HA PODIDO REGISTRAR</h2>
            <button
              onClick={() => {
                setIsAddonVisible(false);
                setIsUserValidError(false);
              }}
            >
              OK
            </button>
          </div>
          <div
            id="userRegisteredCorrectly"
            className="cage90 backgroundWhite marginAuto addonSetContainer"
            style={{ display: isUserRegistered ? "block" : "none" }}
          >
            <h2>USUARIO REGISTRADO CORRECTAMENTE</h2>
            <button
              onClick={() => {
                navigate("/login");
              }}
            >
              OK
            </button>
          </div>
        </div>
        <div className="cage80 loginOnDeskop">
          <div className="loginLogo">
            <img src="logo.png" alt="gymlogs" />
            <h1>GYMLOGS</h1>
          </div>
          <div className="loginForm">
            <form action="" onSubmit={registerUser}>
              <p
                className="adviseFormText cage90 block marginAuto"
                style={{
                  display: allInputAdvise || allInputAdvise ? "flex" : "none",
                }}
              >
                Rellena todos los campos*
              </p>
              <input type="text" placeholder="Usuario:" name="user" id="user" />
              <p
                className="adviseFormText cage90 block marginAuto"
                style={{
                  display: inputInsertMailValidAdvise ? "flex" : "none",
                }}
              >
                Introduce un email valido*
              </p>
              <input
                type="text"
                placeholder="Correo Electronico:"
                name="email"
                id="email"
              />
              <p
                className="adviseFormText cage90 block marginAuto"
                style={{
                  display: inputInsertCorrectPasswordAdvise ? "flex" : "none",
                }}
              >
                La contraseña tiene que tener entre 8 y 16 caracteres y contener
                al menos un número, una letra mayúscula y una letra minúscula*
              </p>
              <p
                className="adviseFormText cage90 block marginAuto"
                style={{
                  display: inputInsertPasswordAdvise ? "flex" : "none",
                }}
              >
                La contraseña no coincide*
              </p>
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
              <p
                className="adviseFormText cage90 block marginAuto"
                style={{
                  display: inputInsertPrivacyAdvise ? "flex" : "none",
                }}
              >
                Acepta las politicas de privacidad*
              </p>
              <div className="checkboxForm">
                <input type="checkbox" name="pricacy" id="privacy" />
                <label id="privacy">
                  <a href="/privacyPolitics">
                    Acepto las politicad de Privacidad
                  </a>
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
