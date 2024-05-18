import Nav from "./../components/navComponent/navComponent";
import "./../styles/editRoutine.css";
import React, { useState, useEffect, useRef } from "react";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

//IMPORT API
import {
  getRoutineById,
  getSessionsByRoutineId,
  deleteSessionById,
  updateRoutineDays,
  createSessionFreeRoutine,
  updateRoutineName,
  deleteRoutineById,
  getMainRoutineByUser,
  createMainRoutine,
  deleteMainRoutineByUser,
  getMainRoutineByUserAndRoutine,
} from "./../services/userApi";

function editPlanedRoutine() {
  const navigate = useNavigate();

  // ON START THE PAGE
  const { id } = useParams();
  const [sessions, setSessions] = useState([]);
  const [routine, setRoutine] = useState([]);

  // ADDON STATES
  const [isAddonVisible, setAddonVisible] = useState(false);
  const [isNewSessionVisible, setNewSessionVisible] = useState(false);
  const [isDeleteSessionVisible, setDeleteSessionVisible] = useState(false);
  const [isEditRoutineVisible, setEditRoutineVisible] = useState(false);
  const [isConfirmDeleteRoutine, setConfirmDeleteRoutine] = useState(false);
  const [isSetAsMainRoutine, setSetAsMainRoutine] = useState(false);
  const [isDeleteAsMainRoutine, setDeleteAsMainRoutine] = useState(false);

  // SAVE CONTENT
  const [selectedSession, setSelectedSession] = useState("");
  const [inputRoutineName, setInputRoutineName] = useState("");
  const inputAddSession = useRef();
  const [isMainRoutine, setIsMainRoutine] = useState(false);
  const [isMainRoutine2, setIsMainRoutine2] = useState(false);

  // NEED TO BE LOGED IN TO ACCESS THIS PAGE
  useEffect(() => {
    const cookies = new Cookies();
    const token = cookies.get("token");

    if (!token) {
      navigate("/login");
    } else {
      getSessionsByRoutineId(id)
        .then((res) => {
          if (res && !res.error) {
            // Filter out duplicates before updating sessions
            setSessions((prevSessions) => {
              const newSessions = res.filter(
                (newSession) =>
                  !prevSessions.some(
                    (prevSession) =>
                      prevSession.pk_id_sessio === newSession.pk_id_sessio
                  )
              );
              return [...prevSessions, ...newSessions];
            });
            getRoutineById(id).then((res) => {
              if (res && !res.error) {
                setRoutine(res);
              } else {
                navigate("/routines");
              }
            });
          } else {
            navigate("/routines");
          }
        })
        .catch((error) => console.error(error));

      getMainRoutineByUserAndRoutine(id, token).then((res) => {
        if (res.status === 404) {
          console.log("Main routine not found");
          setIsMainRoutine(false);
        } else if (res.error) {
          console.error("Error:", res.error);
          setIsMainRoutine(false);
        } else {
          setIsMainRoutine(true);
          // console.log("es main");
        }
      });

      getMainRoutineByUser(token).then((res) => {
        if (res && !res.error) {
          setIsMainRoutine2(true);
        } else {
          setIsMainRoutine2(false);
        }
      });
    }
  }, [id]);

  const updateInputRoutineName = (e) => {
    setInputRoutineName(e.target.value);
  };

  // MOVE TO ROUTINES
  const getBack = () => {
    navigate("/routines");
  };

  const editSession = (id) => {
    navigate(`/editSession/${id}`);
  };

  //ADDON FUNCTIONS
  const addonNewSession = () => {
    if (isNewSessionVisible) {
      setAddonVisible(false);
      setNewSessionVisible(false);
    } else {
      setAddonVisible(true);
      setNewSessionVisible(true);
    }
  };

  const addonDeleteSession = (sessionToDelete) => {
    if (isDeleteSessionVisible) {
      setAddonVisible(false);
      setDeleteSessionVisible(false);
      setSelectedSession("");
    } else if (sessionToDelete !== undefined) {
      setAddonVisible(true);
      setDeleteSessionVisible(true);
      setSelectedSession(sessionToDelete);
    }
  };

  const addonEditRoutine = () => {
    if (isEditRoutineVisible) {
      setAddonVisible(false);
      setEditRoutineVisible(false);
    } else {
      setAddonVisible(true);
      setEditRoutineVisible(true);
    }
  };

  const addonDeleteRoutine = () => {
    if (isConfirmDeleteRoutine) {
      setAddonVisible(true);
      setConfirmDeleteRoutine(false);
      setEditRoutineVisible(true);
    } else {
      setAddonVisible(true);
      setConfirmDeleteRoutine(true);
      setEditRoutineVisible(false);
    }
  };

  const addonSelectWithMainRoutine = () => {
    if (isMainRoutine) {
      addonDeleteAsMainRoutine();
    } else {
      addonSetAsMainRoutine();
    }
  };

  const addonSetAsMainRoutine = () => {
    if (isSetAsMainRoutine) {
      setAddonVisible(false);
      setSetAsMainRoutine(false);
    } else {
      setAddonVisible(true);
      setSetAsMainRoutine(true);
    }
  };

  const addonDeleteAsMainRoutine = () => {
    if (isDeleteAsMainRoutine) {
      setAddonVisible(false);
      setDeleteAsMainRoutine(false);
    } else {
      setAddonVisible(true);
      setDeleteAsMainRoutine(true);
    }
  };

  // DATABASE FUNCTIONS
  //ROTUINE
  const updateNameRoutine = () => {
    if (inputRoutineName !== "") {
      updateRoutineName(id, inputRoutineName)
        .then((res) => {
          if (res && !res.error) {
            setRoutine([{ ...routine[0], routine_name: inputRoutineName }]);
            setAddonVisible(false);
            setEditRoutineVisible(false);
          }
        })
        .catch((error) => console.error(error));
    }
  };

  const deleteRoutine = () => {
    deleteRoutineById(id)
      .then((res) => {
        if (res && !res.error) {
          navigate("/routines");
        }
      })
      .catch((error) => console.error(error));
  };

  // SESSION
  const deleteSession = () => {
    let day_routineSelected = JSON.parse(routine[0].day_routine);

    sessions.forEach((session) => {
      if (session.pk_id_sessio === selectedSession) {
        let index = day_routineSelected.indexOf(session.week_day);
        day_routineSelected.splice(index, 1);
      }
    });

    deleteSessionById(selectedSession)
      .then((res) => {
        if (res && !res.error) {
          updateRoutineDays(id, null, JSON.stringify(day_routineSelected));
          setSessions(
            sessions.filter(
              (session) => session.pk_id_sessio !== selectedSession
            )
          );
          setAddonVisible(false);
          setDeleteSessionVisible(false);
          setSelectedSession("");
        }
      })
      .catch((error) => console.error(error));
  };

  const createSession = () => {
    //   updateRoutineDays(
    //     routine[0].pk_id_routine,
    //     null,
    //     null
    //   );
    let newSession = inputAddSession.current.value;
    createSessionFreeRoutine(newSession, id).then((res) => {
      if (res && !res.error) {
        setSessions([...sessions, res]);
        setAddonVisible(false);
        setNewSessionVisible(false);
        inputAddSession.current.value = "";
      }
    });

    // createSessionFreeRoutine()
  };

  // MAIN ROUTINE
  const handleMainRoutineCreation = async () => {
    const cookies = new Cookies();
    const user_id = cookies.get("token");
    let routine_id = JSON.parse(id); // replace with the actual routine id

    if (!isMainRoutine && !isMainRoutine2) {
      await createMainRoutine(user_id, routine_id).then((res) => {
        if (res && !res.error) {
          console.log("Main routine created");
          setIsMainRoutine(true);
          setIsMainRoutine2(true);
          setAddonVisible(false);
          setSetAsMainRoutine(false);
        }
      });
    } else if (!isMainRoutine && isMainRoutine2) {
      deleteMainRoutineByUser(user_id).then((res) => {
        if (res && !res.error) {
          createMainRoutine(user_id, routine_id).then((res) => {
            if (res && !res.error) {
              console.log("Main routine created");
              setIsMainRoutine(true);
              setIsMainRoutine2(true);
              setAddonVisible(false);
              setSetAsMainRoutine(false);
            }
          });
        }
      });
    }
  };

  const handleMainRoutineDeletion = async () => {
    const cookies = new Cookies();
    const user_id = cookies.get("token");

    deleteMainRoutineByUser(user_id).then((res) => {
      if (res && !res.error) {
        // console.log("Main routine deleted");
        setIsMainRoutine(false);
        setIsMainRoutine2(false);
        setAddonVisible(false);
        setDeleteAsMainRoutine(false);
      }
    });
  };

  return (
    <>
      <div className="allCont flex flex-column align-center backgroundGradient position-relative">
        {/* ADDONS GENERAL */}
        <div
          className="addonSet align-center"
          style={{
            display: isAddonVisible ? "flex" : "none",
          }}
        >
          <div
            id="createFreeRoutine"
            className="cage90 backgroundWhite marginAuto addonSetContainer"
            style={{ display: isNewSessionVisible ? "block" : "none" }}
          >
            <div className="cage90 marginAuto flex align-center justify-between">
              <h2>CREA UNA NUEVA SESSION</h2>
              <svg
                onClick={addonNewSession}
                xmlns="http://www.w3.org/2000/svg"
                width="128"
                height="128"
                viewBox="0 0 24 24"
              >
                <path d="M21 5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2zm-4.793 9.793l-1.414 1.414L12 13.414l-2.793 2.793l-1.414-1.414L10.586 12L7.793 9.207l1.414-1.414L12 10.586l2.793-2.793l1.414 1.414L13.414 12z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Nombre de la Session: "
              ref={inputAddSession}
            />
            <button className="createRutineAddonButton" onClick={createSession}>
              CREAR SESSION
            </button>
          </div>
          <div
            id="verificateDeleteSession"
            className="cage90 backgroundWhite marginAuto addonSetContainer"
            style={{ display: isDeleteSessionVisible ? "block" : "none" }}
          >
            <h2>¿Estas seguro de que quieres eliminar esta session?</h2>
            <div className="flex justify-between cage45 marginAuto">
              <button className="tagColor1" onClick={addonDeleteSession}>
                NO
              </button>
              <button className="tagColor2" onClick={deleteSession}>
                SI
              </button>
            </div>
          </div>
          <div
            id="editRoutine"
            className="cage90 backgroundWhite marginAuto addonSetContainer"
            style={{ display: isEditRoutineVisible ? "block" : "none" }}
          >
            <div className="cage90 marginAuto flex align-center justify-between">
              <h2>EDITAR O ELIMINAR RUTINA</h2>
              <svg
                onClick={addonEditRoutine}
                xmlns="http://www.w3.org/2000/svg"
                width="128"
                height="128"
                viewBox="0 0 24 24"
              >
                <path d="M21 5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2zm-4.793 9.793l-1.414 1.414L12 13.414l-2.793 2.793l-1.414-1.414L10.586 12L7.793 9.207l1.414-1.414L12 10.586l2.793-2.793l1.414 1.414L13.414 12z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Nombre de la rutina"
              onChange={updateInputRoutineName}
            />
            <div className="flex justify-between cage80 marginAuto">
              <button className="tagColor1" onClick={updateNameRoutine}>
                GUARDAR
              </button>
              <button className="tagColor3" onClick={addonDeleteRoutine}>
                ELIMINAR
              </button>
            </div>
          </div>
          <div
            id="confirmDeleteRoutine"
            className="cage90 backgroundWhite marginAuto addonSetContainer"
            style={{ display: isConfirmDeleteRoutine ? "block" : "none" }}
          >
            <h2>¿Estas seguro de que quieres eliminar esta rutina?</h2>
            <div className="flex justify-between cage45 marginAuto">
              <button className="tagColor1" onClick={addonDeleteRoutine}>
                NO
              </button>
              <button className="tagColor2" onClick={deleteRoutine}>
                SI
              </button>
            </div>
          </div>
          <div
            id="setAsMainRoutine"
            className="cage90 backgroundWhite marginAuto addonSetContainer"
            style={{ display: isSetAsMainRoutine ? "block" : "none" }}
          >
            <h2>¿Quieres establecer esta rutina como principal?</h2>
            <div className="flex justify-between cage45 marginAuto">
              <button className="tagColor1" onClick={addonSetAsMainRoutine}>
                NO
              </button>
              <button className="tagColor2" onClick={handleMainRoutineCreation}>
                SI
              </button>
            </div>
          </div>
          <div
            id="deleteMainRoutine"
            className="cage90 backgroundWhite marginAuto addonSetContainer"
            style={{ display: isDeleteAsMainRoutine ? "block" : "none" }}
          >
            <h2>¿Quieres que esta rutina deje de ser tu principal?</h2>
            <div className="flex justify-between cage45 marginAuto">
              <button className="tagColor1" onClick={addonDeleteAsMainRoutine}>
                NO
              </button>
              <button className="tagColor2" onClick={handleMainRoutineDeletion}>
                SI
              </button>
            </div>
          </div>
        </div>
        {/* PAGE CONTENT */}
        <div id="editPlanedSession" className="cage90 flex flex-column">
          <div className="editRoutineShowName flex justify-between ">
            {routine.map((routine, index) => (
              <div className="textEditRoutinShowLimitation flex" key={index}>
                <button
                  className={isMainRoutine ? "starIconActive" : "starIcon"}
                  onClick={addonSelectWithMainRoutine}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="128"
                    height="128"
                    viewBox="0 0 24 24"
                  >
                    <path d="m5.825 21l2.325-7.6L2 9h7.6L12 1l2.4 8H22l-6.15 4.4l2.325 7.6L12 16.3z" />
                  </svg>
                </button>
                <div className="block">
                  <h2>{routine.routine_name}</h2>
                  <p className="tagGlobal tagColor1">
                    {routine.type_routine === "semanal"
                      ? "PLANIFICADA"
                      : routine.type_routine === "libre"
                      ? "LIBRE"
                      : ""}
                  </p>
                </div>
              </div>
            ))}
            <button onClick={addonEditRoutine}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="128"
                height="128"
                viewBox="0 0 24 24"
              >
                <path d="M3 21v-4.25L16.2 3.575q.3-.275.663-.425t.762-.15t.775.15t.65.45L20.425 5q.3.275.438.65T21 6.4q0 .4-.137.763t-.438.662L7.25 21zM17.6 7.8L19 6.4L17.6 5l-1.4 1.4z" />
              </svg>
            </button>
            {/* <button
              className="flex justify-center align-center"
              onClick={getBack}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="128"
                height="128"
                viewBox="0 0 24 24"
              >
                <path d="M19 7v4H5.83l3.58-3.59L8 6l-6 6l6 6l1.41-1.41L5.83 13H21V7z" />
              </svg>
            </button> */}
          </div>

          {sessions.map((session, index) => (
            <div
              className="editEachSession backgroundBlack flex justify-between align-center"
              key={index}
            >
              <h2>{session.nom_session}</h2>

              <div className="contButtonsEditRoutine">
                <button onClick={() => editSession(session.pk_id_sessio)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="128"
                    height="128"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M20.77 12c0-.359-.194-.594-.582-1.066C18.768 9.21 15.636 6 12 6c-3.636 0-6.768 3.21-8.188 4.934c-.388.472-.582.707-.582 1.066c0 .359.194.594.582 1.066C5.232 14.79 8.364 18 12 18c3.636 0 6.768-3.21 8.188-4.934c.388-.472.582-.707.582-1.066M12 15a3 3 0 1 0 0-6a3 3 0 0 0 0 6"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => addonDeleteSession(session.pk_id_sessio)}
                >
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
          ))}
          <button className="addSession" onClick={addonNewSession}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="128"
              height="128"
              viewBox="0 0 16 16"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M12.75 7.75h-10m5-5v10"
              />
            </svg>
          </button>
        </div>
        <Nav webPage="rutina" />
      </div>
    </>
  );
}

export default editPlanedRoutine;
