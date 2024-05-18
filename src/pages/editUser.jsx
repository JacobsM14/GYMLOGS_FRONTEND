import Nav from "./../components/navComponent/navComponent";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

import {
  getUserById,
  updateUserEmail,
  updateUserUsername,
  updateUserPassword,
} from "./../services/userApi";

function editUser() {
  const navigate = useNavigate();

  // FORM REFS
  const email = useRef();
  const username = useRef();
  const password = useRef();
  const pastPassword = useRef();
  const repeatPassword = useRef();

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

  // DATABASE FUNCTIONS
  const editUser = (e) => {
    let newEmail = email.current.value;
    let newUsername = username.current.value;
    let newPassword = password.current.value;
    let newpastPassword = pastPassword.current.value;

    if (newEmail !== "") {
      updateUserEmail(userSaved.pk_id_user, newEmail).then((response) => {
        if (response && !response.error) {
          closeSession();
        }
      });
    }
    if (newUsername !== "") {
      console.log("newUsername: " + newUsername);
      updateUserUsername(userSaved.pk_id_user, newUsername).then((response) => {
        console.log(response);
        // goBack();
      });
    }

    if (newPassword !== "" && newpastPassword !== "" && newPassword === repeatPassword.current.value) {
      updateUserPassword(
        userSaved.pk_id_user,
        newPassword,
        newpastPassword
      ).then((response) => {
        if (response && !response.error) {
          closeSession();
        }
      });
    }
  };

  return (
    <>
      <div
        id="userEditPage"
        className="allCont flex flex-column align-center backgroundBlack position-relative"
      >
        <div className=" cage90 marginAuto flex flex-column">
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
            <input
              type="password"
              id="pastPassword"
              name="pastPassword"
              className="cage90 marginAuto flex"
              placeholder="Contraseña Anterior"
              ref={pastPassword}
            />
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
        </div>

        <Nav webPage="user" />
      </div>
    </>
  );
}

export default editUser;
