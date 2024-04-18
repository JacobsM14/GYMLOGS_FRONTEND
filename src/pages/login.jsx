function logIn() {
  return (
    <>
      <div className="allCont backgroundGradient flex justify-center align-center flex-column">
        <div className="cage80 loginOnDeskop" id="contLogin">
          <div className="loginLogo">
            <img src="logo.png" alt="gymlogs" />
            <h1>GYMLOGS</h1>
          </div>
          <div className="loginForm">
            <input type="text" placeholder="Correo Electronico:" />
            <input type="text" placeholder="Contraseña:" />
            <button className="button1">INICIAR SESION</button>
            <a href="">Has olvidado tu contraseña?</a>
            <button className="button2"><a href="/register">REGISTRARSE</a></button>
          </div>
        </div>
      </div>
    </>
  );
}

export default logIn;
