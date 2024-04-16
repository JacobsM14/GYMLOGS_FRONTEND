import "./../styles/start.css";

function Start() {
  return (
    <>
      <div className="globalHome">
        <div className="cageContHome">
          <div className="logo">
            <img src="logo.png" alt="gymlogs" />
            <h1>GYMLOGS</h1>
          </div>
          <div className="text">
            <p>
              <span className="backgroundModified">Gymlogs</span> es una web que
              permite a los usuarios regsitrar y hacer un{" "}
              <span>seguimiento de sus progresos en el gimnasio</span>, esta
              enfocada para su uso en mobil, por lo tanto en escritorio el uso
              esta limitado a consultar estadisticas.
            </p>
            <p>
              Registrate gratis y prueba la version limitada o Inicia sesion si
              ya tienes una cuenta.
            </p>
            <div className="buttonsText">
              <button className="button2">
                <a href="">REGISTRARSE</a>
              </button>
              <button className="button3">
                <a href="/login">YA TIENES CUENTA?</a>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Start;
