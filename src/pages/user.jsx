import Nav from "./../components/navComponent/navComponent";
import "./../styles/user.css";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function User() {
  const navigate = useNavigate();
  
  // NEED TO BE LOGED IN TO ACCESS THIS PAGE
  useEffect(() => {
    const cookies = new Cookies();
    const token = cookies.get("token");

    if (!token) {
      useNavigate("/login");
    }
  }, []);

  const closeSession = () => {
    const cookies = new Cookies();
    cookies.remove("token");
    window.location.href = "/";
  };

  return (
    <>
      <div
        id="userPage"
        className="allCont flex flex-column align-center backgroundBlack position-relative"
      >
        <div className="showUser cage100">
          <div className="backgroundGradient cage100">
            <img src="user.png" alt="user" />
          </div>
          <h1>USER EXAMPLE</h1>
        </div>
        <div id="contPrivacity" className="cage90">
          <h2>Cuenta y Privacidad</h2>
          <div className="cage100 backgroundBlack2 cagePrivacity">
            <div className="cage90 flex align-center marginAuto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="128"
                height="128"
                viewBox="0 0 24 24"
              >
                <path d="M11 17h2v-6h-2zm1-8q.425 0 .713-.288T13 8t-.288-.712T12 7t-.712.288T11 8t.288.713T12 9m0 13q-3.475-.875-5.738-3.988T4 11.1V5l8-3l8 3v6.1q0 3.8-2.262 6.913T12 22" />
              </svg>
              <h3>Políticas de privacidad</h3>
            </div>
          </div>
          <div className="cage100 backgroundBlack2 cagePrivacity">
            <div className="cage90 flex align-center marginAuto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="128"
                height="128"
                viewBox="0 0 24 24"
              >
                <g fill="none">
                  <path
                    fill="currentColor"
                    d="M12 13c2.396 0 4.575.694 6.178 1.672c.8.488 1.484 1.064 1.978 1.69c.486.615.844 1.351.844 2.138c0 .845-.411 1.511-1.003 1.986c-.56.45-1.299.748-2.084.956c-1.578.417-3.684.558-5.913.558s-4.335-.14-5.913-.558c-.785-.208-1.524-.506-2.084-.956C3.41 20.01 3 19.345 3 18.5c0-.787.358-1.523.844-2.139c.494-.625 1.177-1.2 1.978-1.69C7.425 13.695 9.605 13 12 13m0-11a5 5 0 1 1 0 10a5 5 0 0 1 0-10"
                  />
                </g>
              </svg>
              <h3>Configuración de cuenta</h3>
            </div>
          </div>
          <div className="cage100 backgroundBlack2 cagePrivacity">
            <div className="cage90 flex align-center marginAuto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="128"
                height="128"
                viewBox="0 0 16 16"
              >
                <path
                  fill="currentColor"
                  d="M3.75 2a.75.75 0 0 0-.662.397l-2 3.75a.75.75 0 0 0 .071.815l4.934 6.316A3.3 3.3 0 0 1 6 12.5a2.5 2.5 0 0 1 1.451-2.27L6.598 7.5h.943A3 3 0 0 1 8.264 6H6.398l.625-2.5h1.954l.427 1.707a3 3 0 0 1 1.5-.18l-.38-1.527H11.8L13.133 6h-.397a2.99 2.99 0 0 1 .649 2.825l1.456-1.863a.75.75 0 0 0 .07-.815l-2-3.75A.75.75 0 0 0 12.25 2zm-.883 4L4.2 3.5h1.277L4.852 6zm.616 1.5h1.544l1.029 3.293zM12.5 8a2 2 0 1 1-4 0a2 2 0 0 1 4 0m1.5 4.5c0 1.245-1 2.5-3.5 2.5S7 13.75 7 12.5A1.5 1.5 0 0 1 8.5 11h4a1.5 1.5 0 0 1 1.5 1.5"
                />
              </svg>
              <h3>Conseguir Prémium</h3>
            </div>
          </div>
          <div
            className="cage100 backgroundBlack2 cagePrivacity"
            onClick={closeSession}
          >
            <div className="cage90 flex align-center marginAuto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="128"
                height="128"
                viewBox="0 0 24 24"
              >
                <path d="M3.5 9.568v4.864c0 2.294 0 3.44.722 4.153c.655.647 1.674.706 3.596.712c-.101-.675-.122-1.48-.128-2.428a.734.734 0 0 1 .735-.734a.735.735 0 0 1 .744.726c.006 1.064.033 1.818.14 2.39c.103.552.267.87.507 1.108c.273.27.656.445 1.38.54c.744.1 1.73.101 3.145.101h.985c1.415 0 2.401-.002 3.146-.1c.723-.096 1.106-.272 1.378-.541c.273-.27.451-.648.548-1.362c.1-.734.102-1.709.102-3.105V8.108c0-1.397-.002-2.37-.102-3.105c-.097-.714-.275-1.093-.547-1.362c-.273-.27-.656-.445-1.38-.54C17.728 3 16.742 3 15.327 3h-.985c-1.415 0-2.401.002-3.146.1c-.723.096-1.106.272-1.379.541c-.24.237-.404.556-.507 1.108c-.107.572-.134 1.326-.14 2.39a.735.735 0 0 1-.744.726a.734.734 0 0 1-.735-.734c.006-.948.027-1.753.128-2.428c-1.922.006-2.94.065-3.596.712c-.722.713-.722 1.86-.722 4.153m2.434 2.948a.723.723 0 0 1 0-1.032l1.97-1.946a.746.746 0 0 1 1.046 0a.723.723 0 0 1 0 1.032l-.71.7h7.086c.408 0 .74.327.74.73c0 .403-.332.73-.74.73H8.24l.71.7a.723.723 0 0 1 0 1.032a.746.746 0 0 1-1.046 0z" />
              </svg>
              <h3>Cerrar sesión</h3>
            </div>
          </div>

          {/* <h2>Otros</h2>
          <div className="cage100 backgroundBlack2 cagePrivacity">
            <div className="cage90 flex align-center marginAuto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="128"
                height="128"
                viewBox="0 0 20 20"
              >
                <g fill="currentColor">
                  <path d="M1.25 10a8.75 8.75 0 1 0 17.5 0a8.75 8.75 0 0 0-17.5 0m16 0a7.25 7.25 0 1 1-14.5 0a7.25 7.25 0 0 1 14.5 0" />
                  <path d="M6.25 10c0 4.522 1.491 8.25 3.75 8.25s3.75-3.728 3.75-8.25S12.259 1.75 10 1.75S6.25 5.478 6.25 10m6 0c0 3.762-1.195 6.75-2.25 6.75S7.75 13.762 7.75 10S8.945 3.25 10 3.25s2.25 2.988 2.25 6.75" />
                  <path d="m3.602 5.467l1.006-1.112c.1.09.209.18.325.267c1.271.952 3.3 1.54 5.515 1.54c1.891 0 3.653-.427 4.931-1.158c.308-.176.582-.367.819-.57l.974 1.141a6.73 6.73 0 0 1-1.048.73c-1.516.868-3.534 1.356-5.676 1.356c-2.522 0-4.865-.678-6.415-1.839a6.063 6.063 0 0 1-.431-.355m0 9.082l1.006 1.112c.1-.091.209-.18.325-.267c1.271-.952 3.3-1.54 5.515-1.54c1.891 0 3.653.427 4.931 1.158c.308.176.582.367.819.57l.974-1.141a6.841 6.841 0 0 0-1.048-.73c-1.516-.868-3.534-1.356-5.676-1.356c-2.522 0-4.865.678-6.415 1.839a6.06 6.06 0 0 0-.431.355M1.75 10.75v-1.5h16.5v1.5z" />
                </g>
              </svg>
              <h3>Conseguir Prémium</h3>
            </div>
          </div> */}
        </div>
        <Nav webPage="user" />
      </div>
    </>
  );
}

export default User;
