import Nav from "./../components/navComponent/navComponent";
import "./../styles/editRoutine.css";
import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

//IMPORT API
import { getRoutineById, getSessionsByRoutineId } from "./../services/userApi";

function editPlanedRoutine() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [sessions, setSessions] = useState([]);
  const [routine, setRoutine] = useState([]);
  const [isNewSessionVisible, setNewSessionVisible] = useState(false);
  const [selectedDay, setSelectedDay] = useState("");

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
            setSessions(res);
            // console.log("res");
            // console.log(res);
            getRoutineById(id).then((res) => {
              if (res && !res.error) {
                setRoutine(res);
                // console.log(res);
              } else {
                navigate("/routines");
              }
            });
          } else {
            navigate("/routines");
          }
          setSessions(res);
        })
        .catch((error) => console.error(error));
    }
  }, [id]);

  const addonNewSession = () => {
    if (isNewSessionVisible) {
      setNewSessionVisible(false);
    } else {
      setNewSessionVisible(true);
    }
  };

  const updateRoutineName = (e) => {
    console.log(e.target.value);
  };

  const getBack = () => {
    navigate("/routines");
  };

  const selectDay = (day) => {
    setSelectedDay(day);
  };

  const isDayInSessions = (day) => {
    let isDay = false;
    sessions.forEach((session) => {
      if (session.week_day === day) {
        isDay = true;
      }
    });
    return isDay;
  };

  return (
    <>
      <div className="allCont flex flex-column align-center backgroundGradient position-relative">
        {/* ADDONS GENERAL */}
        <div
          id="addonSet"
          className="align-center"
          style={{
            display: isNewSessionVisible ? "flex" : "none",
          }}
        >
          <div
            id="createPlanedRoutineAddon"
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
            <h3>Selecciona los dias</h3>
            {/* <p
              className="adviseFormText cage90 block marginAuto"
              style={{
                display:
                  selectedDaysAdvise || selectedDaysAdvise ? "flex" : "none",
              }}
            >
              Selecciona algun dia*
            </p> */}
            <div
              id="contWeekDays"
              className="flex cage90 marginAuto justify-between "
            >
              <button
                id="mondayButton"
                className={`flex justify-center align-center ${
                  selectedDay === "Monday" ? "weekDaySelected" : ""
                } ${isDayInSessions("Monday") ? "alreadyDone" : ""}`}
                onClick={() => selectDay("Monday")}
              >
                L
              </button>
              <button
                id="tuesdayButton"
                className={`flex justify-center align-center ${
                  selectedDay === "Tuesday" ? "weekDaySelected" : ""
                } ${isDayInSessions("Tuesday") ? "alreadyDone" : ""}`}
                onClick={() => selectDay("Tuesday")}
              >
                M
              </button>
              <button
                id="wednesdayButton"
                className={`flex justify-center align-center ${
                  selectedDay === "Wednesday" ? "weekDaySelected" : ""
                } ${isDayInSessions("Wednesday") ? "alreadyDone" : ""}`}
                onClick={() => selectDay("Wednesday")}
              >
                X
              </button>
              <button
                id="thursdayButton"
                className={`flex justify-center align-center ${
                  selectedDay === "Thursday" ? "weekDaySelected" : ""
                } ${isDayInSessions("Thursday") ? "alreadyDone" : ""}`}
                onClick={() => selectDay("Thursday")}
              >
                J
              </button>
              <button
                id="fridayButton"
                className={`flex justify-center align-center ${
                  selectedDay === "Friday" ? "weekDaySelected" : ""
                } ${isDayInSessions("Friday") ? "alreadyDone" : ""}`}
                onClick={() => selectDay("Friday")}
              >
                V
              </button>
              <button
                id="saturdayButton"
                className={`flex justify-center align-center ${
                  selectedDay === "Saturday" ? "weekDaySelected" : ""
                } ${isDayInSessions("Saturday") ? "alreadyDone" : ""}`}
                onClick={() => selectDay("Saturday")}
              >
                S
              </button>
              <button
                id="sundayButton"
                className={`flex justify-center align-center ${
                  selectedDay === "Sunday" ? "weekDaySelected" : ""
                } ${isDayInSessions("Sunday") ? "alreadyDone" : ""}`}
                onClick={() => selectDay("Sunday")}
              >
                D
              </button>
            </div>
            <button
              className="createRutineAddonButton"
              //   onClick={createPlanedRoutineOnDB}
            >
              CREAR SESSION
            </button>
          </div>
        </div>
        <div id="editPlanedSession" className="cage90 flex flex-column">
          <div className="editRoutineShowName flex justify-between">
            {routine.map((routine, index) => (
              <div key={index}>
                <input
                  type="text"
                  value={routine.routine_name}
                  onChange={(e) => updateRoutineName(index, e.target.value)}
                />
                <p className="tagGlobal tagColor1">
                  {routine.type_routine === "semanal"
                    ? "PLANIFICADA"
                    : routine.type_routine === "libre"
                    ? "LIBRE"
                    : ""}
                </p>
              </div>
            ))}
            <button
              className="flex justify-center align-center "
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
            </button>
          </div>
          {sessions.map((session, index) => (
            <button
              className="editEachSession backgroundBlack flex justify-between align-center"
              key={index}
            >
              <h2>{session.nom_session}</h2>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="128"
                height="128"
                viewBox="0 0 24 24"
              >
                <path d="M3 21v-4.25L16.2 3.575q.3-.275.663-.425t.762-.15t.775.15t.65.45L20.425 5q.3.275.438.65T21 6.4q0 .4-.137.763t-.438.662L7.25 21zM17.6 7.8L19 6.4L17.6 5l-1.4 1.4z" />
              </svg>
            </button>
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
