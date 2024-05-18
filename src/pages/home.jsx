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
} from "./../services/userApi";

function Home() {
  const navigate = useNavigate();

  // SAVE DATE
  const [mainRoutine, setMainRoutine] = useState({});
  const [mainRoutineData, setMainRoutineData] = useState({});
  const [mainRoutineSessions, setMainRoutineSessions] = useState([{}]);
  const [routines, setRoutines] = useState([{}]);

  // NEED TO BE LOGED IN TO ACCESS THIS PAGE
  useEffect(() => {
    const cookies = new Cookies();
    const token = cookies.get("token");

    if (!token) {
      navigate("/login");
    } else {
      getMainRoutineByUser(token).then((data) => {
        if (data && !data.error) {
          // console.log("Main Routine: ");
          setMainRoutine(data);

          if (data[0].fk_id_routine) {
            getRoutineById(data[0].fk_id_routine).then((data) => {
              if (data && !data.error) {
                setMainRoutineData(data);
                // console.log("Main Routine Data: ");
                // console.log(data);
              } else {
                console.log("No main routine found");
              }
            });

            getSessionsByRoutineId(data[0].fk_id_routine).then((data) => {
              if (data && !data.error) {
                setMainRoutineSessions(data);
                // console.log("Main Routine Sessions: ");
                // console.log(data);
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

  let routineName = "";
  if (Array.isArray(mainRoutineData) && mainRoutineData.length > 0) {
    routineName = mainRoutineData[0].routine_name;
  }

  // useEffect(() => {
  //   console.log("Main Routine: ");
  //   console.log(mainRoutine);
  //   // console.log(mainRoutine[0].fk_id_routine);
  //   console.log("Main Routine Data: ");
  //   console.log(mainRoutineData);
  //   console.log("Routines: ");
  //   console.log(routines);
  // }, [mainRoutine, routines]);

  const favRoutineNavigation = () => {
    navigate("/routines");
  };

  return (
    <>
      <div className="allCont flex flex-column align-center backgroundGradient position-relative">
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
                    // console.log(session); // Log the session information to the console

                    return (
                      <div
                        key={index}
                        className="sessionCage backgroundWhite border-r5"
                      >
                        <h3>{session.nom_session}</h3>
                        {/* <p className="tagGlobal tagColor2">
          {session. === "semanal"
            ? "Semanal"
            : "Planificada"}
        </p> */}
                        <button>START</button>
                      </div>
                    );
                  })
                ) : (
                  <div className="sessionCage backgroundWhite border-r5" style={{width: "140px", maxWidth: "150px"}}>
                    <h3>No hay sesiones</h3>
                    <button>START</button>
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
