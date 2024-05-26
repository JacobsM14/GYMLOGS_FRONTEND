import Nav from "./../components/navComponent/navComponent";
import GitCalendar from "./../components/gitCalendar/gitCalendar";
import "./../styles/home.css";
import "./../styles/responsiveContent.css";
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
  getCalendarBySessionExerciseId,
  getCalendarBySessionExerciseAndDate,
  createCalendar,
  deleteCalendarById,
} from "./../services/userApi";

function Home() {
  const navigate = useNavigate();

  // ADDON SET
  const [isAddonVisible, setIsAddonVisible] = useState(false);
  const [isAddon2Visible, setAddon2Visible] = useState(false);

  // ADDON TO START SESSION
  const [isAddonShowSessionExercises, setIsAddonShowSessionExercises] =
    useState(false);
  // ADON TO START ROUTINE
  const [isAddonShowSessionRotine, setIsAddonShowSessionRotine] =
    useState(false);
  const [isAddon2ShowExerciseDescription, setAddon2ShowExerciseDescription] =
    useState(false);

  // SAVE DATE
  const [mainRoutine, setMainRoutine] = useState({});
  const [mainRoutineData, setMainRoutineData] = useState({});
  const [mainRoutineSessions, setMainRoutineSessions] = useState([{}]);
  const [routines, setRoutines] = useState([{}]);
  // ADDONS SELECTED DATA
  const [selectedSession, setSelectedSession] = useState({});
  const [selectedRoutine, setSelectedRoutine] = useState({});
  const [selectedRoutineData, setSelectedRoutineData] = useState({});
  const [sessionExercises, setSessionExercises] = useState([{}]);
  const [sessionExercisesData, setSessionExercisesData] = useState([]);

  // CALENDAR DATA
  const [currentSessionExerciseId, setCurrentSessionExerciseId] =
    useState(null);
  const [series, setSeries] = useState([{}]);
  const [newSeries, setNewSeries] = useState({ weight: "", repetitions: "" });
  const [currentExerciseId, setCurrentExerciseId] = useState(null);

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
        }
      });
    }
  }, []);

  useEffect(() => {
    if (currentExerciseIndex !== null && sessionExercises.length > 0) {
      setCurrentExerciseId(
        sessionExercises[currentExerciseIndex].pk_id_sessio_ex
      );
      setCurrentSessionExerciseId(
        sessionExercises[currentExerciseIndex].pk_id_sessio_ex
      );

      getCalendarBySessionExerciseId(
        sessionExercises[currentExerciseIndex].pk_id_sessio_ex
      ).then((data) => {
        if (data && !data.error) {
          const relevantData = data[0];

          const sortedData = relevantData.sort(
            (a, b) => new Date(b.day) - new Date(a.day)
          );

          const lastItem = sortedData[0];

          const sameDateItems = sortedData.filter(
            (item) =>
              new Date(item.day).getTime() === new Date(lastItem.day).getTime()
          );

          if (Array.isArray(sameDateItems) && sameDateItems != null) {
            setSeries((prevSeries) => {
              const newItems = sameDateItems.filter((item) => {
                const itemExistsInPrevSeries = prevSeries.some(
                  (prevItem) => prevItem.pk_id_calendar === item.pk_id_calendar
                );

                return !itemExistsInPrevSeries;
              });

              const updatedSeries = [...prevSeries, ...newItems];
              return updatedSeries;
            });
          }
        }
      });
    }
  }, [currentExerciseIndex, sessionExercises]);

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
  const showSessionRoutineAddon = (routineId) => {
    setIsAddonVisible(true);
    setIsAddonShowSessionRotine(true);

    getRoutineById(routineId).then((data) => {
      if (data && !data.error) {
        setSelectedRoutine(data);
      }
    });

    getSessionsByRoutineId(routineId).then((data) => {
      if (data && !data.error) {
        setSelectedRoutineData(data);
      }
    });
  };

  const showExercisesAddon = (sessionId) => {
    setIsAddonVisible(true);
    setIsAddonShowSessionRotine(false);
    setIsAddonShowSessionExercises(true);

    getSessionExercisesBySessionId(sessionId).then((data) => {
      if (data && !data.error) {
        setSessionExercises(data);

        if (
          currentSessionExerciseId == null ||
          currentSessionExerciseId == undefined
        ) {
          setCurrentSessionExerciseId(data[0].pk_id_sessio_ex);
        }
        data.map((exercise) => {
          getExerciseById(exercise.fk_id_exercise).then((data) => {
            if (data && !data.error && Object.keys(data).length > 0) {
              setSessionExercisesData((prevData) => [...prevData, ...data]);
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
    setCurrentExerciseIndex((prevIndex) => {
      const newIndex = prevIndex > 0 ? prevIndex - 1 : 0;

      setNewSeries((prevNewSeries) => {
        if (!prevNewSeries[sessionExercises[newIndex].id]) {
          return {
            ...prevNewSeries,
            [sessionExercises[newIndex].id]: {
              serie: 1,
              weight: "",
              repetitions: "",
            },
          };
        }

        return prevNewSeries;
      });

      return newIndex;
    });
  };

  const handleNextClick = () => {
    setCurrentExerciseIndex((prevIndex) => {
      const newIndex =
        prevIndex < sessionExercises.length - 1
          ? prevIndex + 1
          : sessionExercises.length - 1;

      setNewSeries((prevNewSeries) => {
        if (!prevNewSeries[sessionExercises[newIndex].id]) {
          return {
            ...prevNewSeries,
            [sessionExercises[newIndex].id]: {
              serie: 1,
              weight: "",
              repetitions: "",
            },
          };
        }

        return prevNewSeries;
      });

      return newIndex;
    });
  };

  const handleAddSeries = (exerciseId) => {
    const newSerie = {
      fk_id_session_ex: exerciseId,
      serie:
        series.filter((serie) => serie.fk_id_session_ex === exerciseId).length +
        1,
      weight: newSeries[exerciseId]?.weight || 0,
      repetitions: newSeries[exerciseId]?.repetitions || 0,
      date: new Date().toISOString().split("T")[0], // fecha de hoy en formato yyyy-mm-dd
    };

    setSeries((prevSeries) => [...prevSeries, newSerie]);
    setNewSeries((prevNewSeries) => ({
      ...prevNewSeries,
      [exerciseId]: { weight: "", repetitions: "" },
    }));
  };

  const handleWeightChange = (value, serieNumber, sessionExId) => {
    const updatedSeries = series.map((serie) => {
      if (
        serie.serie === serieNumber &&
        serie.fk_id_session_ex === sessionExId
      ) {
        return { ...serie, weight: Number(value) };
      } else {
        return serie;
      }
    });
    setSeries(updatedSeries);
  };

  const handleRepetitionsChange = (value, serieNumber, sessionExId) => {
    const updatedSeries = series.map((serie) => {
      if (
        serie.serie === serieNumber &&
        serie.fk_id_session_ex === sessionExId
      ) {
        return { ...serie, repetitions: Number(value) };
      } else {
        return serie;
      }
    });
    setSeries(updatedSeries);
  };

  const createCalendarData = () => {
    // Obtener la fecha de hoy en formato yyyy-mm-dd
    const today = new Date();
    const fullDate = today.toISOString().split("T")[0];
    const todayFormatted = today.toISOString().split("T")[0];

    // Obtener los pk_id_calendar de las series de ejercicios creadas hoy
    const calendarIdsToDelete = series
      .filter((serie) => {
        const serieDay = serie.day ? serie.day.split("T")[0] : undefined;
        return serieDay === fullDate;
      })
      .map((serie) => serie.pk_id_calendar);

    if (
      calendarIdsToDelete[0] != undefined ||
      calendarIdsToDelete.length != 0
    ) {
      calendarIdsToDelete.forEach((calendarId) => {
        deleteCalendarById(calendarId)
          .then(() => {})
          .catch((error) =>
            console.log(`Error deleting calendar with ID ${calendarId}:`, error)
          );
      });
    }

    series.forEach((element) => {
      if (element.serie !== null || element !== undefined) {
        createCalendar(
          element.serie,
          Number(element.weight),
          Number(element.repetitions),
          null,
          todayFormatted,
          element.fk_id_session_ex
        ).then((data) => {});
      }
    });

    setSeries([]);
    setNewSeries({ weight: "", repetitions: "" });
    setIsAddonVisible(false);
    setIsAddonShowSessionRotine(false);
    setIsAddonShowSessionExercises(false);
  };

  //SHOW DESCRIPTION 2
  const showDescription2 = (exercise) => {
    setAddon2Visible((prevState) => !prevState);
    setAddon2ShowExerciseDescription((prevState) => !prevState);
    h2Title2.current.innerHTML = exercise.exercise_name;
    pDescription2.current.innerHTML = exercise.description;

    if (exercise.fk_category_1 === 1) {
      category2.current.innerHTML = "Pecho";
    } else if (exercise.fk_category_1 === 2) {
      category2.current.innerHTML = "Brazos";
    } else if (exercise.fk_category_1 === 3) {
      category2.current.innerHTML = "Espalda";
    } else if (exercise.fk_category_1 === 4) {
      category2.current.innerHTML = "Piernas";
    }
  };

  const h2Title2 = useRef();
  const pDescription2 = useRef();
  const category2 = useRef();

  // CLOSE DESCRIPTION 2
  const closeShowDescription2 = () => {
    setAddon2Visible(false);
    setAddon2ShowExerciseDescription(false);
  };

  return (
    <>
      <div
        id="homeCont"
        className="allCont flex flex-column align-center backgroundGradient position-relative"
      >
        {/* ADDONS */}
        <div
          className="addonSet"
          style={{
            display: isAddonVisible ? "flex" : "none",
          }}
        >
          <div
            id="isAddonSessionOnHome"
            className="cage100 backgroundBlack marginAuto addonSetContainer"
            style={{
              display: isAddonShowSessionRotine ? "block" : "none",
            }}
          >
            <div className="titleSessionExerciseHome cage75 marginAuto flex justify-between align-center">
              {selectedRoutine.length > 0 ? (
                <h2>{selectedRoutine[0].routine_name}</h2>
              ) : (
                <h2>Routine</h2>
              )}
              <button
                onClick={() => {
                  setIsAddonVisible(false);
                  setIsAddonShowSessionRotine(false);
                  setSelectedRoutine({});
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
            <div className="showExercisesOnAddon flex justify-between align-center">
              {selectedRoutineData.length === 0 ? (
                <div className="noExercisesText flex justify-center align-center flex-column cage80 marginAuto backgroundWhite">
                  <h2>ESTA RUTINA NO TIENE SESSIONES</h2>
                  <button
                    onClick={() => {
                      if (selectedRoutine[0].type_routine === "semanal") {
                        const path = `/editPlanedRoutine/${selectedRoutine[0].pk_id_routine}`;
                        navigate(path);
                      } else {
                        const path = `/editFreeRoutine/${selectedRoutine[0].pk_id_routine}`;
                        navigate(path);
                      }
                    }}
                  >
                    AÑADIR EJERCICIOS
                  </button>
                </div>
              ) : (
                <div className="cage80 marginAuto">
                  {Array.isArray(selectedRoutineData) &&
                    selectedRoutineData.map((session, index) => {
                      return (
                        <button
                          key={index}
                          className="sessionButtonSelectRoutineSession border-r5"
                          onClick={() =>
                            showExercisesAddon(session.pk_id_sessio)
                          }
                        >
                          {session.nom_session}
                        </button>
                      );
                    })}
                </div>
              )}
            </div>
          </div>
          <div
            id="iAddonSessionExercises"
            className="cage100 backgroundBlack marginAuto addonSetContainer"
            style={{
              display: isAddonShowSessionExercises ? "block" : "none",
            }}
          >
            <div className=" titleSessionExerciseHome cage75 marginAuto flex justify-between align-center">
              {selectedSession.length > 0 ? (
                <h2>{selectedSession[0].nom_session}</h2>
              ) : (
                <h2>Sesión</h2>
              )}
              <button
                className="hoverYellow"
                onClick={() => {
                  setIsAddonVisible(false);
                  setIsAddonShowSessionExercises(false);
                  setSessionExercisesData([]);
                  setSelectedSession({});
                  setCurrentExerciseIndex(0);
                  setSeries([]);
                  setNewSeries({ weight: "", repetitions: "" });
                  setIsAddonVisible(false);
                  setIsAddonShowSessionRotine(false);
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
            {/* <p className="time cage75 marginAuto flex">00:00</p> */}
            <div className=" showExercisesOnAddon flex justify-between align-center">
              {sessionExercisesData.length === 0 ? (
                ""
              ) : (
                <button
                  className="arrowButton hoverPurple"
                  onClick={handlePrevClick}
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
              )}

              {sessionExercisesData.length === 0 ? (
                <div className="noExercisesText flex justify-center align-center flex-column cage80 marginAuto backgroundWhite">
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
                      <button className="hoverPurple">
                        <svg
                          onClick={() =>
                            showDescription2(
                              sessionExercisesData[currentExerciseIndex]
                            )
                          }
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
                    <table className="cage90 block">
                      <thead className="tableExercisesHeader tagCont">
                        <tr>
                          <th>SERIE</th>
                          <th>KG</th>
                          <th>REP</th>
                          <th>KG-A</th>
                          <th>REP-A</th>
                        </tr>
                      </thead>
                      <tbody className="tableExercisesBody">
                        {Array.isArray(series) &&
                          series
                            .filter((serie) => {
                              return (
                                serie.fk_id_session_ex === currentExerciseId
                              );
                            })
                            .sort((a, b) => a.serie - b.serie)
                            .map((serie, index) => {
                              return (
                                <tr
                                  key={index}
                                >
                                  <td>{serie.serie}</td>
                                  <td>
                                    <input
                                      type="number"
                                      min={0}
                                      className="backgroundYellow"
                                      value={serie.weight}
                                      onChange={(e) =>
                                        handleWeightChange(
                                          e.target.value,
                                          index + 1,
                                          currentExerciseId
                                        )
                                      }
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="number"
                                      min={0}
                                      className="backgroundYellow"
                                      value={serie.repetitions}
                                      onChange={(e) =>
                                        handleRepetitionsChange(
                                          e.target.value,
                                          index + 1,
                                          currentExerciseId
                                        )
                                      }
                                    />
                                  </td>
                                  {/* Los inputs con clase backgroundBlack no se modifican */}
                                  {serie.serie !== undefined && (
                                    <td>
                                      <input
                                        type="number"
                                        min={0}
                                        className="backgroundBlack"
                                        placeholder={serie.weight.toString()}
                                      />
                                    </td>
                                  )}
                                  {serie.serie !== undefined && (
                                    <td>
                                      <input
                                        type="number"
                                        min={0}
                                        className="backgroundBlack"
                                        placeholder={serie.repetitions.toString()}
                                      />
                                    </td>
                                  )}
                                </tr>
                              );
                            })}

                        <tr>
                          <td>-</td>
                          <td>
                            <input
                              type="number"
                              min={0}
                              className="backgroundYellow"
                              value={
                                (newSeries[currentExerciseId] || {}).weight ||
                                ""
                              }
                              onChange={(e) =>
                                setNewSeries({
                                  ...newSeries,
                                  [currentExerciseId]: {
                                    ...(newSeries[currentExerciseId] || {}),
                                    weight: e.target.value,
                                  },
                                })
                              }
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              min={0}
                              className="backgroundYellow"
                              value={
                                (newSeries[currentExerciseId] || {})
                                  .repetitions || ""
                              }
                              onChange={(e) =>
                                setNewSeries({
                                  ...newSeries,
                                  [currentExerciseId]: {
                                    ...(newSeries[currentExerciseId] || {}),
                                    repetitions: e.target.value,
                                  },
                                })
                              }
                            />
                          </td>
                          <td>
                            <input min={0} type="number" className="backgroundBlack" />
                          </td>
                          <td>
                            <input min={0} type="number" className="backgroundBlack" />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <button
                      className="plusButtonSerie backgroundYellow flex justify-center align-center cage90 marginAuto border-r5"
                      onClick={() => handleAddSeries(currentExerciseId)}
                    >
                      GUARDAR SERIE
                    </button>
                  </div>
                </div>
              )}
              {sessionExercisesData.length === 0 ? (
                ""
              ) : (
                <button
                  className="arrowButton arrowRotated hoverPurple"
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
              )}
            </div>
            <button className="endSession" onClick={() => createCalendarData()}>
              GUARDAR EJERCICIOS
            </button>
          </div>
        </div>
        <div
          className="addonSet addonSuperior align-center"
          style={{
            display: isAddon2Visible ? "flex" : "none",
          }}
        >
          <div
            id="showExerciseDescription"
            className="allContResponsive cage90 backgroundPurple marginAuto addonSetContainer"
            style={{
              display: isAddon2ShowExerciseDescription ? "block" : "none",
            }}
          >
            <div className="editRoutineShowName flex justify-between cage90 marginAuto">
              <div className="textEditRoutinShowLimitation">
                <h2 ref={h2Title2}></h2>
                <p className="tagGlobal tagColor2" ref={category2}></p>
              </div>
              <button onClick={closeShowDescription2}>
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
            <p className=" cage90 textDescription" ref={pDescription2}></p>
          </div>
        </div>
        {/* CAGE CONTENT */}
        <div className="allContResponsive cage90 marginTop-20" id="home">
          {!mainRoutine || Object.keys(mainRoutine).length === 0 ? (
            <div
              className="routinesShow border-r5 backgroundBlack"
              id="favoriteRoutine"
              onClick={favRoutineNavigation}
            >
              <h2>
                {routines.length === 0
                  ? "CREA UNA RUTINA Y AÑADELA COMO FAVORITA"
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
              <h2>CREA UNA RUTINA</h2>
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
                    <button
                      onClick={() =>
                        showSessionRoutineAddon(routine.pk_id_routine)
                      }
                    >
                      START
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <GitCalendar />
        </div>
        <Nav webPage="home" />
      </div>
    </>
  );
}

export default Home;
