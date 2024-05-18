import Nav from "./../components/navComponent/navComponent";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function userPremium() {
  const navigate = useNavigate();
  const [tokenAccess, setTokenAccess] = useState(false);
  // NEED TO BE LOGED IN TO ACCESS THIS PAGE
  useEffect(() => {
    const cookies = new Cookies();
    const token = cookies.get("token");

    if (token) {
      setTokenAccess(true);
    } else {
      navigate("/login");
    }
  }, []);

  const goBack = () => {
    navigate("/user");
  };

  return (
    <>
      <div
        id="premiumAccount"
        className="allCont flex flex-column align-center backgroundBlack position-relative"
      >
        <div className=" cage90 marginAuto flex flex-column">
          <div className="textPremiumAccount flex justify-between align-center">
            <h1>Cuenta Premium</h1>
            <button onClick={goBack}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="128"
                height="128"
                viewBox="0 0 24 24"
              >
                <path d="M19 7v4H5.83l3.58-3.59L8 6l-6 6l6 6l1.41-1.41L5.83 13H21V7z" />
              </svg>
            </button>
          </div>
          <p>
            ¡Gracias por tu interés en la cuenta premium de Gymlogs!
            Actualmente, <span>nuestra web está en fase beta</span>, y el
            servicio de <span>cuenta premium aún no está habilitado</span>.
          </p>
          <p>
            Estamos trabajando arduamente para ofrecerte las mejores
            funcionalidades adicionales. Una vez que la cuenta premium esté
            disponible, tendrá un costo de 2€ al mes.
          </p>
          <p>
            ¡Mantente atento a nuestras actualizaciones y gracias por tu
            paciencia y apoyo mientras mejoramos <span>Gymlogs</span> para ti!
          </p>
        </div>

        <Nav webPage="user" />
      </div>
    </>
  );
}

export default userPremium;
