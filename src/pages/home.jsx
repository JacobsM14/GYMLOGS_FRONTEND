import Nav from "./../components/navComponent/navComponent";
import "./../styles/home.css";

function Home() {
  return (
    <>
      <div className="allCont flex flex-column align-center backgroundGradient position-relative">
        <div className="cage90 marginTop-20" id="home">
          <div
            className="routinesShow border-r5 backgroundBlack"
            id="favoriteRoutine"
          >
            <h2>CREAR UNA RUTINA PARA COMENZAR</h2>
          </div>
          <div
            className="routinesShow border-r5 backgroundBlack flex justify-center align-center"
            id="allRoutines"
          >
            <h2>CREA MAS DE UNA RUTINA</h2>
          </div>
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
