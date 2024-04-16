import "./../styles/login.css";

function Register() {

  return (
    <>
      <div className="global">
        <div className="cageCont">
          <div className="logo">
            <img src="logo.png" alt="gymlogs" />
            <h1>GYMLOGS</h1>
          </div>
          <div className="form">
            <input type="text" placeholder="Usuario:" name="user" id="user"/>
            <input type="text" placeholder="Correo Electronico:" name="email" id="email"/>
            <input type="text" placeholder="Contraseña:" name="passwd" id="passwd"/>
            <input type="text" placeholder="Confirmar Contraseña:" name="confirmpasswd" id="confirmpasswd"/>
            <div className="checkboxForm">
                <input type="checkbox" name="pricacy" id="privacy"/>
                <label id="privacy"><a href="">Acepto las politicad de Privacidad</a></label>
            </div>
            <button className="button2">REGISTRARSE</button>
            <button className="button1"><a href="/login">YA TIENES UNA CUENTA?</a></button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
