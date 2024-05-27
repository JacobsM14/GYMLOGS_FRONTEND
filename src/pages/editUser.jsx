import Nav from "./../components/navComponent/navComponent";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

import {
  getUserById,
  updateUserEmail,
  updateUserUsername,
  updateUserPassword,
  deleteUserById,
  login,
} from "./../services/userApi";

function editUser() {
  const navigate = useNavigate();

  // FORM REFS
  const email = useRef();
  const username = useRef();
  const password = useRef();
  const pastPassword = useRef();
  const repeatPassword = useRef();

  const deleteVerifyEmail = useRef();
  const deleteVerifyPassword = useRef();

  // ADDONS
  const [isAddonVisible, setAddonVisible] = useState(false);
  const [isVerifyDeleteUserVisible, setVerifyDeleteUserVisible] =
    useState(false);

  // ADVISES
  const [inputInsertMailValidAdvise, setInputInsertMailValidAdvise] =
    useState(false);
  const [
    inputInsertCorrectPasswordAdvise,
    setInputInsertCorrectPasswordAdvise,
  ] = useState(false);
  const [currentPasswordIfEditEmail, setCurrentPasswordIfEditEmail] =
    useState(false);

  const [inputDeleteUserAdvise, setInputDeleteUserAdvise] = useState(false);

  const [userSaved, setUserSaved] = useState({});
  // NEED TO BE LOGED IN TO ACCESS THIS PAGE
  useEffect(() => {
    const cookies = new Cookies();
    const token = cookies.get("token");

    if (!token) {
      navigate("/login");
    } else {
      getUserById(token).then((data) => {
        setUserSaved(data[0]);
      });
    }
  }, []);

  // NAVIAGTION FUNCTIONS
  const goBack = () => {
    navigate("/user");
  };

  const closeSession = () => {
    const cookies = new Cookies();
    cookies.remove("token");
    window.location.href = "/";
  };

  const preventDefault = (e) => {
    e.preventDefault();
  };

  // ADDON FUNCTIONS
  const deleteUserAddon = () => {
    setAddonVisible(true);
    setVerifyDeleteUserVisible(true);
  };

  // DATABASE FUNCTIONS
  const editUser = (e) => {
    let newEmail = email.current.value;
    let newUsername = username.current.value;
    let newPassword = password.current.value;
    let newpastPassword = pastPassword.current.value;
    const emailReg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const pssdReg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/;

    if (
      newEmail !== "" &&
      pastPassword !== "" &&
      emailReg.test(newEmail) === true
    ) {
      login(userSaved.email, newpastPassword).then((response) => {
        if (response && !response.error) {
          updateUserEmail(userSaved.pk_id_user, newEmail).then((response) => {
            if (response && !response.error) {
              closeSession();
            }
          });
        } else {
          setCurrentPasswordIfEditEmail(true);
        }
      });
    } else if (
      emailReg.test(newEmail) === false &&
      newEmail !== "" &&
      newpastPassword !== ""
    ) {
      setInputInsertMailValidAdvise(true);
    } else if (newpastPassword === "" && newEmail !== "") {
      setCurrentPasswordIfEditEmail(true);
    }

    if (newUsername !== "") {
      console.log("newUsername: " + newUsername);
      updateUserUsername(userSaved.pk_id_user, newUsername).then((response) => {
        console.log(response);
        // goBack();
      });
    }

    if (
      newPassword !== "" &&
      newpastPassword !== "" &&
      newPassword === repeatPassword.current.value &&
      pssdReg.test(newPassword) === true
    ) {
      updateUserPassword(
        userSaved.pk_id_user,
        newPassword,
        newpastPassword
      ).then((response) => {
        if (response && !response.error) {
          closeSession();
        }
      });
    } else if (pssdReg.test(newPassword) === false && newPassword !== "") {
      setInputInsertCorrectPasswordAdvise(true);
    }
  };

  const deleteUserBD = () => {
    const cookies = new Cookies();
    const token = cookies.get("token");

    const email = deleteVerifyEmail.current.value;
    const password = deleteVerifyPassword.current.value;

    if (email !== "" && password !== "") {
      login(email, password).then((response) => {
        if (
          response &&
          response.id &&
          !response.error &&
          response.id === token
        ) {
          deleteUserById(token).then((response) => {
            if (response && !response.error) {
              closeSession();
            }
          });
        } else {
          setInputDeleteUserAdvise(true);
        }
      });
    } else {
      setInputDeleteUserAdvise(true);
    }
  };

  return (
    <>
      <div
        id="userEditPage"
        className="allCont flex flex-column align-center backgroundBlack position-relative"
      >
        <div
          className="addonSet align-center"
          style={{
            display: isAddonVisible ? "flex" : "none",
          }}
        >
          <div
            id="verifyDeleteUser"
            className="allContResponsive cage90 backgroundWhite marginAuto addonSetContainer"
            style={{ display: isVerifyDeleteUserVisible ? "block" : "none" }}
          >
            <h2>¿Estás seguro de que quieres borrar tu cuenta?</h2>
            <p
              className="adviseFormText cage90 block marginAuto"
              style={{
                display:
                  inputDeleteUserAdvise || inputDeleteUserAdvise
                    ? "flex"
                    : "none",
              }}
            >
              Inserta los datos correctamente*
            </p>
            <div className="flex flex-column cage45 marginAuto">
              <input
                type="email"
                ref={deleteVerifyEmail}
                placeholder="email: "
              />
              <input
                type="password"
                ref={deleteVerifyPassword}
                placeholder="password: "
              />
            </div>
            <div className="buttonYesNo flex justify-between cage45">
              <button
                className="tagColor1"
                onClick={() => {
                  setAddonVisible(false);
                  setVerifyDeleteUserVisible(false);
                }}
              >
                NO
              </button>
              <button className="tagColor2" onClick={deleteUserBD}>
                SI
              </button>
            </div>
          </div>
        </div>

        <div className="allContResponsive cage90 marginAuto flex flex-column">
          <div className="textPrivacyPolitics flex justify-between align-center">
            <h1>Configuración de Cuenta</h1>
            <button onClick={goBack}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="128"
                height="128"
                viewBox="0 0 24 24"
              >
                <path d="M19 7v4H5.83l3.58-3.59L8 6l-6 6l6 6l1.41-1.41L5.83 13H21V7z" />
              </svg>
            </button>
          </div>
          <form onSubmit={preventDefault}>
            <p
              className="adviseFormText cage90 block marginAuto"
              style={{
                display: inputInsertMailValidAdvise ? "flex" : "none",
              }}
            >
              Introduce un email valido*
            </p>
            <input
              type="email"
              id="email"
              name="email"
              className="cage90 marginAuto flex"
              placeholder={userSaved.email}
              ref={email}
            ></input>
            <input
              type="text"
              id="username"
              name="username"
              className="cage90 marginAuto flex"
              placeholder={userSaved.username}
              ref={username}
            />
            <p
              className="adviseFormText cage90 block marginAuto"
              style={{
                display: currentPasswordIfEditEmail ? "flex" : "none",
              }}
            >
              Introduce la contraseña actual para editar el email*
            </p>
            <input
              type="password"
              id="pastPassword"
              name="pastPassword"
              className="cage90 marginAuto flex"
              placeholder="Contraseña Anterior"
              ref={pastPassword}
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
            <input
              type="password"
              id="password"
              name="password"
              className="cage90 marginAuto flex"
              placeholder="Nueva Contraseña"
              ref={password}
            />
            <input
              type="password"
              id="repeatPassword"
              name="repeatPassword"
              className="cage90 marginAuto flex"
              placeholder="Repetir Nueva Contraseña"
              ref={repeatPassword}
            />
            <input type="submit" value="EDITAR USUARIO" onClick={editUser} />
          </form>
          <button id="deleteAccount" onClick={deleteUserAddon}>
            BORRAR CUENTA
          </button>
        </div>

        <Nav webPage="user" />
      </div>
    </>
  );
}

export default editUser;
