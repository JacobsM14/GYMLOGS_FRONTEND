import { useState } from "react";
import "./../styles/login.css";

function logIn() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <div className="global">
        <div className="logo">
          <img src="logo.png" alt="logo" />
          <h1>GYMLOGS</h1>
        </div>
        <div className="form">
          <input type="text" placeholder="Correo Electronico:"/>
          <input type="text" placeholder="Contraseña:"/>
          <button className="button1">INICIAR SESSION</button>
          <a href="">Has olvidado tu contraseña?</a>
          <button className="button2">REGISTRAR-SE</button>
        </div>
      </div>
    </>
  );
}

export default logIn;
