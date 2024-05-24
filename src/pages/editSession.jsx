import Nav from "./../components/navComponent/navComponent";
import "./../styles/editSessions.css";
import React, { useState, useEffect, useRef } from "react";
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
  createSessionExercise,
  getExerciseById,
  deleteSessionExerciseById,
} from "./../services/userApi";

function editSession() {
  const navigate = useNavigate();

  // ON START THE PAGE
  const { id } = useParams();
  const calisteniaForm = useRef();
  const cardioForm = useRef();
  const pesoLibreForm = useRef();
  const maquinasForm = useRef();

  // ADDON STATES
  const [isAddonVisible, setAddonVisible] = useState(false);
  const [isAddon2Visible, setAddon2Visible] = useState(false);

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
  const [isAddonShowExerciseDescription, setAddonShowExerciseDescription] =
    useState(false);

  const [isAddon2ShowExerciseDescription, setAddon2ShowExerciseDescription] =
    useState(false);

  // SAVE CONTENT
  const [selectedSession, setSelectedSession] = useState("");
  const [selectedSessionExercises, setSelectedSessionExercises] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState([]);
  const [allExerciseTypes, setAllExerciseTypes] = useState([]);
  const [pesoLibreExercises, setPesoLibreExercises] = useState([]);
  const [calisteniaExercises, setCalisteniaExercises] = useState([]);
  const [cardioExercises, setCardioExercises] = useState([]);
  const [maquinasExercises, setMaquinasExercises] = useState([]);
  const categoryMap = {
    1: "Pecho",
    2: "Brazos",
    3: "Espalda",
    4: "Piernas",
  };

  const [selectedCategory, setSelectedCategory] = useState(null);

  // CHECKBOXES
  const [checkedExercises, setCheckedExercises] = useState({});

  // DESCRIPTION HOOKS
  const h2Title = useRef();
  const pDescription = useRef();
  const category = useRef();

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
              setSelectedSessionExercises(response);
              response.forEach((element) => {
                getExerciseById(element.fk_id_exercise).then((response) => {
                  if (Array.isArray(response) && response.length > 0) {
                    setSelectedExercise((prevExercises) => {
                      if (
                        !prevExercises.some(
                          (e) => e.pk_id_exercise === response[0].pk_id_exercise
                        )
                      ) {
                        return [...prevExercises, response[0]];
                      } else {
                        return prevExercises;
                      }
                    });
                  }
                });
              });
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
      console.log(response);
      if (response) {
        response[0].type_routine === "libre"
          ? navigate("/editFreeRoutine/" + routine)
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
    } else if (type === "Maquina") {
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
  };

  const showDescription = (exercise) => {
    let indexofExercise = selectedExercise.indexOf(exercise);
    setAddonVisible((prevState) => !prevState);
    setAddonShowExerciseDescription((prevState) => !prevState);
    h2Title.current.innerHTML = exercise.exercise_name;
    pDescription.current.innerHTML = exercise.description;

    if (exercise.fk_category_1 === 1) {
      category.current.innerHTML = "Pecho";
    } else if (exercise.fk_category_1 === 2) {
      category.current.innerHTML = "Brazos";
    } else if (exercise.fk_category_1 === 3) {
      category.current.innerHTML = "Espalda";
    } else if (exercise.fk_category_1 === 4) {
      category.current.innerHTML = "Piernas";
    }
  };

  const closeShowDescription = () => {
    setAddonVisible(false);
    setAddonShowExerciseDescription(false);
  };

  //SHOW DESCRIPTION 2
  const showDescription2 = (exercise) => {
    let indexofExercise = selectedExercise.indexOf(exercise);
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

  // DATABASE FUNCTIONS
  const saveExercises = async (type) => {
    const exercises = Object.keys(checkedExercises).filter(
      (id) => checkedExercises[id]
    );
    let form;

    if (type === "Peso Libre") {
      form = pesoLibreForm.current;
    } else if (type === "Calistenia") {
      form = calisteniaForm.current;
    } else if (type === "Cardio") {
      form = cardioForm.current;
    } else if (type === "Maquinas") {
      form = maquinasForm.current;
    }

    for (let input of form.elements) {
      if (input.type === "checkbox" && input.checked) {
        exercises.push(input.id);
      }
    }

    setCheckedExercises((prevCheckedExercises) => {
      const newCheckedExercises = { ...prevCheckedExercises };
      exercises.forEach((exerciseId) => {
        newCheckedExercises[exerciseId] = true;
      });
      return newCheckedExercises;
    });

    const uniqueExercises = [...new Set(exercises)];

    const newSessionExercises = [];
    const newExercises = [];

    for (const exerciseId of uniqueExercises) {
      const sessionExercise = await createSessionExercise(exerciseId, id);
      if (sessionExercise) {
        newSessionExercises.push(sessionExercise);
        const exerciseDetail = await getExerciseById(JSON.parse(exerciseId));
        if (exerciseDetail && exerciseDetail[0]) {
          newExercises.push(exerciseDetail[0]);
        }
      }
    }

    setSelectedSessionExercises((prevExercises) => [
      ...prevExercises,
      ...newSessionExercises,
    ]);
    setSelectedExercise((prevExercises) => [...prevExercises, ...newExercises]);

    document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
      checkbox.checked = false;
    });

    // Clear the checkedExercises state
    setCheckedExercises({});

    setAddonVisible(false);
    setAddonSelectExerciseTypeVisible(false);
    setAddonShowCalisteniaExercises(false);
    setAddonShowCardioExercises(false);
    setAddonShowPesoLibreExercises(false);
    setAddonShowMaquinasExercises(false);
  };

  const deleteSessionExercise = (pk_id_exercise) => {
    deleteSessionExerciseById(id, pk_id_exercise).then((response) => {
      if (response && !response.error) {
        setSelectedSessionExercises((prevExercises) =>
          prevExercises.filter(
            (exercise) =>
              !(
                exercise.fk_id_sessio !== id &&
                exercise.fk_id_exercise === pk_id_exercise
              )
          )
        );
        setSelectedExercise((prevExercises) =>
          prevExercises.filter(
            (exercise) => exercise.pk_id_exercise !== pk_id_exercise
          )
        );
      }
    });
  };

  return (
    <>
      <div className="allCont flex flex-column align-center backgroundGradient position-relative">
        {/* ADDONS GENERAL */}
        <div
          className="addonSet addonInferior align-center"
          style={{
            display: isAddonVisible ? "flex" : "none",
          }}
        >
          <div
            id="selectExerciseType"
            className="allContResponsive cage90 backgroundBlack marginAuto addonSetContainer"
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
            ref={pesoLibreForm}
            id="showPesoLibreExercises"
            className="allContResponsive cage90 addonExercisesShow backgroundYellow marginAuto addonSetContainer"
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
            <div className="filterButtons cage90 flex marginAuto">
              <button
                className={`tagGlobal tagColor1 ${
                  selectedCategory === 1 ? "selectedButton" : ""
                }`}
                onClick={() => setSelectedCategory(1)}
              >
                Pecho
              </button>
              <button
                className={`tagGlobal tagColor1 ${
                  selectedCategory === 2 ? "selectedButton" : ""
                }`}
                onClick={() => setSelectedCategory(2)}
              >
                Brazos
              </button>
              <button
                className={`tagGlobal tagColor1 ${
                  selectedCategory === 3 ? "selectedButton" : ""
                }`}
                onClick={() => setSelectedCategory(3)}
              >
                Espalda
              </button>
              <button
                className={`tagGlobal tagColor1 ${
                  selectedCategory === 4 ? "selectedButton" : ""
                }`}
                onClick={() => setSelectedCategory(4)}
              >
                Piernas
              </button>
              <button
                className={`tagGlobal tagColor1 ${
                  selectedCategory === null ? "selectedButton" : ""
                }`}
                onClick={() => setSelectedCategory(null)}
              >
                Todos
              </button>
            </div>

            <div className="globalForm flex flex-column cage90 marginAuto">
              {(pesoLibreExercises || [])
                .filter((pesoLibre) => {
                  const isExerciseSelected = selectedSessionExercises.find(
                    (exercise) =>
                      exercise.fk_id_exercise === pesoLibre.pk_id_exercise
                  );
                  const isCategorySelected =
                    !selectedCategory ||
                    pesoLibre.fk_category_1 === selectedCategory;

                  return !isExerciseSelected && isCategorySelected;
                })
                .map((pesoLibre) => {
                  const exerciseId = String(pesoLibre.pk_id_exercise); // Convert to string

                  return (
                    <div
                      className="labelExercises flex"
                      key={pesoLibre.pk_id_exercise} // Use `pesoLibre.pk_id_exercise` as the key
                    >
                      <button
                        className="infoButton"
                        onClick={() => showDescription2(pesoLibre)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="128"
                          height="128"
                          viewBox="0 0 24 24"
                        >
                          <path d="M11 17h2v-6h-2zm1-8q.425 0 .713-.288T13 8t-.288-.712T12 7t-.712.288T11 8t.288.713T12 9m0 13q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22" />
                        </svg>
                      </button>
                      <div className="flex flex-column cage100">
                        <div className="flex align-center">
                          <label htmlFor={exerciseId}>
                            {pesoLibre.exercise_name}
                          </label>
                          <input
                            id={exerciseId}
                            name={exerciseId}
                            type="checkbox"
                            checked={checkedExercises[exerciseId] || false}
                            onChange={(e) => {
                              setCheckedExercises({
                                ...checkedExercises,
                                [exerciseId]: e.target.checked,
                              });
                            }}
                          />
                        </div>
                        <p className="tagGlobal tagColor1">
                          {categoryMap[pesoLibre.fk_category_1]}
                        </p>
                      </div>
                    </div>
                  );
                })}
            </div>
            <input
              type="submit"
              value={"AÑADIR EJERCICIO"}
              onClick={() => saveExercises("Peso Libre")}
            />
          </form>
          <form
            id="showCalisteniaExercises"
            className="allContResponsive cage90 addonExercisesShow backgroundYellow marginAuto addonSetContainer"
            style={{
              display: isAddonShowCalisteniaExercises ? "block" : "none",
            }}
            onSubmit={preventDefault}
            ref={calisteniaForm}
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
            <div className="filterButtons cage90 flex marginAuto">
              <button
                className={`tagGlobal tagColor1 ${
                  selectedCategory === 1 ? "selectedButton" : ""
                }`}
                onClick={() => setSelectedCategory(1)}
              >
                Pecho
              </button>
              <button
                className={`tagGlobal tagColor1 ${
                  selectedCategory === 2 ? "selectedButton" : ""
                }`}
                onClick={() => setSelectedCategory(2)}
              >
                Brazos
              </button>
              <button
                className={`tagGlobal tagColor1 ${
                  selectedCategory === 3 ? "selectedButton" : ""
                }`}
                onClick={() => setSelectedCategory(3)}
              >
                Espalda
              </button>
              <button
                className={`tagGlobal tagColor1 ${
                  selectedCategory === 4 ? "selectedButton" : ""
                }`}
                onClick={() => setSelectedCategory(4)}
              >
                Piernas
              </button>
              <button
                className={`tagGlobal tagColor1 ${
                  selectedCategory === null ? "selectedButton" : ""
                }`}
                onClick={() => setSelectedCategory(null)}
              >
                Todos
              </button>
            </div>
            <div className="globalForm flex flex-column cage90 marginAuto">
              {(calisteniaExercises || [])
                .filter((calistenia) => {
                  const isExerciseSelected = selectedSessionExercises.find(
                    (exercise) =>
                      exercise.fk_id_exercise === calistenia.pk_id_exercise
                  );
                  const isCategorySelected =
                    !selectedCategory ||
                    calistenia.fk_category_1 === selectedCategory;

                  return !isExerciseSelected && isCategorySelected;
                })
                .map((calistenia) => {
                  const exerciseId = String(calistenia.pk_id_exercise); // Convert to string

                  return (
                    <div
                      className="labelExercises flex"
                      key={calistenia.pk_id_exercise} // Use `calistenia.pk_id_exercise` as the key
                    >
                      <button
                        className="infoButton"
                        onClick={() => showDescription2(calistenia)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="128"
                          height="128"
                          viewBox="0 0 24 24"
                        >
                          <path d="M11 17h2v-6h-2zm1-8q.425 0 .713-.288T13 8t-.288-.712T12 7t-.712.288T11 8t.288.713T12 9m0 13q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22" />
                        </svg>
                      </button>
                      <div className="flex flex-column cage100">
                        <div className="flex align-center">
                          <label htmlFor={exerciseId}>
                            {calistenia.exercise_name}
                          </label>
                          <input
                            id={exerciseId}
                            name={exerciseId}
                            type="checkbox"
                            checked={checkedExercises[exerciseId] || false}
                            onChange={(e) => {
                              setCheckedExercises({
                                ...checkedExercises,
                                [exerciseId]: e.target.checked,
                              });
                            }}
                          />
                        </div>
                        <p className="tagGlobal tagColor1">
                          {categoryMap[calistenia.fk_category_1]}
                        </p>
                      </div>
                    </div>
                  );
                })}
            </div>
            <input
              type="submit"
              value={"AÑADIR EJERCICIO"}
              onClick={() => saveExercises("Calistenia")}
            />
          </form>
          <form
            id="showCardioExercises"
            className="allContResponsive cage90 addonExercisesShow backgroundYellow marginAuto addonSetContainer"
            style={{
              display: isAddonShowCardioExercises ? "block" : "none",
            }}
            onSubmit={preventDefault}
            ref={cardioForm}
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
            <div className="filterButtons cage90 flex marginAuto">
              <button
                className={`tagGlobal tagColor1 ${
                  selectedCategory === 1 ? "selectedButton" : ""
                }`}
                onClick={() => setSelectedCategory(1)}
              >
                Pecho
              </button>
              <button
                className={`tagGlobal tagColor1 ${
                  selectedCategory === 2 ? "selectedButton" : ""
                }`}
                onClick={() => setSelectedCategory(2)}
              >
                Brazos
              </button>
              <button
                className={`tagGlobal tagColor1 ${
                  selectedCategory === 3 ? "selectedButton" : ""
                }`}
                onClick={() => setSelectedCategory(3)}
              >
                Espalda
              </button>
              <button
                className={`tagGlobal tagColor1 ${
                  selectedCategory === 4 ? "selectedButton" : ""
                }`}
                onClick={() => setSelectedCategory(4)}
              >
                Piernas
              </button>
              <button
                className={`tagGlobal tagColor1 ${
                  selectedCategory === null ? "selectedButton" : ""
                }`}
                onClick={() => setSelectedCategory(null)}
              >
                Todos
              </button>
            </div>
            <div className="globalForm flex flex-column cage90 marginAuto">
              {(cardioExercises || [])
                .filter((cardio) => {
                  const isExerciseSelected = selectedSessionExercises.find(
                    (exercise) =>
                      exercise.fk_id_exercise === cardio.pk_id_exercise
                  );
                  const isCategorySelected =
                    !selectedCategory ||
                    cardio.fk_category_1 === selectedCategory;

                  return !isExerciseSelected && isCategorySelected;
                })
                .map((cardio) => {
                  const exerciseId = String(cardio.pk_id_exercise); // Convert to string

                  return (
                    <div
                      className="labelExercises flex"
                      key={cardio.pk_id_exercise} // Use `cardio.pk_id_exercise` as the key
                    >
                      <button
                        className="infoButton"
                        onClick={() => showDescription2(cardio)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="128"
                          height="128"
                          viewBox="0 0 24 24"
                        >
                          <path d="M11 17h2v-6h-2zm1-8q.425 0 .713-.288T13 8t-.288-.712T12 7t-.712.288T11 8t.288.713T12 9m0 13q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22" />
                        </svg>
                      </button>
                      <div className="flex flex-column cage100">
                        <div className="flex align-center">
                          <label htmlFor={exerciseId}>
                            {cardio.exercise_name}
                          </label>
                          <input
                            id={exerciseId}
                            name={exerciseId}
                            type="checkbox"
                            checked={checkedExercises[exerciseId] || false}
                            onChange={(e) => {
                              setCheckedExercises({
                                ...checkedExercises,
                                [exerciseId]: e.target.checked,
                              });
                            }}
                          />
                        </div>
                        <p className="tagGlobal tagColor1">
                          {categoryMap[cardio.fk_category_1]}
                        </p>
                      </div>
                    </div>
                  );
                })}
            </div>
            <input
              type="submit"
              value={"AÑADIR EJERCICIO"}
              onClick={() => saveExercises("Cardio")}
            />
          </form>
          <form
            id="showMaquinasExercises"
            className="allContResponsive cage90 addonExercisesShow backgroundYellow marginAuto addonSetContainer"
            style={{
              display: isAddonShowMaquinasExercises ? "block" : "none",
            }}
            onSubmit={preventDefault}
            ref={maquinasForm}
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
            <div className="filterButtons cage90 flex marginAuto">
              <button
                className={`tagGlobal tagColor1 ${
                  selectedCategory === 1 ? "selectedButton" : ""
                }`}
                onClick={() => setSelectedCategory(1)}
              >
                Pecho
              </button>
              <button
                className={`tagGlobal tagColor1 ${
                  selectedCategory === 2 ? "selectedButton" : ""
                }`}
                onClick={() => setSelectedCategory(2)}
              >
                Brazos
              </button>
              <button
                className={`tagGlobal tagColor1 ${
                  selectedCategory === 3 ? "selectedButton" : ""
                }`}
                onClick={() => setSelectedCategory(3)}
              >
                Espalda
              </button>
              <button
                className={`tagGlobal tagColor1 ${
                  selectedCategory === 4 ? "selectedButton" : ""
                }`}
                onClick={() => setSelectedCategory(4)}
              >
                Piernas
              </button>
              <button
                className={`tagGlobal tagColor1 ${
                  selectedCategory === null ? "selectedButton" : ""
                }`}
                onClick={() => setSelectedCategory(null)}
              >
                Todos
              </button>
            </div>
            <div className="globalForm flex flex-column cage90 marginAuto">
              {(maquinasExercises || [])
                .filter((maquina) => {
                  const isExerciseSelected = selectedSessionExercises.find(
                    (exercise) =>
                      exercise.fk_id_exercise === maquina.pk_id_exercise
                  );
                  const isCategorySelected =
                    !selectedCategory ||
                    maquina.fk_category_1 === selectedCategory;

                  return !isExerciseSelected && isCategorySelected;
                })
                .map((maquina) => {
                  const exerciseId = String(maquina.pk_id_exercise); // Convert to string

                  return (
                    <div
                      className="labelExercises flex"
                      key={maquina.pk_id_exercise} // Use `maquina.pk_id_exercise` as the key
                    >
                      <button
                        className="infoButton"
                        onClick={() => showDescription2(maquina)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="128"
                          height="128"
                          viewBox="0 0 24 24"
                        >
                          <path d="M11 17h2v-6h-2zm1-8q.425 0 .713-.288T13 8t-.288-.712T12 7t-.712.288T11 8t.288.713T12 9m0 13q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22" />
                        </svg>
                      </button>
                      <div className="flex flex-column cage100">
                        <div className="flex align-center">
                          <label htmlFor={exerciseId}>
                            {maquina.exercise_name}
                          </label>
                          <input
                            id={exerciseId}
                            name={exerciseId}
                            type="checkbox"
                            checked={checkedExercises[exerciseId] || false}
                            onChange={(e) => {
                              setCheckedExercises({
                                ...checkedExercises,
                                [exerciseId]: e.target.checked,
                              });
                            }}
                          />
                        </div>
                        <p className="tagGlobal tagColor1">
                          {categoryMap[maquina.fk_category_1]}
                        </p>
                      </div>
                    </div>
                  );
                })}
            </div>
            <input
              type="submit"
              value={"AÑADIR EJERCICIO"}
              onClick={() => saveExercises("Maquinas")}
            />
          </form>
          <div
            id="showExerciseDescription"
            className="allContResponsive cage90 backgroundBlack marginAuto addonSetContainer"
            style={{
              display: isAddonShowExerciseDescription ? "block" : "none",
            }}
          >
            <div className="editRoutineShowName flex justify-between cage90 marginAuto">
              <div className="textEditRoutinShowLimitation">
                <h2 ref={h2Title}></h2>
                <p className="tagGlobal tagColor1" ref={category}></p>
              </div>
              <button onClick={closeShowDescription}>
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
            <p className=" cage90 textDescription" ref={pDescription}></p>
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
        {/* PAGE CONTENT */}
        <div id="editSessionExercises" className="allContResponsive cage90 flex flex-column">
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
          {(selectedExercise || []).map((exercise, index) => (
            <div
              className="editEachSession backgroundPurple flex justify-between align-center"
              key={index}
            >
              <h2>{exercise.exercise_name}</h2>

              <div className="contButtonsEditRoutine">
                <button onClick={() => showDescription(exercise)} className="hoverYellow">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="128"
                    height="128"
                    viewBox="0 0 24 24"
                  >
                    <path d="M11 17h2v-6h-2zm1-8q.425 0 .713-.288T13 8t-.288-.712T12 7t-.712.288T11 8t.288.713T12 9m0 13q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22" />
                  </svg>
                </button>
                <button
                  onClick={() => deleteSessionExercise(exercise.pk_id_exercise)}
                  className="hoverYellow tagGlobal tagColor1"
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
        </div>
        <Nav webPage="rutina" />
      </div>
    </>
  );
}

export default editSession;
