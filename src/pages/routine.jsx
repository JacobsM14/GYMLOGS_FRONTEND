import Nav from "./../components/navComponent/navComponent";
import "./../styles/routine.css";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import Cookies from "universal-cookie";

//IMPORT API
import {
  createRoutine,
  getRoutinesByUser,
  createSessionPlanedRoutine,
  getRoutineById,
} from "./../services/userApi";

function Routine() {
  const navigate = useNavigate();
  const [routines, setRoutines] = useState([]);

  // NEED TO BE LOGED IN TO ACCESS THIS PAGE
  useEffect(() => {
    const cookies = new Cookies();
    const token = cookies.get("token");

    if (!token) {
      navigate("/login");
    } else {
      getRoutinesByUser(token)
        .then((data) => {
          setRoutines(data);
        })
        .catch((error) => console.error(error));
    }
  }, []);

  // ADDONS SHOW
  const [isPlanedRoutineVisible, setPlanedRoutineVisible] = useState(false);
  const [isFreeRoutineVisible, setFreeRoutineVisible] = useState(false);

  // GET SELECTED DAYS
  const [selectedDays, setSelectedDays] = useState([]);
  // GET INPUT VALUE
  const inputPlanedROutine = useRef();
  const inputFreeRoutine = useRef();

  // ERROR ON CREATE PLANED ROUTINE
  const [
    inputPlanedRoutineMinLengthAdvise,
    setInputPlanedRoutineMinLengthAdvise,
  ] = useState(false);
  const [
    inputPlanedRoutineMaxLengthAdvise,
    setInputPlanedRoutineMaxLengthAdvise,
  ] = useState(false);
  const [selectedDaysAdvise, setSelectedDaysAdvise] = useState(false);

  // ERROR ON CREATE FREE ROUTINE
  const [inputFreeRoutineMinLengthAdvise, setInputFreeRoutineMinLengthAdvise] =
    useState(false);
  const [inputFreeRoutineMaxLengthAdvise, setInputFreeRoutineMaxLengthAdvise] =
    useState(false);

  //SHOW ADDON TO CREATE PLANED ROUTINE
  const createPlanedRoutine = () => {
    setPlanedRoutineVisible(true);
  };

  //QUIT ADDON TO CREATE PLANED ROUTINE
  const quitAddonCreatePlanedRoutine = () => {
    setPlanedRoutineVisible(false);
    setSelectedDays([]);
    setSelectedDaysAdvise(false);
    setInputPlanedRoutineMinLengthAdvise(false);
    setInputPlanedRoutineMaxLengthAdvise(false);
    inputPlanedROutine.current.value = "";
  };

  //SELECT DAYS FOR PLANED ROUTINE
  const selectDay = (day) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter((d) => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  //SHOW ADDON TO CREATE FREE ROUTINE
  const createFreeRoutine = () => {
    setFreeRoutineVisible(true);
  };

  //QUIT ADDON TO CREATE FREE ROUTINE
  const quitAddonCreateFreeRoutine = () => {
    setFreeRoutineVisible(false);
    inputFreeRoutine.current.value = "";
    setInputFreeRoutineMinLengthAdvise(false);
    setInputFreeRoutineMaxLengthAdvise(false);
  };

  // CALL API CONSTS
  // CREATE PLANED ROUTINE
  const createPlanedRoutineOnDB = () => {
    const cookies = new Cookies();
    const id = cookies.get("token");
    const inputValue = inputPlanedROutine.current.value;
    
    if (inputValue === null || inputValue === "" || inputValue.length < 3) {
      setInputPlanedRoutineMinLengthAdvise(true);
      setInputPlanedRoutineMaxLengthAdvise(false);
      return;
    } else if (inputValue.length > 23) {
      setInputPlanedRoutineMaxLengthAdvise(true);
      setInputPlanedRoutineMinLengthAdvise(false);
      return;
    } else if (selectedDays.length === 0) {
      setSelectedDaysAdvise(true);
      return;
    } else {
      let getRoutinedata;

      let daySpanish = {
        Monday: "Lunes",
        Tuesday: "Martes",
        Wednesday: "Miercoles",
        Thursday: "Jueves",
        Friday: "Viernes",
        Saturday: "Sabado",
        Sunday: "Domingo",
      };

      const daysOfWeek = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ];

      selectedDays.sort(
        (a, b) => daysOfWeek.indexOf(a) - daysOfWeek.indexOf(b)
      );

      createRoutine(inputValue, "semanal", selectedDays, null, id)
        .then((data) => {
          getRoutinedata = data;
          if (getRoutinedata !== null) {
            let routineID = getRoutinedata.id;

            if (routineID !== null) {
              const sessionPromises = selectedDays.map((element) =>
                createSessionPlanedRoutine(
                  daySpanish[element],
                  element,
                  routineID
                )
              );

              Promise.all(sessionPromises)
                .then(() => navigate(`/editPlanedRoutine/${routineID}`))
                .catch((error) => console.error(error));
            }
          }
        })
        .catch((error) => console.error(error));
    }
  };

  const createFreeRoutineOnDB = () => {
    const cookies = new Cookies();
    const id = cookies.get("token");
    const inputValue = inputFreeRoutine.current.value;

    if (inputValue === null || inputValue === "" || inputValue.lenth < 3) {
      setInputFreeRoutineMinLengthAdvise(true);
      setInputFreeRoutineMaxLengthAdvise(false);
      return;
    } else if (inputValue.length > 23) {
      setInputFreeRoutineMaxLengthAdvise(true);
      setInputFreeRoutineMinLengthAdvise(false);
      return;
    } else {
      setInputFreeRoutineMinLengthAdvise(false);
      setInputFreeRoutineMaxLengthAdvise(false);
      createRoutine(inputValue, "libre", null, 0, id)
        .then((data) => {
          if (data && !data.error) {
            navigate(`/editFreeRoutine/${data.id}`);
          } else {
            console.log("error");
          }
        })
        .catch((error) => console.error(error));
    }
  };

  // ENTER ON EDIT ROUTINE
  const editRoutine = (routineID) => {
    const result = getRoutineById(routineID);
    result
      .then((data) => {
        if (data && !data.error) {
          if (data[0].type_routine === "libre") {
            navigate(`/editFreeRoutine/${routineID}`);
          } else if (data[0].type_routine === "semanal") {
            navigate(`/editPlanedRoutine/${routineID}`);
          }
        } else {
        }
      })
      .catch((error) => {});
  };

  return (
    <>
      <div className="allCont flex flex-column align-center backgroundGradient position-relative">
        {/* ADDONS GENERAL */}
        <div
          className="addonSet align-center"
          style={{
            display:
              isPlanedRoutineVisible || isFreeRoutineVisible ? "flex" : "none",
          }}
        >
          <div
            id="createPlanedRoutineAddon"
            className="allContResponsive cage90 backgroundWhite marginAuto addonSetContainer"
            style={{ display: isPlanedRoutineVisible ? "block" : "none" }}
          >
            <div className="cage90 marginAuto flex align-center justify-between">
              <h2>Rutina Planificada</h2>
              <svg
                onClick={quitAddonCreatePlanedRoutine}
                xmlns="http://www.w3.org/2000/svg"
                width="128"
                height="128"
                viewBox="0 0 24 24"
              >
                <path d="M21 5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2zm-4.793 9.793l-1.414 1.414L12 13.414l-2.793 2.793l-1.414-1.414L10.586 12L7.793 9.207l1.414-1.414L12 10.586l2.793-2.793l1.414 1.414L13.414 12z" />
              </svg>
            </div>
            <p
              className="adviseFormText cage90 block marginAuto"
              style={{
                display:
                  inputPlanedRoutineMinLengthAdvise ||
                  inputPlanedRoutineMinLengthAdvise
                    ? "flex"
                    : "none",
              }}
            >
              Minimo 3 caracteres*
            </p>
            <p
              className="adviseFormText cage90 block marginAuto"
              style={{
                display:
                  inputPlanedRoutineMaxLengthAdvise ||
                  inputPlanedRoutineMaxLengthAdvise
                    ? "flex"
                    : "none",
              }}
            >
              Maximo 23 caracteres*
            </p>
            <input
              type="text"
              placeholder="Nombre de Rutina: "
              ref={inputPlanedROutine}
            />
            <h3>Selecciona los dias</h3>
            <p
              className="adviseFormText cage90 block marginAuto"
              style={{
                display:
                  selectedDaysAdvise || selectedDaysAdvise ? "flex" : "none",
              }}
            >
              Selecciona algun dia*
            </p>
            <div
              id="contWeekDays"
              className="flex cage90 marginAuto justify-between "
            >
              <button
                id="mondayButton"
                className={`flex justify-center align-center ${
                  selectedDays.includes("Monday") ? "weekDaySelected" : ""
                }`}
                onClick={() => selectDay("Monday")}
              >
                L
              </button>
              <button
                id="tuesdayButton"
                className={`flex justify-center align-center ${
                  selectedDays.includes("Tuesday") ? "weekDaySelected" : ""
                }`}
                onClick={() => selectDay("Tuesday")}
              >
                M
              </button>
              <button
                id="wednesdayButton"
                className={`flex justify-center align-center ${
                  selectedDays.includes("Wednesday") ? "weekDaySelected" : ""
                }`}
                onClick={() => selectDay("Wednesday")}
              >
                X
              </button>
              <button
                id="thursdayButton"
                className={`flex justify-center align-center ${
                  selectedDays.includes("Thursday") ? "weekDaySelected" : ""
                }`}
                onClick={() => selectDay("Thursday")}
              >
                J
              </button>
              <button
                id="fridayButton"
                className={`flex justify-center align-center ${
                  selectedDays.includes("Friday") ? "weekDaySelected" : ""
                }`}
                onClick={() => selectDay("Friday")}
              >
                V
              </button>
              <button
                id="saturdayButton"
                className={`flex justify-center align-center ${
                  selectedDays.includes("Saturday") ? "weekDaySelected" : ""
                }`}
                onClick={() => selectDay("Saturday")}
              >
                S
              </button>
              <button
                id="sundayButton"
                className={`flex justify-center align-center ${
                  selectedDays.includes("Sunday") ? "weekDaySelected" : ""
                }`}
                onClick={() => selectDay("Sunday")}
              >
                D
              </button>
            </div>
            <button
              className="createRutineAddonButton"
              onClick={createPlanedRoutineOnDB}
            >
              CREAR RUTINA
            </button>
          </div>
          <div
            id="createFreeRoutineAddon"
            className="allContResponsive cage90 backgroundWhite marginAuto addonSetContainer"
            style={{ display: isFreeRoutineVisible ? "block" : "none" }}
          >
            <div className="cage90 marginAuto flex align-center justify-between">
              <h2>Rutina Libre</h2>
              <svg
                onClick={quitAddonCreateFreeRoutine}
                xmlns="http://www.w3.org/2000/svg"
                width="128"
                height="128"
                viewBox="0 0 24 24"
              >
                <path d="M21 5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2zm-4.793 9.793l-1.414 1.414L12 13.414l-2.793 2.793l-1.414-1.414L10.586 12L7.793 9.207l1.414-1.414L12 10.586l2.793-2.793l1.414 1.414L13.414 12z" />
              </svg>
            </div>
            <p
              className="adviseFormText cage90 block marginAuto"
              style={{
                display:
                  inputFreeRoutineMinLengthAdvise ||
                  inputFreeRoutineMinLengthAdvise
                    ? "flex"
                    : "none",
              }}
            >
              Minimo 3 caracteres*
            </p>
            <p
              className="adviseFormText cage90 block marginAuto"
              style={{
                display:
                  inputFreeRoutineMaxLengthAdvise ||
                  inputFreeRoutineMaxLengthAdvise
                    ? "flex"
                    : "none",
              }}
            >
              Maximo 23 caracteres*
            </p>
            <input
              type="text"
              placeholder="Nombre de Rutina: "
              ref={inputFreeRoutine}
            />
            <button
              className="createRutineAddonButton"
              onClick={createFreeRoutineOnDB}
            >
              CREAR RUTINA
            </button>
          </div>
        </div>
        {/* CONT GENERAL */}
        <div id="routine" className="allContResponsive cage80 marginAuto flex flex-column">
          <h2>CREAR RUTINA</h2>
          <button
            className="createRoutine backgroundBlack border-r5 flex align-center"
            onClick={createPlanedRoutine}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="128"
              height="128"
              viewBox="0 0 24 24"
            >
              <path d="M9 3V1h6v2zm2 11h2V8h-2zm1 8q-1.85 0-3.488-.712T5.65 19.35t-1.937-2.863T3 13t.713-3.488T5.65 6.65t2.863-1.937T12 4q1.55 0 2.975.5t2.675 1.45l1.4-1.4l1.4 1.4l-1.4 1.4Q20 8.6 20.5 10.025T21 13q0 1.85-.713 3.488T18.35 19.35t-2.863 1.938T12 22" />
            </svg>
            <h3>Rutina Planificada</h3>
          </button>
          <button
            className="createRoutine backgroundBlack border-r5 flex align-center"
            onClick={createFreeRoutine}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="128"
              height="128"
              viewBox="0 0 512 512"
            >
              <path d="M87.49 27.99C58.7 27.99 35.5 51.17 35.5 80c0 28.8 23.2 52 52 52s52-23.2 52-52c0-28.83-23.2-52.01-52.01-52.01M219.5 54.55c-2.6 4.13-4 9.58-4.5 15.32c-20.8-.7-39.2-1.03-58.3-.73c.8 6.29 1.1 12.15.4 18c19.8-.25 39.1 0 58.2.77c.3 3.12.7 5.96 1.2 8.26c-11.9 24.43-25.4 44.13-32.3 70.43c2.3 24.6 5.2 53.2 23.1 77.7c5 19.9 9.1 39.7 14.6 59.6c2.1-25.1 7.6-51.9 21.4-79.2c-1.9-9.1-2.1-17.2-1.3-25.7c-4.2-8.1-9.8-16.2-19.2-24c12.9-23.8 13.2-46.2 17.6-71.8l19.5-4.78c1.8-2.39 3.3-4.92 4.4-7.56c31 2.54 61.2 6.27 90.6 10.94c.6-6.09 2-11.99 4.1-17.56c-29.6-4.75-60-8.55-91.2-11.17c0-4.55-.4-9.28-1.1-14.13c-17.1-2.57-31.6-6.06-47.2-4.39m205 2.44c-28.8 0-52 23.18-52 52.01c0 28.8 23.2 52 52 52s52-23.2 52-52c0-28.83-23.2-52.01-52-52.01m-135 108.11c-7.5 0-14.6 3.9-20.3 11.6c-5.8 7.6-9.7 18.8-9.7 31.3c0 6.6 1.1 13.6 3 19.1c8.9-3.1 18.1-7.5 26.7-15c7.9 6.4 16.6 10.9 26.8 15c2.2-5.9 3.5-11.9 3.5-19.1c0-12.5-3.9-23.7-9.7-31.3c-5.7-7.7-12.8-11.6-20.3-11.6m-.3 58.9c-6.8 10.6-8.8 14.7-21.7 12.9c5.3 7.4 12.7 14.1 22 14c10.4-.1 17.2-6.5 21.8-13.8c-11.2.8-16.9-3.1-22.1-13.1m60.8 28.3c2.4 25.1 3.6 39.4 1.5 63.8c2.2 3.2 2.8 19.1 11.1 22.5c-12.8 6.5-17.6 24.1-24.6 31c-18.2 21.6-31.1 55.3-43.6 86.3c3.7 12.8 8.3 25.5 13.7 38.1H365c-5.6-27.2-13.6-54.7-22.2-82.1c3.4-5.4 3-4 6.5-23c14.9-10.2 47.2-27.3 52.6-49.6c-5-19.9-11.7-32.8-23.5-49.9c2.8-24.2-16.2-30.8-28.4-37.1m-100.3 3.4c-3.5 10.4-5.9 20.7-7.6 30.9l13.9-1.2c-3.2-9.7-4.9-20.1-6.3-29.7m65.9 3.5c-7.4 6-16.4 9.7-26.1 9.7c-7.4 0-14.3-2.1-20.4-5.7c.5 2.4.9 4.8 1.5 7.2c1.9 8.5 4.7 16.8 8 22.4c3.2 5.5 6 7.5 8.9 7.7c3.1.2 6.6-1.5 10.9-6.7c4.4-5.2 8.7-13.2 12.2-21.4c1.9-4.5 3.6-9 5-13.2m17.4 5c-2.8 7.9-5.3 14.6-8.6 21.5l9.8.5c-.2-7.3-.6-14.6-1.2-22m-69.4 38.7l-23.7 2c-.6 7.7-.9 15.4-1.1 23l94.6-1.5c.7-7.3 1-14.7 1.1-22.1l-20.5-1.1c-7.6 8.6-18.5 15.7-27.7 15.3c-10.3-.7-17.8-7.7-22.7-15.6m65.6 41.5l-90.4 1.5c-.9 9.3 6.9 16.2 12.3 20.3l66.7-.2c7.2-8 8.6-11.2 11.4-21.6M236 376.8c-14.4 39-29.7 77.9-41.2 117.2h53.1c6.7-12.3 12.8-24.9 18-37.8c-.7-31.9-14.5-62.9-29.9-79.4m70.3 7.3l-41.9.1c7.8 13.1 11.8 28.8 15 45.6l8.3-.8c6.1-15.2 10.6-30.7 18.6-44.9" />
            </svg>
            <h3>Rutina Libre</h3>
          </button>
          <h2>EDITAR RUTINA</h2>
          {routines.length > 0 ? (
            routines.map((routine, index) => {
              return (
                <div
                  id={routine.pk_id_routine}
                  key={index}
                  onClick={() => editRoutine(routine.pk_id_routine)}
                  className="cursorPointer editRoutine backgroundBlack border-r5 flex flex-column"
                >
                  <h3>{routine.routine_name}</h3>
                  <div className="tagCont flex cage90 marginAuto">
                    <p className="tagGlobal tagColor1">
                      {routine.type_routine === "semanal"
                        ? "PLANIFICADA"
                        : routine.type_routine === "libre"
                        ? "LIBRE"
                        : ""}
                    </p>
                    {/* <p className="tagGlobal tagColor2">CARDIO</p> */}
                    {/* <p className="tagGlobal tagColor2">PESO LIBRE</p> */}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="editRoutineAdvise backgroundBlack border-r5 flex flex-column ">
              <h3>CREA UNA RUTINA PARA PODER EDITARLA</h3>
            </div>
          )}
          {/* <div className="editRoutine backgroundBlack border-r5 flex flex-column">
            <h3>RUTINA DE PESO LIBRE</h3>
            <div className="tagCont flex cage90 marginAuto">
              <p className="tagGlobal tagColor1">PLANIFICADA</p>
              <p className="tagGlobal tagColor2">CARDIO</p>
              <p className="tagGlobal tagColor2">PESO LIBRE</p>
            </div>
          </div> */}
        </div>
        <Nav webPage="rutina" />
      </div>
    </>
  );
}

export default Routine;
