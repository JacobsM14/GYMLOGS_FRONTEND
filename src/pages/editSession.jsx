import Nav from "./../components/navComponent/navComponent";
import "./../styles/editSessions.css";
import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

//IMPORT API
import {
  getSessionById,
  getSessionExercisesBySessionId,
  getRoutineById,
  getExercisesTypes,
  getExercisesByType,
} from "./../services/userApi";

function editSession() {
  const navigate = useNavigate();

  // ON START THE PAGE
  const { id } = useParams();

  // ADDON STATES
  const [isAddonVisible, setAddonVisible] = useState(false);
  const [isAddonSelectExerciseTypeVisible, setAddonSelectExerciseTypeVisible] =
    useState(false);
  const [isAddonShowCalisteniaExercises, setAddonShowCalisteniaExercises] =
    useState(false);
  const [isAddonShowCardioExercises, setAddonShowCardioExercises] =
    useState(false);
  const [isAddonShowPesoLibreExercises, setAddonShowPesoLibreExercises] =
    useState(false);
  const [isAddonShowMaquinasExercises, setAddonShowMaquinasExercises] =
    useState(false);

  // SAVE CONTENT
  const [selectedSession, setSelectedSession] = useState("");
  const [selectedSessionExercises, setSelectedSessionExercises] = useState([]);
  const [allExerciseTypes, setAllExerciseTypes] = useState([]);
  const [pesoLibreExercises, setPesoLibreExercises] = useState([]);
  const [calisteniaExercises, setCalisteniaExercises] = useState([]);
  const [cardioExercises, setCardioExercises] = useState([]);
  const [maquinasExercises, setMaquinasExercises] = useState([]);

  // useEffect
  useEffect(() => {
    const cookies = new Cookies();
    const token = cookies.get("token");

    if (!token) {
      navigate("/login");
    } else {
      getSessionById(id).then((response) => {
        if (response) {
          setSelectedSession(response);
          getSessionExercisesBySessionId(id).then((response) => {
            if (response) {
              //   console.log(response);
              setSelectedSessionExercises(response);
            }
          });
        } else {
          navigate("/routines");
        }
      });

      getExercisesTypes().then((response) => {
        if (response) {
          setAllExerciseTypes(response);
        } else {
          navigate("/routines");
        }
      });

      getExercisesByType(1).then((response) => {
        if (response) {
          setPesoLibreExercises(response);
        } else {
          navigate("/routines");
        }
      });

      getExercisesByType(2).then((response) => {
        if (response) {
          setCalisteniaExercises(response);
        } else {
          navigate("/routines");
        }
      });

      getExercisesByType(3).then((response) => {
        if (response) {
          setCardioExercises(response);
        } else {
          navigate("/routines");
        }
      });

      getExercisesByType(4).then((response) => {
        if (response) {
          setMaquinasExercises(response);
        } else {
          navigate("/routines");
        }
      });
    }
  }, [id]);

  const getBack = (routine) => {
    getRoutineById(routine).then((response) => {
      if (response) {
        response.type_routine === "libre"
          ? navigate("/editRoutine/" + routine)
          : navigate("/editPlanedRoutine/" + routine);
      }
    });
  };

  // ADDON FUNCTIONS
  const showAddonSelectExerciseType = () => {
    setAddonVisible((prevState) => !prevState);
    setAddonSelectExerciseTypeVisible((prevState) => !prevState);
  };

  const showAddonSelectExercise = (type) => {
    if (type === "Calistenia") {
      setAddonSelectExerciseTypeVisible((prevState) => !prevState);
      setAddonShowCalisteniaExercises((prevState) => !prevState);
    } else if (type === "Cardio") {
      setAddonSelectExerciseTypeVisible((prevState) => !prevState);
      setAddonShowCardioExercises((prevState) => !prevState);
    } else if (type === "Peso Libre") {
      setAddonSelectExerciseTypeVisible((prevState) => !prevState);
      setAddonShowPesoLibreExercises((prevState) => !prevState);
    } else if (type === "Maquinas") {
      setAddonSelectExerciseTypeVisible((prevState) => !prevState);
      setAddonShowMaquinasExercises((prevState) => !prevState);
    }
  };

  const backFromExercises = (e) => {
    setAddonSelectExerciseTypeVisible(true);
    setAddonShowCalisteniaExercises(false);
    setAddonShowCardioExercises(false);
    setAddonShowPesoLibreExercises(false);
    setAddonShowMaquinasExercises(false);
  };

  const preventDefault = (e) => {
    e.preventDefault();
    // let exercises = [];
    // let checkboxes = document.querySelectorAll("input[type=checkbox]:checked");
    // for (let i = 0; i < checkboxes.length; i++) {
    //   exercises.push(checkboxes[i].id);
    // }
    // console.log(exercises);
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
            id="selectExerciseType"
            className="cage90 backgroundBlack marginAuto addonSetContainer"
            style={{
              display: isAddonSelectExerciseTypeVisible ? "block" : "none",
            }}
          >
            {(selectedSession || []).map((session, index) => (
              <div
                className="editRoutineShowName flex justify-between cage90 marginAuto"
                key={index}
              >
                <div className="textEditRoutinShowLimitation">
                  <h2>{session.nom_session}</h2>
                </div>
                <button onClick={showAddonSelectExerciseType}>
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
            ))}

            <div className=" flex flex-column cage90 marginAuto">
              {(allExerciseTypes || []).map((type, index) => (
                <button
                  className="showExcerciseTypesButton tagColor2"
                  key={index}
                  onClick={() => showAddonSelectExercise(type.name)}
                >
                  {type.name}
                </button>
              ))}
            </div>
          </div>
          <form
            id="showPesoLibreExercises"
            className="cage90 addonExercisesShow backgroundYellow marginAuto addonSetContainer"
            style={{
              display: isAddonShowPesoLibreExercises ? "block" : "none",
            }}
            onSubmit={preventDefault}
          >
            <div className="editRoutineShowName flex justify-between cage90 marginAuto">
              <div className="textEditRoutinShowLimitation">
                <h2>Peso Libre</h2>
              </div>
              <button onClick={backFromExercises}>
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

            <div className="globalForm flex flex-column cage90 marginAuto">
              {(pesoLibreExercises || []).map((pesoLibre, index) => (
                <div className="labelExercises flex align-center" key={index}>
                  <label htmlFor={pesoLibre.pk_id_exercise}>
                    {pesoLibre.exercise_name}
                  </label>
                  <input
                    id={pesoLibre.pk_id_exercise}
                    name={pesoLibre.pk_id_exercise}
                    type="checkbox"
                  />
                </div>
              ))}
            </div>
            <input type="submit" />
          </form>
          <form
            id="showCalisteniaExercises"
            className="cage90 addonExercisesShow backgroundYellow marginAuto addonSetContainer"
            style={{
              display: isAddonShowCalisteniaExercises ? "block" : "none",
            }}
            onSubmit={preventDefault}
          >
            <div className="editRoutineShowName flex justify-between cage90 marginAuto">
              <div className="textEditRoutinShowLimitation">
                <h2>Calistenia</h2>
              </div>
              <button onClick={backFromExercises}>
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

            <div className="globalForm flex flex-column cage90 marginAuto">
              {(calisteniaExercises || []).map((pesoLibre, index) => (
                <div className="labelExercises flex align-center" key={index}>
                  <label htmlFor={pesoLibre.pk_id_exercise}>
                    {pesoLibre.exercise_name}
                  </label>
                  <input
                    id={pesoLibre.pk_id_exercise}
                    name={pesoLibre.pk_id_exercise}
                    type="checkbox"
                  />
                </div>
              ))}
            </div>
            <input type="submit" />
          </form>
          <form
            id="showCardioExercises"
            className="cage90 addonExercisesShow backgroundYellow marginAuto addonSetContainer"
            style={{
              display: isAddonShowCardioExercises ? "block" : "none",
            }}
            onSubmit={preventDefault}
          >
            <div className="editRoutineShowName flex justify-between cage90 marginAuto">
              <div className="textEditRoutinShowLimitation">
                <h2>Cardio</h2>
              </div>
              <button onClick={backFromExercises}>
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

            <div className="globalForm flex flex-column cage90 marginAuto">
              {(cardioExercises || []).map((pesoLibre, index) => (
                <div className="labelExercises flex align-center" key={index}>
                  <label htmlFor={pesoLibre.pk_id_exercise}>
                    {pesoLibre.exercise_name}
                  </label>
                  <input
                    id={pesoLibre.pk_id_exercise}
                    name={pesoLibre.pk_id_exercise}
                    type="checkbox"
                  />
                </div>
              ))}
            </div>
            <input type="submit" />
          </form>
          <form
            id="showMaquinasExercises"
            className="cage90 addonExercisesShow backgroundYellow marginAuto addonSetContainer"
            style={{
              display: isAddonShowMaquinasExercises ? "block" : "none",
            }}
            onSubmit={preventDefault}
          >
            <div className="editRoutineShowName flex justify-between cage90 marginAuto">
              <div className="textEditRoutinShowLimitation">
                <h2>Maquinas</h2>
              </div>
              <button onClick={backFromExercises}>
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

            <div className="globalForm flex flex-column cage90 marginAuto">
              {(maquinasExercises || []).map((pesoLibre, index) => (
                <div className="labelExercises flex align-center" key={index}>
                  <label htmlFor={pesoLibre.pk_id_exercise}>
                    {pesoLibre.exercise_name}
                  </label>
                  <input
                    id={pesoLibre.pk_id_exercise}
                    name={pesoLibre.pk_id_exercise}
                    type="checkbox"
                  />
                </div>
              ))}
            </div>
            <input type="submit" />
          </form>
        </div>
        {/* PAGE CONTENT */}
        <div id="editSessionExercises" className="cage90 flex flex-column">
          {(selectedSession || []).map((session, index) => (
            <div
              className="editRoutineShowName flex justify-between"
              key={index}
            >
              <div className="textEditRoutinShowLimitation">
                <div className="flex">
                  <h2>{session.nom_session}</h2>
                </div>
              </div>
              <button onClick={() => getBack(session.fk_id_routine)}>
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
          ))}
          <button className="addSession" onClick={showAddonSelectExerciseType}>
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

export default editSession;
