import { useNavigate } from "react-router-dom";

function Start() {
  const navigate = useNavigate();

  const goRegisterPage = () => {
    navigate("/register");
  };

  const goLoginPage = () => {
    navigate("/login");
  };

  return (
    <>
      <div
        className="allCont flex justify-center align-center flex-column backgroundBlack"
        style={{ paddingBottom: "0px" }}
      >
        <div
          className="cage90 flex justify-center align-center flex-column"
          id="start"
        >
          <div className="startLogo">
            <img src="logo.png" alt="gymlogs" />
            <h1>GYMLOGS</h1>
          </div>
          <div className="startText">
            <p>
              <span className="backgroundModified">Gymlogs</span> es una web que
              permite a los usuarios registrar y hacer un
              <span> seguimiento de sus progresos en el gimnasio</span>, está
              enfocada para su uso en móvil, por lo tanto, en escritorio el uso
              está limitado a consultar estadísticas.
            </p>
            <p>
              Regístrate gratis y prueba la versión limitada o Inicia sesion si
              ya tienes una cuenta.
            </p>
            <div className="buttonsText">
              <button className="button2" onClick={goRegisterPage}>
                REGISTRARSE
              </button>
              <button className="button3" onClick={goLoginPage}>
                YA TIENES CUENTA?
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Start;
