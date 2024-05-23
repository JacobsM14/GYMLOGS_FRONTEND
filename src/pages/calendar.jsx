import Nav from "./../components/navComponent/navComponent";
import "./../styles/calendar.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import Cookies from "universal-cookie";

import {
  getRoutinesByUser,
  getSessionsByRoutineId,
  getSessionExercisesBySessionId,
  getCalendarBySessionExerciseId,
  getExerciseById,
  getSessionExerciseById,
} from "./../services/userApi";

function Calendar() {
  const navigate = useNavigate();

  const [userSessionExercises, setUserSessionExercises] = useState([]);
  const [userCalendarData, setUserCalendarData] = useState([]);
  const [categoryDaysFinalInfo, setCategoryDaysFinalInfo] = useState([]);
  const [allExercisesData, setAllExercisesData] = useState([]);
  const [allSessionsExerciseData, setAllSessionsExerciseData] = useState([]);
  const [selectedDay, setSelectedDay] = useState(formatDate(new Date()));
  const [selectedExercise, setSelectedExercise] = useState(null);

  useEffect(() => {
    const cookies = new Cookies();
    const token = cookies.get("token");

    if (!token) {
      navigate("/login");
    } else {
      getRoutinesByUser(token).then((routines) => {
        routines.forEach((routine) => {
          getSessionsByRoutineId(routine.pk_id_routine).then((sessions) => {
            sessions.forEach((session) => {
              getSessionExercisesBySessionId(session.pk_id_sessio).then(
                (sessionExercises) => {
                  if (sessionExercises.length > 0) {
                    sessionExercises.forEach((element) => {
                      setUserSessionExercises((prev) => [...prev, element]);
                      getCalendarBySessionExerciseId(
                        element.pk_id_sessio_ex
                      ).then((calendar) => {
                        if (calendar[0].length > 0) {
                          calendar[0].forEach((element) => {
                            setUserCalendarData((prev) => [...prev, element]);
                            setAllExercisesData((prev) => [...prev, element]);
                          });
                        }
                      });
                    });
                  }
                }
              );
            });
          });
        });
      });
    }
  }, []);

  useEffect(() => {
    const categoryMap = {
      1: "Pecho",
      2: "Brazos",
      3: "Espalda",
      4: "Piernas",
    };

    const filteredExercises = userSessionExercises.filter((exercise) =>
      userCalendarData.some(
        (calendar) => calendar.fk_id_session_ex === exercise.pk_id_sessio_ex
      )
    );

    const removeDuplicates = (array, key) => {
      return array.reduce((arr, item) => {
        const removed = arr.filter((i) => i[key] !== item[key]);
        return [...removed, item];
      }, []);
    };

    const exerciseData = filteredExercises.reduce((acc, exercise) => {
      const existingExercise = acc.find(
        (ex) => ex.id === exercise.fk_id_exercise
      );

      const days = userCalendarData
        .filter(
          (calendar) => calendar.fk_id_session_ex === exercise.pk_id_sessio_ex
        )
        .map((calendar) => ({
          day: calendar.day,
          category: categoryMap[exercise.fk_category_1],
        }));

      if (existingExercise) {
        existingExercise.days = removeDuplicates(
          [...existingExercise.days, ...days],
          "day"
        );
      } else {
        acc.push({
          id: exercise.fk_id_exercise,
          days: removeDuplicates(days, "day"),
        });
      }

      return acc;
    }, []);

    exerciseData.forEach((exercise) => {
      getExerciseById(exercise.id).then((exerciseDetails) => {
        exercise.details = exerciseDetails;
        setCategoryDaysFinalInfo(exerciseData);
      });
    });
  }, [userSessionExercises, userCalendarData]);

  useEffect(() => {
    const exercisesAndSessionExercises = [];

    const promises = allExercisesData.map((element) => {
      return getSessionExerciseById(element.fk_id_session_ex).then(
        (sessionExercise) => {
          return getExerciseById(sessionExercise[0].fk_id_exercise).then(
            (exercise) => {
              exercisesAndSessionExercises.push({
                exercise: exercise,
                sessionExercise: sessionExercise,
              });
            }
          );
        }
      );
    });

    Promise.all(promises).then(() => {
      setAllSessionsExerciseData(exercisesAndSessionExercises);
    });
  }, [allExercisesData]); // Removed selectedExercise from dependencies

  useEffect(() => {
    const exercisesOfTheDay = allExercisesData.filter((exercise) => {
      // Convert the date object to a string in the format 'yyyy-mm-dd'
      const exerciseDay = formatDate(exercise.day);

      return exerciseDay === selectedDay;
    });

    const uniqueExercises = [
      ...new Set(
        exercisesOfTheDay.map((exercise) => {
          const correspondingSession = allSessionsExerciseData.find(
            (session) =>
              session.sessionExercise[0].pk_id_sessio_ex ===
              exercise.fk_id_session_ex
          );
          return correspondingSession ? correspondingSession.exercise : null;
        })
      ),
    ].filter(Boolean); // remove null values

    setExercisesOfTheDay(uniqueExercises);
  }, [selectedDay, allExercisesData, allSessionsExerciseData]);

  const [filteredExercises, setFilteredExercises] = useState([]);

  useEffect(() => {
    if (selectedExercise) {
      const filtered = allExercisesData.filter((data) => {
        const correspondingSession = allSessionsExerciseData.find(
          (session) =>
            session.exercise[0].pk_id_exercise ===
            selectedExercise[0].pk_id_exercise
        );
        // Check if the exercise data corresponds to the selected day
        const isSameDay =
          new Date(data.day).toISOString().slice(0, 10) ===
          new Date(selectedDay.split("/").reverse().join("-"))
            .toISOString()
            .slice(0, 10);

        return (
          correspondingSession &&
          isSameDay &&
          data.fk_id_session_ex ===
            correspondingSession.sessionExercise[0].pk_id_sessio_ex
        );
      });
      setFilteredExercises(filtered);
    }
  }, [
    selectedExercise,
    allExercisesData,
    allSessionsExerciseData,
    selectedDay,
  ]);

  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getExerciseCategoryForDay = (day, month, year) => {
    const categoryMap = {
      1: "Pecho",
      2: "Brazos",
      3: "Espalda",
      4: "Piernas",
    };

    const dateString = new Date(Date.UTC(year, month, day)).toISOString();

    for (let exercise of categoryDaysFinalInfo) {
      for (let d of exercise.days) {
        if (d.day === dateString) {
          if (Array.isArray(exercise.details) && exercise.details.length > 0) {
            return categoryMap[exercise.details[0].fk_category_1];
          } else {
          }
        }
      }
    }
    return null;
  };

  const getFirstDayOfMonth = (month, year) => {
    const day = new Date(year, month, 1).getDay();
    return day === 0 ? 7 : day;
  };

  const monthNames = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  // SELECT DAYS SERIES INFO
  const [exercisesOfTheDay, setExercisesOfTheDay] = useState([]);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Los meses en JavaScript comienzan en 0
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

  function parseDate(dateString) {
    const [day, month, year] = dateString.split("/");
    return new Date(`${month}/${day}/${year}`);
  }

  const getPrevSelectedDay = () => {
    setSelectedExercise(null);
    setSelectedDay((prev) => {
      const prevDate = parseDate(prev);
      prevDate.setDate(prevDate.getDate() - 1);
      return formatDate(prevDate);
    });
  };

  const getNextSelectedDay = () => {
    setSelectedExercise(null);
    setSelectedDay((prev) => {
      const prevDate = parseDate(prev);
      prevDate.setDate(prevDate.getDate() + 1);
      return formatDate(prevDate);
    });
  };

  return (
    <>
      <div
        id="calendarCont"
        className="allCont flex flex-column align-center backgroundGradient position-relative"
      >
        <div className="calendarSection backgroundBlack cage90 border-r5">
          <div className="flex justify-center align-center monthName">
            <button
              className="arrowButton flex align-center"
              onClick={handlePrevMonth}
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
            <h2>
              {monthNames[currentMonth]} - {currentYear}
            </h2>
            <button
              className="arrowButton arrowRotated flex align-center"
              onClick={handleNextMonth}
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
          <div className="monthCalendarDays">
            {[
              ...Array(
                getFirstDayOfMonth(currentMonth, currentYear) - 1
              ).keys(),
            ].map((day) => (
              <div className="day backgroundBlack" key={day}>
                <p></p>
              </div>
            ))}
            {[...Array(getDaysInMonth(currentMonth, currentYear)).keys()].map(
              (day) => (
                <div className="day" key={day}>
                  <p className="showCategory">
                    {getExerciseCategoryForDay(
                      day + 1,
                      currentMonth,
                      currentYear
                    )}
                  </p>
                  <p>{day + 1}</p>
                </div>
              )
            )}
          </div>
        </div>
        <div className="exercicesMadeDay backgroundBlack cage90 border-r5">
          <div className="flex justify-center align-center monthName">
            <button
              className="arrowButton flex align-center"
              onClick={() => getPrevSelectedDay()}
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
            <h2>{selectedDay}</h2>
            <button
              className="arrowButton arrowRotated flex align-center"
              onClick={() => getNextSelectedDay()}
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
          <div className="dayDetails flex">
            <div className="daysButtons flex marginAuto flex-column">
              {exercisesOfTheDay.length > 0 ? (
                exercisesOfTheDay.map((exercise, index) => {

                  return (
                    <button
                      key={index}
                      className={`dayButtonExercise ${
                        exercise &&
                        selectedExercise &&
                        exercise[0].pk_id_exercise ===
                          selectedExercise[0].pk_id_exercise // Compare exercise ids
                          ? "selectedButton"
                          : ""
                      }`}
                      onClick={() => {
                        setSelectedExercise(exercise);
                      }}
                    >
                      {exercise && exercise[0].exercise_name
                        ? exercise[0].exercise_name
                        : "No Exercise"}
                    </button>
                  );
                })
              ) : (
                <p className="dayButtonExercise">No exercises for this day.</p>
              )}
            </div>
            {selectedExercise && (
              <div className="dayDetailsCard flex marginAuto flex-column">
                <table>
                  <thead>
                    <tr>
                      <th>Series</th>
                      <th>Peso</th>
                      <th>Reps</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredExercises
                      .sort((a, b) => a.serie - b.serie)
                      .map((data, index) => {
                        return (
                          <tr key={index}>
                            <td>{data.serie}</td>
                            <td>{data.weight}kg</td>
                            <td>{data.repetitions}</td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
        <Nav webPage="calendario" />
      </div>
    </>
  );
}

export default Calendar;
