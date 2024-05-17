import Nav from "./../components/navComponent/navComponent";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function privacyPolitics() {
  const navigate = useNavigate();
  const [tokenAccess, setTokenAccess] = useState(false);
  // NEED TO BE LOGED IN TO ACCESS THIS PAGE
  useEffect(() => {
    const cookies = new Cookies();
    const token = cookies.get("token");

    if (token) {
      setTokenAccess(true);
    }
  }, []);

  const goBack = () => {
    if (tokenAccess) {
      navigate("/user");
    } else {
      navigate("/register");
    }
  };

  const closeSession = () => {
    const cookies = new Cookies();
    cookies.remove("token");
    window.location.href = "/";
  };

  return (
    <>
      <div
        id="privacyPolitics"
        className="allCont flex flex-column align-center backgroundBlack position-relative"
      >
        <div className=" cage90 marginAuto flex flex-column">
          <div className="textPrivacyPolitics flex justify-between align-center">
            <h1>Politicas de Privacidad</h1>
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
          <h2>Fecha de Vigencia: 17/05/2024</h2>
          <p>
            En Gymlogs, valoramos tu privacidad y estamos comprometidos con la
            protección de tus datos personales. Esta Política de Privacidad
            describe cómo recopilamos, utilizamos y protegemos tu información
            cuando visitas y utilizas nuestro sitio web y servicios.
          </p>
          <h3>1. Información que Recopilamos</h3>
          <p>Recopilamos los siguientes tipos de información:</p>
          <p>
            <span>Información de Registro: </span>Cuando te registras en
            Gymlogs, recopilamos tu nombre, dirección de correo electrónico y
            cualquier otra información que decidas proporcionarnos.
          </p>
          <p>
            <span>Información de Uso: </span>Registramos información sobre tu
            actividad en el sitio, como las rutinas de gimnasio que creas y los
            ejercicios que realizas.
          </p>
          <p>
            <span>Información Técnica: </span>Recopilamos información sobre tu
            dispositivo y navegador, incluyendo tu dirección IP, tipo de
            navegador, y páginas que visitas en nuestro sitio.
          </p>
          <h3>2. Cómo Utilizamos Tu Información</h3>
          <p>Utilizamos tu información para:</p>
          <ul>
            <li>
              Proporcionar y gestionar tu cuenta y las funcionalidades del
              sitio.
            </li>
            <li>Personalizar tu experiencia y mejorar nuestro servicio.</li>
            <li>
              Comunicarnos contigo para enviarte actualizaciones, alertas y
              otros mensajes relacionados con el servicio.
            </li>
            <li>Analizar el uso del sitio para mejorar nuestros servicios.</li>
          </ul>
          <h3>3. Compartir Tu Información</h3>
          <p>
            No compartimos tu información personal con terceros, excepto en las
            siguientes circunstancias:
          </p>
          <ul>
            <li>Con tu consentimiento explícito.</li>
            <li>
              Con proveedores de servicios que nos ayudan a operar y mejorar
              nuestro sitio, quienes están sujetos a estrictas obligaciones de
              confidencialidad.
            </li>
            <li>
              Cuando sea requerido por ley o para proteger nuestros derechos
              legales.
            </li>
          </ul>
          <h3>4. Seguridad de los Datos</h3>
          <p>
            Implementamos medidas de seguridad razonables para proteger tu
            información personal contra accesos no autorizados, alteraciones,
            divulgaciones o destrucción. Sin embargo, ningún sistema de
            seguridad es completamente impenetrable, por lo que no podemos
            garantizar la seguridad absoluta de tu información.
          </p>
          <h3>5. Tus Derechos</h3>
          <p>Tienes derecho a:</p>
          <ul>
            <li>Acceder a los datos personales que tenemos sobre ti.</li>
            <li>Solicitar la corrección de datos inexactos o incompletos.</li>
            <li>Solicitar la eliminación de tus datos personales.</li>
            <li>
              Oponerte al procesamiento de tus datos personales en ciertas
              circunstancias.
            </li>
            <li>
              Retirar tu consentimiento en cualquier momento, sin afectar la
              legalidad del procesamiento basado en el consentimiento antes de
              su retiro.
            </li>
          </ul>
          <h3>6. Retención de Datos</h3>
          <p>
            Retenemos tus datos personales solo durante el tiempo necesario para
            cumplir con los propósitos descritos en esta política, a menos que
            un período de retención más largo sea requerido o permitido por la
            ley.
          </p>
          <h3>7. Cambios a Esta Política</h3>
          <p>
            Podemos actualizar esta Política de Privacidad de vez en cuando. Te
            notificaremos sobre cualquier cambio publicando la nueva política en
            nuestro sitio web y, si los cambios son significativos, te
            enviaremos una notificación directa a través de tu correo
            electrónico registrado.
          </p>
          <h3>8. Contacto</h3>
          <p>
            Si tienes preguntas o inquietudes sobre esta Política de Privacidad,
            por favor, contáctanos a:
          </p>
          <h3>Gymlogs</h3>
          <p>Correo electrónico: admin@gymlogs.com</p>
        </div>

        {tokenAccess ? <Nav webPage="user" /> : null}
      </div>
    </>
  );
}

export default privacyPolitics;
