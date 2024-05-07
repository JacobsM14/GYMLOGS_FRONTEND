import Nav from "./../components/navComponent/navComponent";

function Home() {
  return (
    <>
      <div className="allCont flex flex-column align-center backgroundGradient position-relative">
        <div className="cage90 marginTop-20" id="home">
          <div
            className="rutines border-r5 backgroundBlack"
            id="favoriteRoutine"
          >
            {/* <h2>CREAR UNA RUTINA PARA COMENZAR</h2> */}
            <h3>Rutina Habitual</h3>
          </div>
          <div
            className="rutines border-r5 backgroundBlack flex justify-center align-center"
            id="allRoutines"
          >
            {/* <h2>CREA MAS DE UNA RUTINA</h2> */}
          </div>
        </div>
        <Nav />
      </div>
    </>
  );
}

export default Home;
