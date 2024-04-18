function Recover() {

  return (
    <>
      <div className="allCont flex justify-center align-center flex-column backgroundGradient">
        <div className="cage80 loginOnDeskop">
          <div className="loginLogo">
            <img src="logo.png" alt="gymlogs" />
            <h1>GYMLOGS</h1>
          </div>
          <div className="loginForm">
            <input type="text" placeholder="Correo Electronico:" />
            <button className="button2"><a href="/register">RECUPERAR CONTRASEÑA</a></button>
            <button className="button1"><a href="/login">INICIAR SESION</a></button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Recover;
