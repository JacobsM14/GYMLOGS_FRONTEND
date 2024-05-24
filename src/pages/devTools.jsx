import Nav from "./../components/navComponent/navComponent";
import "./../styles/devTools.css";
import React, { useState, useEffect, useRef } from "react";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

import {
  getAllUsers,
  updateUserRole,
  deleteUserById,
  getAllExercises,
  createExercise,
  updateExercise,
  deleteExerciseById,
} from "./../services/userApi";

function DevTools() {
  const navigate = useNavigate();
  // ADDON GENERAL
  const [isAddonVisible, setIsAddonVisible] = useState(false);
  const [isAddonEditUser, setIsAddonEditUser] = useState(false);
  const [isAddonDeleteUser, setIsAddonDeleteUser] = useState(false);
  const [isAddonCreateExercise, setIsAddonCreateExercise] = useState(false);
  const [isAddonEditExercise, setIsAddonEditExercise] = useState(false);
  const [isAddonDeleteExercise, setIsAddonDeleteExercise] = useState(false);

  // SAVED INFO
  const [users, setUsers] = useState([]);
  const [exercises, setExercises] = useState([]);

  const preventDefault = (e) => {
    e.preventDefault();
  };

  // USERS
  // TOGGLE ADDON SAVED INFO
  const [selectedUserEdit, setSelectedUserEdit] = useState({});
  const [selectedUserType, setSelectedUserType] = useState(0);
  const [selectedUserDelete, setSelectedUserDelete] = useState(0);

  const toggleUserEditAddon = (userId) => {
    setIsAddonEditUser(!isAddonEditUser);
    setIsAddonVisible(!isAddonVisible);
    users.map((user) => {
      if (user.pk_id_user === userId) {
        setSelectedUserEdit(user);
        setSelectedUserType(user.urole);
        selectUserType(user.urole);
      }
    });
  };

  const gratuitaRef = useRef();
  const premiumRef = useRef();
  const adminRef = useRef();

  const changeUserType = (userType) => {
    setSelectedUserType(userType);
    selectUserType(userType);
  };

  const selectUserType = (userType) => {
    switch (userType) {
      case 1:
        adminRef.current.style.filter = "grayScale(0)";
        gratuitaRef.current.style.filter = "grayScale(1)";
        premiumRef.current.style.filter = "grayScale(1)";
        break;
      case 2:
        adminRef.current.style.filter = "grayScale(1)";
        gratuitaRef.current.style.filter = "grayScale(0)";
        premiumRef.current.style.filter = "grayScale(1)";
        break;
      case 3:
        adminRef.current.style.filter = "grayScale(1)";
        gratuitaRef.current.style.filter = "grayScale(1)";
        premiumRef.current.style.filter = "grayScale(0)";
        break;
      default:
        return "Error";
    }
  };

  const untoggleUserEditAddon = () => {
    setIsAddonEditUser(false);
    setIsAddonVisible(false);
    setSelectedUserEdit({});
  };

  const updateUser = () => {
    let urole = selectedUserType;

    updateUserRole(selectedUserEdit.pk_id_user, urole).then((res) => {
      if (res) {
        setIsAddonEditUser(false);
        setIsAddonVisible(false);
        getAllUsersFunction();
        setSelectedUserEdit({});
      }
    });
  };

  const toggleUserDeleteAddon = (userId) => {
    setIsAddonVisible(!isAddonVisible);
    setIsAddonDeleteUser(!isAddonDeleteUser);
    setSelectedUserDelete(userId);
  };

  const deleteUser = () => {
    setIsAddonDeleteUser(false);
    setIsAddonVisible(false);

    deleteUserById(selectedUserDelete).then((res) => {
      if (res) {
        getAllUsersFunction();
      }
    });
  };

  const untoggleUserDeleteAddon = () => {
    setIsAddonDeleteUser(false);
    setIsAddonVisible(false);
    setSelectedUserDelete(0);
  };

  // GET ALL USERS
  const getAllUsersFunction = () => {
    setUsers([]);
    getAllUsers().then((res) => {
      setUsers(res);
    });
  };

  //EXERCISES
  //DATA
  const [selectedExerciseEdit, setSelectedExerciseEdit] = useState({});
  const [selectedExerciseDelete, setSelectedExerciseDelete] = useState(0);

  const toggleExerciseCreateAddon = () => {
    setIsAddonVisible(!isAddonVisible);
    setIsAddonCreateExercise(!isAddonCreateExercise);
  };

  const pechoCategoryCreate = useRef();
  const brazosCategoryCreate = useRef();
  const espaldaCategoryCreate = useRef();
  const piernasCategoryCreate = useRef();

  const calisteniaTypeCreate = useRef();
  const cardioTypeCreate = useRef();
  const pesoLibreTypeCreate = useRef();
  const maquinasTypeCreate = useRef();

  const [selectedCreateExerciseCategory, setSelectedCreateExerciseCategory] =
    useState(0);

  const [selectedCreateExerciseType, setSelectedCreateExerciseType] =
    useState(0);

  const selectExerciseCategory = (category) => {
    setSelectedCreateExerciseCategory(category);

    switch (category) {
      case 1:
        pechoCategoryCreate.current.style.filter = "grayScale(0)";
        brazosCategoryCreate.current.style.filter = "grayScale(1)";
        espaldaCategoryCreate.current.style.filter = "grayScale(1)";
        piernasCategoryCreate.current.style.filter = "grayScale(1)";
        break;
      case 2:
        pechoCategoryCreate.current.style.filter = "grayScale(1)";
        brazosCategoryCreate.current.style.filter = "grayScale(0)";
        espaldaCategoryCreate.current.style.filter = "grayScale(1)";
        piernasCategoryCreate.current.style.filter = "grayScale(1)";
        break;
      case 3:
        pechoCategoryCreate.current.style.filter = "grayScale(1)";
        brazosCategoryCreate.current.style.filter = "grayScale(1)";
        espaldaCategoryCreate.current.style.filter = "grayScale(0)";
        piernasCategoryCreate.current.style.filter = "grayScale(1)";
        break;
      case 4:
        pechoCategoryCreate.current.style.filter = "grayScale(1)";
        brazosCategoryCreate.current.style.filter = "grayScale(1)";
        espaldaCategoryCreate.current.style.filter = "grayScale(1)";
        piernasCategoryCreate.current.style.filter = "grayScale(0)";
        break;
      default:
        return "Error";
    }
  };

  const selectExcerciseType = (type) => {
    setSelectedCreateExerciseType(type);

    switch (type) {
      case 1:
        calisteniaTypeCreate.current.style.filter = "grayScale(1)";
        cardioTypeCreate.current.style.filter = "grayScale(1)";
        pesoLibreTypeCreate.current.style.filter = "grayScale(0)";
        maquinasTypeCreate.current.style.filter = "grayScale(1)";
        break;
      case 2:
        calisteniaTypeCreate.current.style.filter = "grayScale(0)";
        cardioTypeCreate.current.style.filter = "grayScale(1)";
        pesoLibreTypeCreate.current.style.filter = "grayScale(1)";
        maquinasTypeCreate.current.style.filter = "grayScale(1)";
        break;
      case 3:
        calisteniaTypeCreate.current.style.filter = "grayScale(1)";
        cardioTypeCreate.current.style.filter = "grayScale(0)";
        pesoLibreTypeCreate.current.style.filter = "grayScale(1)";
        maquinasTypeCreate.current.style.filter = "grayScale(1)";
        break;
      case 4:
        calisteniaTypeCreate.current.style.filter = "grayScale(1)";
        cardioTypeCreate.current.style.filter = "grayScale(1)";
        pesoLibreTypeCreate.current.style.filter = "grayScale(1)";
        maquinasTypeCreate.current.style.filter = "grayScale(0)";
        break;
      default:
        return "Error";
    }
  };

  const createExerciseNameValue = useRef();
  const createExerciseDescriptionValue = useRef();

  const [createExerciseNameNotEmty, setCreateExerciseNameNotEmty] =
    useState(false);
  const [
    createExerciseDescriptionNotEmty,
    setCreateExerciseDescriptionNotEmty,
  ] = useState(false);
  const [createExerciseCategoryNotEmty, setCreateExerciseCategoryNotEmty] =
    useState(false);
  const [createExerciseTypeNotEmty, setCreateExerciseTypeNotEmty] =
    useState(false);

  const createExerciseDatabase = () => {
    let exercise_name = createExerciseNameValue.current.value;
    let description = createExerciseDescriptionValue.current.value;
    let fk_category_1 = selectedCreateExerciseCategory;
    let fk_id_type = selectedCreateExerciseType;

    if (exercise_name === "") {
      setCreateExerciseNameNotEmty(true);
      return;
    } else {
      setCreateExerciseNameNotEmty(false);
    }

    if (description === "") {
      setCreateExerciseDescriptionNotEmty(true);
      return;
    } else {
      setCreateExerciseDescriptionNotEmty(false);
    }

    if (fk_category_1 === 0) {
      setCreateExerciseCategoryNotEmty(true);
      return;
    } else {
      setCreateExerciseCategoryNotEmty(false);
    }

    if (fk_id_type === 0) {
      setCreateExerciseTypeNotEmty(true);
      return;
    } else {
      setCreateExerciseTypeNotEmty(false);
    }

    if (
      exercise_name !== "" &&
      description !== "" &&
      fk_category_1 !== 0 &&
      fk_id_type !== 0
    ) {
      createExercise(
        exercise_name,
        description,
        fk_category_1,
        fk_id_type
      ).then((res) => {
        if (res) {
          setIsAddonCreateExercise(false);
          setIsAddonVisible(false);
          getAllExercisesFunction();
          console.log("success");
        } else {
          console.log("error");
        }
      });
    }
  };

  const untoggleExerciseCreateAddon = () => {
    setIsAddonCreateExercise(false);
    setIsAddonVisible(false);
  };

  const [selectedExerciseEditName, setSelectedExerciseEditName] = useState("");
  const [selectedExerciseEditDescription, setSelectedExerciseEditDescription] =
    useState("");
  const [selectedExerciseEditCategory, setSelectedExerciseEditCategory] =
    useState(0);
  const [selectedExerciseEditType, setSelectedExerciseEditType] = useState(0);

  const toggleExerciseEditAddon = (exerciseId) => {
    setIsAddonEditExercise(!isAddonEditExercise);
    setIsAddonVisible(!isAddonVisible);
    exercises.map((exercise) => {
      if (exercise.pk_id_exercise === exerciseId) {
        setSelectedExerciseEdit(exercise);
        setSelectedExerciseEditName(exercise.exercise_name);
        setSelectedExerciseEditDescription(exercise.description);
        selectExerciseCategoryEdit(exercise.fk_category_1);
        selectExerciseTypeEdit(exercise.fk_id_type);
      }
    });
  };

  const [editExerciseNameNotEmty, setEditExerciseNameNotEmty] = useState(false);
  const [editExerciseDescriptionNotEmty, setEditExerciseDescriptionNotEmty] =
    useState(false);
  const [editExerciseCategoryNotEmty, setEditExerciseCategoryNotEmty] =
    useState(false);
  const [editExerciseTypeNotEmty, setEditExerciseTypeNotEmty] = useState(false);

  const pechoCategoryEdit = useRef();
  const brazosCategoryEdit = useRef();
  const espaldaCategoryEdit = useRef();
  const piernasCategoryEdit = useRef();

  const calisteniaTypeEdit = useRef();
  const cardioTypeEdit = useRef();
  const pesoLibreTypeEdit = useRef();
  const maquinasTypeEdit = useRef();

  const selectExerciseCategoryEdit = (category) => {
    setSelectedExerciseEditCategory(category);

    switch (category) {
      case 1:
        pechoCategoryEdit.current.style.filter = "grayScale(0)";
        brazosCategoryEdit.current.style.filter = "grayScale(1)";
        espaldaCategoryEdit.current.style.filter = "grayScale(1)";
        piernasCategoryEdit.current.style.filter = "grayScale(1)";
        break;
      case 2:
        pechoCategoryEdit.current.style.filter = "grayScale(1)";
        brazosCategoryEdit.current.style.filter = "grayScale(0)";
        espaldaCategoryEdit.current.style.filter = "grayScale(1)";
        piernasCategoryEdit.current.style.filter = "grayScale(1)";
        break;
      case 3:
        pechoCategoryEdit.current.style.filter = "grayScale(1)";
        brazosCategoryEdit.current.style.filter = "grayScale(1)";
        espaldaCategoryEdit.current.style.filter = "grayScale(0)";
        piernasCategoryEdit.current.style.filter = "grayScale(1)";
        break;
      case 4:
        pechoCategoryEdit.current.style.filter = "grayScale(1)";
        brazosCategoryEdit.current.style.filter = "grayScale(1)";
        espaldaCategoryEdit.current.style.filter = "grayScale(1)";
        piernasCategoryEdit.current.style.filter = "grayScale(0)";
        break;
      default:
        return "Error";
    }
  };

  const selectExerciseTypeEdit = (type) => {
    setSelectedExerciseEditType(type);

    switch (type) {
      case 1:
        calisteniaTypeEdit.current.style.filter = "grayScale(1)";
        cardioTypeEdit.current.style.filter = "grayScale(1)";
        pesoLibreTypeEdit.current.style.filter = "grayScale(0)";
        maquinasTypeEdit.current.style.filter = "grayScale(1)";
        break;
      case 2:
        calisteniaTypeEdit.current.style.filter = "grayScale(0)";
        cardioTypeEdit.current.style.filter = "grayScale(1)";
        pesoLibreTypeEdit.current.style.filter = "grayScale(1)";
        maquinasTypeEdit.current.style.filter = "grayScale(1)";
        break;
      case 3:
        calisteniaTypeEdit.current.style.filter = "grayScale(1)";
        cardioTypeEdit.current.style.filter = "grayScale(0)";
        pesoLibreTypeEdit.current.style.filter = "grayScale(1)";
        maquinasTypeEdit.current.style.filter = "grayScale(1)";
        break;
      case 4:
        calisteniaTypeEdit.current.style.filter = "grayScale(1)";
        cardioTypeEdit.current.style.filter = "grayScale(1)";
        pesoLibreTypeEdit.current.style.filter = "grayScale(1)";
        maquinasTypeEdit.current.style.filter = "grayScale(0)";
        break;
      default:
        return "Error";
    }
  };

  const updateExerciseDatabase = () => {
    if (selectedExerciseEditName === "") {
      setEditExerciseNameNotEmty(true);
      return;
    } else {
      setEditExerciseNameNotEmty(false);
    }

    if (selectedExerciseEditDescription === "") {
      setEditExerciseDescriptionNotEmty(true);
      return;
    } else {
      setEditExerciseDescriptionNotEmty(false);
    }

    if (selectedExerciseEditCategory === 0) {
      setEditExerciseCategoryNotEmty(true);

      return;
    } else {
      setEditExerciseCategoryNotEmty(false);
    }

    if (selectedExerciseEditType === 0) {
      setEditExerciseTypeNotEmty(true);
    } else {
      setEditExerciseTypeNotEmty(false);
    }

    if (
      selectedExerciseEditName !== "" &&
      selectedExerciseEditDescription !== "" &&
      selectedExerciseEditCategory !== 0 &&
      selectedExerciseEditType !== 0
    ) {
      updateExercise(
        selectedExerciseEdit.pk_id_exercise,
        selectedExerciseEditName,
        selectedExerciseEditDescription,
        selectedExerciseEditCategory,
        selectedExerciseEditType
      ).then((res) => {
        if (res) {
          setIsAddonEditExercise(false);
          setIsAddonVisible(false);
          getAllExercisesFunction();
          setSelectedExerciseEdit({});
          setSelectedExerciseEditName("");
          setSelectedExerciseEditDescription("");
          setSelectedExerciseEditCategory(0);
          setSelectedExerciseEditType(0);
        }
      });
    }
  };

  const untoggleExerciseEditAddon = () => {
    setIsAddonEditExercise(false);
    setIsAddonVisible(false);
    setSelectedExerciseEdit({});
    setSelectedExerciseEditName("");
    setSelectedExerciseEditDescription("");
    setSelectedExerciseEditCategory(0);
    setSelectedExerciseEditType(0);
  };

  const toggleExerciseDeleteAddon = (exerciseId) => {
    setIsAddonVisible(!isAddonVisible);
    setIsAddonDeleteExercise(!isAddonDeleteExercise);
    setSelectedExerciseDelete(exerciseId);
  };

  const deleteExercise = () => {
    setIsAddonDeleteExercise(false);
    setIsAddonVisible(false);

    deleteExerciseById(selectedExerciseDelete).then((res) => {
      if (res) {
        getAllExercises().then((res) => {
          setExercises(res);
        });
      }
    });
  };

  const untoggleExerciseDeleteAddon = () => {
    setIsAddonDeleteExercise(false);
    setIsAddonVisible(false);
    setSelectedExerciseDelete(0);
  };

  const getAllExercisesFunction = () => {
    setExercises([]);
    getAllExercises().then((res) => {
      setExercises(res);
    });
  };

  // NEED TO BE LOGED IN TO ACCESS THIS PAGE
  useEffect(() => {
    const cookies = new Cookies();
    const token = cookies.get("token");
    const urole = cookies.get("userRole");

    if (!token || urole !== 1) {
      navigate("/login");
    } else {
      getAllUsersFunction();

      getAllExercisesFunction();
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
        >
          <div
            id="isAddonEditUser"
            className="allContResponsive cage90 backgroundWhite marginAuto addonSetContainer"
            style={{
              display: isAddonEditUser ? "block" : "none",
            }}
          >
            <div className="textAddonDevtools cage90 marginAuto flex justify-between">
              <h2>USUARIO: {selectedUserEdit.username}</h2>
              <button
                className="crossDevtoolsButton"
                onClick={untoggleUserEditAddon}
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
            <form
              className="cage100 flex flex-column"
              onSubmit={preventDefault}
            >
              <div className="userTypeSelect cage90 flex align-center tagCont">
                <button
                  className="tagGlobal tagColor2"
                  ref={gratuitaRef}
                  onClick={() => changeUserType(2)}
                >
                  Gratuita
                </button>
                <button
                  className="tagGlobal tagColor2"
                  ref={premiumRef}
                  onClick={() => changeUserType(3)}
                >
                  Premium
                </button>
                <button
                  className="tagGlobal tagColor2"
                  ref={adminRef}
                  onClick={() => changeUserType(1)}
                >
                  Administrador
                </button>
              </div>
              <input
                type="submit"
                value={"EDITAR"}
                className="submitDevtoolsButton"
                onClick={updateUser}
              />
            </form>
          </div>
          <div
            id="verificateDeleteUser"
            className="allContResponsive cage90 backgroundWhite marginAuto addonSetContainer confirmDeleteDevTools"
            style={{ display: isAddonDeleteUser ? "block" : "none" }}
          >
            <h2>¿Estas seguro de que quieres eliminar este usuario?</h2>
            <div className="flex justify-between cage45 marginAuto">
              <button className="tagColor1" onClick={untoggleUserDeleteAddon}>
                NO
              </button>
              <button className="tagColor2" onClick={deleteUser}>
                SI
              </button>
            </div>
          </div>
          <div
            id="isAddonCreateExercise"
            className="allContResponsive cage90 backgroundWhite marginAuto addonSetContainer"
            style={{
              display: isAddonCreateExercise ? "block" : "none",
            }}
          >
            <div className="textAddonDevtools cage90 marginAuto flex justify-between">
              <h2>CREA EJERCICIOS</h2>
              <button
                className="crossDevtoolsButton"
                onClick={untoggleExerciseCreateAddon}
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
            <form
              className="cage100 flex flex-column"
              onSubmit={preventDefault}
            >
              <p
                className="adviseFormText cage90 block marginAuto"
                style={{
                  display:
                    createExerciseNameNotEmty || createExerciseNameNotEmty
                      ? "flex"
                      : "none",
                }}
              >
                Introduce un nombre*
              </p>
              <input
                type="text"
                placeholder="Nombre del ejercicio"
                ref={createExerciseNameValue}
              />
              <p
                className="adviseFormText cage90 block marginAuto"
                style={{
                  display:
                    createExerciseDescriptionNotEmty ||
                    createExerciseDescriptionNotEmty
                      ? "flex"
                      : "none",
                }}
              >
                Introduce una descripcion*
              </p>
              <textarea
                name="descripcion"
                id="descripcion"
                cols="30"
                rows="10"
                placeholder="Descripcion del ejercicio: "
                ref={createExerciseDescriptionValue}
              ></textarea>
              <p
                className="adviseFormText cage90 block marginAuto"
                style={{
                  display:
                    createExerciseCategoryNotEmty ||
                    createExerciseCategoryNotEmty
                      ? "flex"
                      : "none",
                }}
              >
                Escoge una categoria*
              </p>
              <div className="userTypeSelect cage90 flex align-center tagCont">
                <button
                  className="tagGlobal tagColor2"
                  ref={pechoCategoryCreate}
                  onClick={() => selectExerciseCategory(1)}
                >
                  Pecho
                </button>
                <button
                  className="tagGlobal tagColor2"
                  ref={brazosCategoryCreate}
                  onClick={() => selectExerciseCategory(2)}
                >
                  Brazos
                </button>
                <button
                  className="tagGlobal tagColor2"
                  ref={espaldaCategoryCreate}
                  onClick={() => selectExerciseCategory(3)}
                >
                  Espalda
                </button>
                <button
                  className="tagGlobal tagColor2"
                  ref={piernasCategoryCreate}
                  onClick={() => selectExerciseCategory(4)}
                >
                  Piernas
                </button>
              </div>
              <p
                className="adviseFormText cage90 block marginAuto"
                style={{
                  display:
                    createExerciseTypeNotEmty || createExerciseTypeNotEmty
                      ? "flex"
                      : "none",
                }}
              >
                Escoge el tipo*
              </p>
              <div className="userTypeSelect cage90 flex align-center tagCont">
                <button
                  className="tagGlobal tagColor2"
                  ref={calisteniaTypeCreate}
                  onClick={() => selectExcerciseType(2)}
                >
                  Calistenia
                </button>
                <button
                  className="tagGlobal tagColor2"
                  ref={cardioTypeCreate}
                  onClick={() => selectExcerciseType(3)}
                >
                  Cardio
                </button>
                <button
                  className="tagGlobal tagColor2"
                  ref={pesoLibreTypeCreate}
                  onClick={() => selectExcerciseType(1)}
                >
                  Peso Libre
                </button>
                <button
                  className="tagGlobal tagColor2"
                  ref={maquinasTypeCreate}
                  onClick={() => selectExcerciseType(4)}
                >
                  Maquina
                </button>
              </div>
              <input
                type="submit"
                value={"CREAR EJERCICIO"}
                className="submitDevtoolsButton"
                onClick={createExerciseDatabase}
              />
            </form>
          </div>
          <div
            id="isAddonEditExercise"
            className="allContResponsive cage90 backgroundWhite marginAuto addonSetContainer"
            style={{ display: isAddonEditExercise ? "block" : "none" }}
          >
            <div className="textAddonDevtools cage90 marginAuto flex justify-between">
              <h2>EJERCICIO: {selectedExerciseEdit.exercise_name}</h2>
              <button
                className="crossDevtoolsButton"
                onClick={untoggleExerciseEditAddon}
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
            <form
              className="cage100 flex flex-column"
              onSubmit={preventDefault}
            >
              <p
                className="adviseFormText cage90 block marginAuto"
                style={{
                  display:
                    editExerciseNameNotEmty || editExerciseNameNotEmty
                      ? "flex"
                      : "none",
                }}
              >
                Introduce un nombre*
              </p>
              <input
                type="text"
                placeholder="Nombre del ejercicio"
                value={selectedExerciseEditName}
                onChange={(e) => setSelectedExerciseEditName(e.target.value)}
              />
              <p
                className="adviseFormText cage90 block marginAuto"
                style={{
                  display:
                    editExerciseDescriptionNotEmty ||
                    editExerciseDescriptionNotEmty
                      ? "flex"
                      : "none",
                }}
              >
                Introduce una descripcion*
              </p>
              <textarea
                name="descripcion"
                id="descripcion"
                cols="30"
                rows="10"
                placeholder="Descripcion del ejercicio: "
                value={selectedExerciseEditDescription}
                onChange={(e) =>
                  setSelectedExerciseEditDescription(e.target.value)
                }
              ></textarea>
              <p
                className="adviseFormText cage90 block marginAuto"
                style={{
                  display:
                    editExerciseCategoryNotEmty || editExerciseCategoryNotEmty
                      ? "flex"
                      : "none",
                }}
              >
                Escoge una categoria*
              </p>
              <div className="userTypeSelect cage90 flex align-center tagCont">
                <button
                  className="tagGlobal tagColor2"
                  ref={pechoCategoryEdit}
                  onClick={() => selectExerciseCategoryEdit(1)}
                >
                  Pecho
                </button>
                <button
                  className="tagGlobal tagColor2"
                  ref={brazosCategoryEdit}
                  onClick={() => selectExerciseCategoryEdit(2)}
                >
                  Brazos
                </button>
                <button
                  className="tagGlobal tagColor2"
                  ref={espaldaCategoryEdit}
                  onClick={() => selectExerciseCategoryEdit(3)}
                >
                  Espalda
                </button>
                <button
                  className="tagGlobal tagColor2"
                  ref={piernasCategoryEdit}
                  onClick={() => selectExerciseCategoryEdit(4)}
                >
                  Piernas
                </button>
              </div>
              <p
                className="adviseFormText cage90 block marginAuto"
                style={{
                  display:
                    editExerciseTypeNotEmty || editExerciseTypeNotEmty
                      ? "flex"
                      : "none",
                }}
              >
                Escoge el tipo*
              </p>
              <div className="userTypeSelect cage90 flex align-center tagCont">
                <button
                  className="tagGlobal tagColor2"
                  ref={calisteniaTypeEdit}
                  onClick={() => selectExerciseTypeEdit(2)}
                >
                  Calistenia
                </button>
                <button
                  className="tagGlobal tagColor2"
                  ref={cardioTypeEdit}
                  onClick={() => selectExerciseTypeEdit(3)}
                >
                  Cardio
                </button>
                <button
                  className="tagGlobal tagColor2"
                  ref={pesoLibreTypeEdit}
                  onClick={() => selectExerciseTypeEdit(1)}
                >
                  Peso Libre
                </button>
                <button
                  className="tagGlobal tagColor2"
                  ref={maquinasTypeEdit}
                  onClick={() => selectExerciseTypeEdit(4)}
                >
                  Maquina
                </button>
              </div>
              <input
                type="submit"
                value={"EDITAR EJERCICIO"}
                className="submitDevtoolsButton"
                onClick={updateExerciseDatabase}
              />
            </form>
          </div>
          <div
            id="verificateDeleteExercise"
            className="allContResponsive cage90 backgroundWhite marginAuto addonSetContainer confirmDeleteDevTools"
            style={{ display: isAddonDeleteExercise ? "block" : "none" }}
          >
            <h2>¿Estas seguro de que quieres eliminar este ejercicio?</h2>
            <div className="flex justify-between cage45 marginAuto">
              <button
                className="tagColor1"
                onClick={untoggleExerciseDeleteAddon}
              >
                NO
              </button>
              <button className="tagColor2" onClick={deleteExercise}>
                SI
              </button>
            </div>
          </div>
        </div>
        {/* CONT GENERAL */}
        <div
          id="devTools"
          className="allContResponsive cage90 marginAuto flex flex-column"
        >
          <h1>PANEL DE ADMINISTRACIÓN</h1>
          <div className="marginCages cage100 backgroundBlack flex flex-column border-r5">
            <h2>USUARIOS</h2>
            <div className="cageOfUserCard cage90 marginAuto flex flex-column">
              {users.map((user) => {
                return (
                  <div
                    className="userCard cage100 marginAuto flex justify-between align-center backgroundWhite border-r5"
                    key={user.pk_id_user}
                  >
                    <div className="flex flex-column textShowUsersDevTools">
                      <p>{user.username}</p>
                      <p>{user.email}</p>
                    </div>
                    <div className="flex">
                      <button
                        className="hoverPurple"
                        onClick={() => toggleUserEditAddon(user.pk_id_user)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="128"
                          height="128"
                          viewBox="0 0 24 24"
                        >
                          <path d="M3 21v-4.25L16.2 3.575q.3-.275.663-.425t.762-.15t.775.15t.65.45L20.425 5q.3.275.438.65T21 6.4q0 .4-.137.763t-.438.662L7.25 21zM17.6 7.8L19 6.4L17.6 5l-1.4 1.4z" />
                        </svg>
                      </button>
                      <button
                        className="hoverPurple"
                        onClick={() => toggleUserDeleteAddon(user.pk_id_user)}
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
                );
              })}
            </div>
          </div>

          <div className="marginCages cage100 backgroundBlack flex flex-column border-r5">
            <h2>EJERCICIOS</h2>
            <button
              className="cage90 addButton flex align-center justify-center backgroundYellow border-r5"
              onClick={toggleExerciseCreateAddon}
            >
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
            <div className="cageOfUserCard cage90 marginAuto flex flex-column">
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
                      <button
                        className="hoverPurple"
                        onClick={() =>
                          toggleExerciseEditAddon(exercise.pk_id_exercise)
                        }
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="128"
                          height="128"
                          viewBox="0 0 24 24"
                        >
                          <path d="M3 21v-4.25L16.2 3.575q.3-.275.663-.425t.762-.15t.775.15t.65.45L20.425 5q.3.275.438.65T21 6.4q0 .4-.137.763t-.438.662L7.25 21zM17.6 7.8L19 6.4L17.6 5l-1.4 1.4z" />
                        </svg>
                      </button>
                      <button
                        className="hoverPurple"
                        onClick={() =>
                          toggleExerciseDeleteAddon(exercise.pk_id_exercise)
                        }
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
