import Nav from "./../components/navComponent/navComponent";
import "./../styles/home.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import Cookies from "universal-cookie";

import {
  getMainRoutineByUser,
  getRoutinesByUser,
  getRoutineById,
  getSessionsByRoutineId,
  getSessionExercisesBySessionId,
  getExerciseById,
  getSessionById,
} from "./../services/userApi";

function Home() {
  const navigate = useNavigate();

  // ADDON SET
  const [isAddonVisible, setIsAddonVisible] = useState(false);
  // ADDON TO START SESSION
  const [isAddonShowSessionExercises, setIsAddonShowSessionExercises] =
    useState(false);

  // SAVE DATE
  const [mainRoutine, setMainRoutine] = useState({});
  const [mainRoutineData, setMainRoutineData] = useState({});
  const [mainRoutineSessions, setMainRoutineSessions] = useState([{}]);
  const [routines, setRoutines] = useState([{}]);
  // ADDONS SELECTED DATA
  const [selectedSession, setSelectedSession] = useState({});
  const [sessionExercises, setSessionExercises] = useState([{}]);
  const [sessionExercisesData, setSessionExercisesData] = useState([]);

  // SWITCH EXERCISES
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);

  // NEED TO BE LOGED IN TO ACCESS THIS PAGE
  useEffect(() => {
    const cookies = new Cookies();
    const token = cookies.get("token");

    if (!token) {
      navigate("/login");
    } else {
      getMainRoutineByUser(token).then((data) => {
        if (data && !data.error) {
          setMainRoutine(data);

          if (data[0].fk_id_routine) {
            getRoutineById(data[0].fk_id_routine).then((data) => {
              if (data && !data.error) {
                setMainRoutineData(data);
              } else {
                console.log("No main routine found");
              }
            });

            getSessionsByRoutineId(data[0].fk_id_routine).then((data) => {
              if (data && !data.error) {
                setMainRoutineSessions(data);
              }
            });
          }
        }
      });

      getRoutinesByUser(token).then((data) => {
        if (data && !data.error) {
          setRoutines(data);
        } else {
          setRoutines([]);
          console.log("No routines found");
        }
      });
    }
  }, []);

  useEffect(() => {
    console.log("sessionExercises");
    console.log(sessionExercises);
    console.log("sessionExercisesData");
    console.log(sessionExercisesData);
    console.log("selectedSession");
    console.log(selectedSession);
  }, [sessionExercises, sessionExercisesData, selectedSession]);

  let rotuineID = 0;
  let routineName = "";
  let typeRoutine = "";
  if (Array.isArray(mainRoutineData) && mainRoutineData.length > 0) {
    rotuineID = mainRoutineData[0].pk_id_routine;
    routineName = mainRoutineData[0].routine_name;
    typeRoutine = mainRoutineData[0].type_routine;
  }

  // NAV FUNCTIONS
  const favRoutineNavigation = () => {
    navigate("/routines");
  };

  const favRoutineSessionsNavigation = (id, type_routine) => {
    if (type_routine === "semanal") {
      navigate(`/editPlanedRoutine/${id}`);
    } else {
      navigate(`/editFreeRoutine/${id}`);
    }
  };

  // ADDON FUNCTIONS
  const showExercisesAddon = (sessionId) => {
    setIsAddonVisible(true);
    setIsAddonShowSessionExercises(true);
    getSessionExercisesBySessionId(sessionId).then((data) => {
      if (data && !data.error) {
        setSessionExercises(data);
        // console.log(data);
        data.map((exercise) => {
          // console.log(exercise.fk_id_exercise);
          getExerciseById(exercise.fk_id_exercise).then((data) => {
            if (data && !data.error && Object.keys(data).length > 0) {
              setSessionExercisesData((prevData) => [...prevData, ...data]);
              // console.log(data);
            }
          });
        });
      }
    });

    getSessionById(sessionId).then((data) => {
      if (data && !data.error) {
        setSelectedSession(data);
      }
    });
  };

  const handlePrevClick = () => {
    setCurrentExerciseIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
  };

  const handleNextClick = () => {
    setCurrentExerciseIndex((prevIndex) =>
      prevIndex < sessionExercises.length - 1
        ? prevIndex + 1
        : sessionExercises.length - 1
    );
  };

  return (
    <>
      <div
        id="homeCont"
        className="allCont flex flex-column align-center backgroundGradient position-relative"
      >
        <div
          className="addonSet"
          style={{
            display: isAddonVisible ? "flex" : "none",
          }}
        >
          <div
            id="iAddonSessionExercises"
            className="cage100 backgroundBlack marginAuto addonSetContainer"
            style={{
              display: isAddonShowSessionExercises ? "block" : "none",
            }}
          >
            <div className="titleSessionExerciseHome cage75 marginAuto flex justify-between align-center">
              {selectedSession.length > 0 ? (
                <h2>{selectedSession[0].nom_session}</h2>
              ) : (
                <h2>Sesión</h2>
              )}
              <button
                onClick={() => {
                  setIsAddonVisible(false);
                  setIsAddonShowSessionExercises(false);
                  setSessionExercisesData([]);
                  setSelectedSession({});
                  setCurrentExerciseIndex(0);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="128"
                  height="128"
                  viewBox="0 0 24 24"
                >
                  <path d="M21 5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2zm-4.793 9.793l-1.414 1.414L12 13.414l-2.793 2.793l-1.414-1.414L10.586 12L7.793 9.207l1.414-1.414L12 10.586l2.793-2.793l1.414 1.414L13.414 12z" />
                </svg>
              </button>
            </div>
            <p className="time cage75 marginAuto flex">00:00</p>
            <div className="showExercisesOnAddon flex justify-between align-center">
              <button className="arrowButton" onClick={handlePrevClick}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="128"
                  height="128"
                  viewBox="0 0 1024 1024"
                >
                  <path d="M685.248 104.704a64 64 0 0 1 0 90.496L368.448 512l316.8 316.8a64 64 0 0 1-90.496 90.496L232.704 557.248a64 64 0 0 1 0-90.496l362.048-362.048a64 64 0 0 1 90.496 0" />
                </svg>
              </button>
              {sessionExercisesData.length === 0 ? (
                <div className="noExercisesText flex justify-center align-center flex-column">
                  <h2>ESTA SESIÓN NO TIENE EJERCICIOS</h2>
                  <button
                    onClick={() => {
                      const path = `/editSession/${selectedSession[0].pk_id_sessio}`;
                      navigate(path);
                    }}
                  >
                    AÑADIR EJERCICIOS
                  </button>
                </div>
              ) : (
                <div className="showExercisesContainer cage80 marginAuto backgroundWhite">
                  <div className="titleExercise">
                    <div className="flex justify-between align-center cage90 marginAuto">
                      <h3>
                        {sessionExercisesData[currentExerciseIndex] &&
                          sessionExercisesData[currentExerciseIndex]
                            .exercise_name}
                      </h3>
                      <button>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="128"
                          height="128"
                          viewBox="0 0 24 24"
                        >
                          <path d="M11 17h2v-6h-2zm1-8q.425 0 .713-.288T13 8t-.288-.712T12 7t-.712.288T11 8t.288.713T12 9m0 13q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22" />
                        </svg>
                      </button>
                    </div>
                    <div className="flex cage90 marginAuto tagCont">
                      <p className="tagGlobal tagColor1">
                        {(() => {
                          if (sessionExercisesData[currentExerciseIndex]) {
                            switch (
                              sessionExercisesData[currentExerciseIndex]
                                .fk_id_type
                            ) {
                              case 1:
                                return "Peso Libre";
                              case 2:
                                return "Calistenia";
                              case 3:
                                return "Cardio";
                              case 4:
                                return "Maquina";
                              default:
                                return "";
                            }
                          }
                          return "";
                        })()}
                      </p>
                      <p className="tagGlobal tagColor2">
                        {(() => {
                          if (sessionExercisesData[currentExerciseIndex]) {
                            switch (
                              sessionExercisesData[currentExerciseIndex]
                                .fk_category_1
                            ) {
                              case 1:
                                return "Pecho";
                              case 2:
                                return "Brazos";
                              case 3:
                                return "Espalda";
                              case 4:
                                return "Piernas";
                              default:
                                return "";
                            }
                          }
                          return "";
                        })()}
                      </p>
                    </div>
                  </div>
                  <div className="tableExercises">
                    <div className="tableExercisesHeader flex justify-between tagCont">
                      <p>SERIE</p>
                      <p>KG</p>
                      <p>REP</p>
                      <p>KG-A</p>
                      <p>REP-A</p>
                    </div>
                    <div className="tableExercisesBody flex flex-column">
                      <div className="flex justify-between tagCont">
                        <p>1</p>
                        <input
                          type="number"
                          className="backgroundYellow"
                          placeholder="20"
                        />
                        <input
                          type="number"
                          className="backgroundYellow"
                          placeholder="10"
                        />
                        <input
                          type="number"
                          className="backgroundBlack"
                          placeholder="20"
                        />
                        <input
                          type="number"
                          className="backgroundBlack"
                          placeholder="10"
                        />
                      </div>
                      <div className="flex justify-between tagCont">
                        <p>2</p>
                        <input
                          type="number"
                          className="backgroundYellow"
                          placeholder="20"
                        />
                        <input
                          type="number"
                          className="backgroundYellow"
                          placeholder="10"
                        />
                        <input
                          type="number"
                          className="backgroundBlack"
                          placeholder="20"
                        />
                        <input
                          type="number"
                          className="backgroundBlack"
                          placeholder="10"
                        />
                      </div>
                      <div className="flex justify-between tagCont">
                        <p>3</p>
                        <input
                          type="number"
                          className="backgroundYellow"
                          placeholder="20"
                        />
                        <input
                          type="number"
                          className="backgroundYellow"
                          placeholder="10"
                        />
                        <input
                          type="number"
                          className="backgroundBlack"
                          placeholder="20"
                        />
                        <input
                          type="number"
                          className="backgroundBlack"
                          placeholder="10"
                        />
                      </div>
                      <div className="flex justify-between tagCont">
                        <p>4</p>
                        <input
                          type="number"
                          className="backgroundYellow"
                          placeholder="20"
                        />
                        <input
                          type="number"
                          className="backgroundYellow"
                          placeholder="10"
                        />
                        <input
                          type="number"
                          className="backgroundBlack"
                          placeholder="20"
                        />
                        <input
                          type="number"
                          className="backgroundBlack"
                          placeholder="10"
                        />
                      </div>
                      <div className="flex justify-between tagCont">
                        <p>5</p>
                        <input
                          type="number"
                          className="backgroundYellow"
                          placeholder="20"
                        />
                        <input
                          type="number"
                          className="backgroundYellow"
                          placeholder="10"
                        />
                        <input
                          type="number"
                          className="backgroundBlack"
                          placeholder="20"
                        />
                        <input
                          type="number"
                          className="backgroundBlack"
                          placeholder="10"
                        />
                      </div>
                      <div className="flex justify-between tagCont">
                        <p>6</p>
                        <input
                          type="number"
                          className="backgroundYellow"
                          placeholder="20"
                        />
                        <input
                          type="number"
                          className="backgroundYellow"
                          placeholder="10"
                        />
                        <input
                          type="number"
                          className="backgroundBlack"
                          placeholder="20"
                        />
                        <input
                          type="number"
                          className="backgroundBlack"
                          placeholder="10"
                        />
                      </div>
                      <div className="flex justify-between tagCont">
                        <p>7</p>
                        <input
                          type="number"
                          className="backgroundYellow"
                          placeholder="20"
                        />
                        <input
                          type="number"
                          className="backgroundYellow"
                          placeholder="10"
                        />
                        <input
                          type="number"
                          className="backgroundBlack"
                          placeholder="20"
                        />
                        <input
                          type="number"
                          className="backgroundBlack"
                          placeholder="10"
                        />
                      </div>
                      <div className="flex justify-between tagCont">
                        <p>8</p>
                        <input
                          type="number"
                          className="backgroundYellow"
                          placeholder="20"
                        />
                        <input
                          type="number"
                          className="backgroundYellow"
                          placeholder="10"
                        />
                        <input
                          type="number"
                          className="backgroundBlack"
                          placeholder="20"
                        />
                        <input
                          type="number"
                          className="backgroundBlack"
                          placeholder="10"
                        />
                      </div>
                      <div className="flex justify-between tagCont">
                        <p>9</p>
                        <input
                          type="number"
                          className="backgroundYellow"
                          placeholder="20"
                        />
                        <input
                          type="number"
                          className="backgroundYellow"
                          placeholder="10"
                        />
                        <input
                          type="number"
                          className="backgroundBlack"
                          placeholder="20"
                        />
                        <input
                          type="number"
                          className="backgroundBlack"
                          placeholder="10"
                        />
                      </div>
                      <button className="plusButtonSerie flex justify-center align-center backgroundYellow border-r5">
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
                    </div>
                  </div>
                </div>
              )}
              <button
                className="arrowButton arrowRotated"
                onClick={handleNextClick}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="128"
                  height="128"
                  viewBox="0 0 1024 1024"
                >
                  <path d="M685.248 104.704a64 64 0 0 1 0 90.496L368.448 512l316.8 316.8a64 64 0 0 1-90.496 90.496L232.704 557.248a64 64 0 0 1 0-90.496l362.048-362.048a64 64 0 0 1 90.496 0" />
                </svg>
              </button>
            </div>
            <button className="endSession">FINALIZAR</button>
          </div>
        </div>
        <div className="cage90 marginTop-20" id="home">
          {!mainRoutine || Object.keys(mainRoutine).length === 0 ? (
            <div
              className="routinesShow border-r5 backgroundBlack"
              id="favoriteRoutine"
              onClick={favRoutineNavigation}
            >
              <h2>
                {routines.length === 0
                  ? "CREA UNA RUTINA"
                  : "ESTABLECE UNA RUTINA FAVORITA"}
              </h2>
            </div>
          ) : (
            <div className="routinesShow2 border-r5 backgroundBlack">
              <h2 style={{ textAlign: "left" }}>{routineName}</h2>
              <div className="routineCageContainer cage95 marginAuto flex justify-start">
                {mainRoutineSessions.length > 0 ? (
                  mainRoutineSessions.map((session, index) => {
                    return (
                      <div
                        key={index}
                        className="sessionCage backgroundWhite border-r5"
                      >
                        <h3>{session.nom_session}</h3>
                        <button
                          onClick={() =>
                            showExercisesAddon(session.pk_id_sessio)
                          }
                        >
                          START
                        </button>
                      </div>
                    );
                  })
                ) : (
                  <div
                    className="sessionCage backgroundWhite border-r5"
                    style={{ width: "140px", maxWidth: "150px" }}
                  >
                    <h3>No hay sesiones</h3>
                    <button
                      onClick={() =>
                        favRoutineSessionsNavigation(rotuineID, typeRoutine)
                      }
                    >
                      CREA UNA
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
          {routines.length === 0 ? (
            <div
              className="routinesShow border-r5 backgroundBlack flex justify-center align-center"
              id="allRoutines"
              onClick={() => navigate("/routines")}
            >
              <h2>CREA MAS DE UNA RUTINA</h2>
            </div>
          ) : (
            <div className="routinesShow2 border-r5 backgroundBlack flex flex-column">
              <h2 style={{ textAlign: "left" }}>Otras Rutinas</h2>
              <div className="routineCageContainer cage95 marginAuto flex justify-start">
                {routines.map((routine, index) => (
                  <div
                    key={index}
                    className="routineCage backgroundWhite border-r5"
                  >
                    <h3>{routine.routine_name}</h3>
                    <p className="tagGlobal tagColor2">
                      {routine.type_routine === "semanal"
                        ? "Semanal"
                        : "Planificada"}
                    </p>
                    <button>START</button>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div
            id="calendarRoutines"
            className="border-r5 backgroundBlack cage100"
          >
            <p>Calendario</p>
            <div id="days" className="">
              <div className="dayCage"></div>
              <div className="dayCage"></div>
              <div className="dayCage"></div>
              <div className="dayCage"></div>
              <div className="dayCage"></div>
              <div className="dayCage"></div>
              <div className="dayCage"></div>
              <div className="dayCage"></div>
              <div className="dayCage"></div>
              <div className="dayCage"></div>
              <div className="dayCage"></div>
              <div className="dayCage"></div>
              <div className="dayCage"></div>
              <div className="dayCage"></div>
              <div className="dayCage"></div>
              <div className="dayCage"></div>
              <div className="dayCage"></div>
              <div className="dayCage"></div>
              <div className="dayCage"></div>
              <div className="dayCage"></div>
              <div className="dayCage"></div>
              <div className="dayCage"></div>
              <div className="dayCage"></div>
              <div className="dayCage"></div>
              <div className="dayCage"></div>
              <div className="dayCage"></div>
              <div className="dayCage"></div>
              <div className="dayCage"></div>
              <div className="dayCage"></div>
              <div className="dayCage"></div>
              <div className="dayCage"></div>
              <div className="dayCage"></div>
              <div className="dayCage"></div>
              <div className="dayCage"></div>
              <div className="dayCage"></div>
              <div className="dayCage"></div>
              <div className="dayCage"></div>
              <div className="dayCage"></div>
              <div className="dayCage"></div>
              <div className="dayCage"></div>
              <div className="dayCage"></div>
              <div className="dayCage"></div>
              <div className="dayCage"></div>
              <div className="dayCage"></div>
              <div className="dayCage"></div>
              <div className="dayCage"></div>
              <div className="dayCage"></div>
              <div className="dayCage"></div>
              <div className="dayCage"></div>
              <div className="dayCage"></div>
              <div className="dayCage"></div>
              <div className="dayCage"></div>
              <div className="dayCage"></div>
              <div className="dayCage"></div>
              <div className="dayCage"></div>
              <div className="dayCage"></div>
              <div className="dayCage"></div>
              <div className="dayCage"></div>
              <div className="dayCage"></div>
              <div className="dayCage"></div>
              <div className="dayCage"></div>
              <div className="dayCage"></div>
              <div className="dayCage"></div>
              <div className="dayCage"></div>
              <div className="dayCage"></div>
              <div className="dayCage"></div>
              <div className="dayCage"></div>
              <div className="dayCage"></div>
              <div className="dayCage"></div>
              <div className="dayCage"></div>
              <div className="dayCage"></div>
              <div className="dayCage"></div>
              <div className="dayCage"></div>
              <div className="dayCage"></div>
              <div className="dayCage"></div>
              <div className="dayCage"></div>
              <div className="dayCage"></div>
              <div className="dayCage"></div>
              <div className="dayCage"></div>
              <div className="dayCage"></div>
              <div className="dayCage"></div>
              <div className="dayCage"></div>
              <div className="dayCage"></div>
              <div className="dayCage"></div>
              <div className="dayCage"></div>
              <div className="dayCage"></div>
              <div className="dayCage"></div>
              <div className="dayCage"></div>
              <div className="dayCage"></div>
              <div className="dayCage"></div>
              <div className="dayCage"></div>
              <div className="dayCage"></div>
              <div className="dayCage"></div>
              <div className="dayCage"></div>
              <div className="dayCage"></div>
              <div className="dayCage"></div>
              <div className="dayCage"></div>
              <div className="dayCage"></div>
              <div className="dayCage"></div>
              <div className="dayCage"></div>
              <div className="dayCage"></div>
              <div className="dayCage"></div>
              <div className="dayCage"></div>
              <div className="dayCage"></div>
              <div className="dayCage"></div>
              <div className="dayCage"></div>
              <div className="dayCage"></div>
              <div className="dayCage"></div>
              <div className="dayCage"></div>
              <div className="dayCage"></div>
              <div className="dayCage"></div>
              <div className="dayCage"></div>
              <div className="dayCage"></div>
              <div className="dayCage"></div>
              <div className="dayCage"></div>
              <div className="dayCage"></div>
              <div className="dayCage"></div>
              <div className="dayCage"></div>
              <div className="dayCage"></div>
              <div className="dayCage"></div>
              <div className="dayCage"></div>
              <div className="dayCage"></div>
              <div className="dayCage"></div>
              <div className="dayCage"></div>
              <div className="dayCage"></div>
              <div className="dayCage"></div>
            </div>
          </div>
          <div id="showStats" className="flex justify-between align-center">
            <div className="cageStat backgroundBlack">
              <h2>08</h2>
              <h3>Dias Completados</h3>
            </div>
            <div className="cageStat backgroundBlack">
              <h2>02</h2>
              <h3>Racha de Semanas</h3>
            </div>
          </div>
        </div>
        <Nav webPage="home" />
      </div>
    </>
  );
}

export default Home;
