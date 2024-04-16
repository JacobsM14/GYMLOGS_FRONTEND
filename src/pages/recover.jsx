import "./../styles/login.css";

function Recover() {

  return (
    <>
      <div className="global">
        <div className="cageCont">
          <div className="logo">
            <img src="logo.png" alt="gymlogs" />
            <h1>GYMLOGS</h1>
          </div>
          <div className="form">
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
