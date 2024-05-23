import Nav from "./../components/navComponent/navComponent";
import "./../styles/devTools.css";
import React, { useState, useEffect, useRef } from "react";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

import { getAllUsers, getAllExercises } from "./../services/userApi";

function DevTools() {
  const navigate = useNavigate();
  // ADDON GENERAL
  const [isAddonVisible, setIsAddonVisible] = useState(false);

  // SAVED INFO
  const [users, setUsers] = useState([]);
  const [exercises, setExercises] = useState([]);

  // NEED TO BE LOGED IN TO ACCESS THIS PAGE
  useEffect(() => {
    const cookies = new Cookies();
    const token = cookies.get("token");
    const urole = cookies.get("userRole");

    if (!token || urole !== 1) {
      navigate("/login");
    } else {
      getAllUsers().then((res) => {
        setUsers(res);
      });

      getAllExercises().then((res) => {
        setExercises(res);
      });
    }
  }, []);

  return (
    <>
      <div className="allCont flex flex-column align-center backgroundGradient position-relative">
        {/* ADDONS GENERAL */}
        <div
          className="addonSet align-center"
          style={{
            display: isAddonVisible || isAddonVisible ? "flex" : "none",
          }}
        ></div>
        {/* CONT GENERAL */}
        <div id="devTools" className="cage90 marginAuto flex flex-column">
          <h1>Dev Tools</h1>
          <div className="marginCages cage100 backgroundBlack flex flex-column border-r5">
            <h2>USUARIOS</h2>
            <div className="cageOfUserCard cage90 marginAuto flex flex-column">
              {users.map((user) => {
                return (
                  <div
                    className="userCard cage100 marginAuto flex justify-between align-center backgroundWhite border-r5"
                    key={user._id}
                  >
                    <div className="flex flex-column">
                      <p>{user.username}</p>
                      <p>{user.email}</p>
                    </div>
                    <div className="flex">
                      <button>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="128"
                          height="128"
                          viewBox="0 0 24 24"
                        >
                          <path d="M3 21v-4.25L16.2 3.575q.3-.275.663-.425t.762-.15t.775.15t.65.45L20.425 5q.3.275.438.65T21 6.4q0 .4-.137.763t-.438.662L7.25 21zM17.6 7.8L19 6.4L17.6 5l-1.4 1.4z" />
                        </svg>
                      </button>
                      <button>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="128"
                          height="128"
                          viewBox="0 0 24 24"
                        >
                          <path d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zm2-4h2V8H9zm4 0h2V8h-2z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="marginCages cage100 backgroundBlack flex flex-column border-r5">
            <h2>EJERCICIOS</h2>
            <div className="cageOfUserCard cage90 marginAuto flex flex-column">
              <button className="cage100 addButton flex align-center justify-center backgroundYellow border-r5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="128"
                  height="128"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M12.75 7.75h-10m5-5v10"
                  />
                </svg>
              </button>
              {exercises.map((exercise) => {
                return (
                  <div
                    className="userCard cage100 marginAuto flex justify-between align-center backgroundWhite border-r5"
                    key={exercise.pk_id_exercise}
                  >
                    <div className="flex flex-column">
                      <p>{exercise.exercise_name}</p>
                    </div>
                    <div className="flex">
                      <button>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="128"
                          height="128"
                          viewBox="0 0 24 24"
                        >
                          <path d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zm2-4h2V8H9zm4 0h2V8h-2z" />
                        </svg>
                      </button>
                      <button>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="128"
                          height="128"
                          viewBox="0 0 24 24"
                        >
                          <path d="M3 21v-4.25L16.2 3.575q.3-.275.663-.425t.762-.15t.775.15t.65.45L20.425 5q.3.275.438.65T21 6.4q0 .4-.137.763t-.438.662L7.25 21zM17.6 7.8L19 6.4L17.6 5l-1.4 1.4z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <Nav webPage="devTools" />
      </div>
    </>
  );
}

export default DevTools;
