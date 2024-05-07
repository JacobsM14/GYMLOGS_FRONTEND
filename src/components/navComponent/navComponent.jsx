import "./../../styles/componentStyles/navComponent.css";


function NavComponent() {
  return (
    <>
      <nav>
        <a href="">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="128"
            height="128"
            viewBox="0 0 512 512"
          >
            <path d="M417.4 224H288V94.6c0-16.9-14.3-30.6-32-30.6s-32 13.7-32 30.6V224H94.6C77.7 224 64 238.3 64 256s13.7 32 30.6 32H224v129.4c0 16.9 14.3 30.6 32 30.6s32-13.7 32-30.6V288h129.4c16.9 0 30.6-14.3 30.6-32s-13.7-32-30.6-32z" />
          </svg>
          {/* <p>Rutinas</p> */}
        </a>
        <a href="">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="128"
            height="128"
            viewBox="0 0 25 20"
          >
            <path d="M1 4c0-1.1.9-2 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2zm2 2v12h14V6zm2-6h2v2H5zm8 0h2v2h-2zM5 9h2v2H5zm0 4h2v2H5zm4-4h2v2H9zm0 4h2v2H9zm4-4h2v2h-2zm0 4h2v2h-2z" />
          </svg>
          {/* <p>Calendar</p> */}
        </a>
        <a href="/home">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="128"
            height="128"
            viewBox="0 0 24 24"
          >
            <path d="M4 19v-9q0-.475.213-.9t.587-.7l6-4.5q.525-.4 1.2-.4t1.2.4l6 4.5q.375.275.588.7T20 10v9q0 .825-.588 1.413T18 21h-3q-.425 0-.712-.288T14 20v-5q0-.425-.288-.712T13 14h-2q-.425 0-.712.288T10 15v5q0 .425-.288.713T9 21H6q-.825 0-1.412-.587T4 19" />
          </svg>
          {/* <p>Inicio</p> */}
        </a>
        <a href="/user">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="128"
            height="128"
            viewBox="0 0 256 256"
          >
            <path
              d="M230.93 220a8 8 0 0 1-6.93 4H32a8 8 0 0 1-6.92-12c15.23-26.33 38.7-45.21 66.09-54.16a72 72 0 1 1 73.66 0c27.39 8.95 50.86 27.83 66.09 54.16a8 8 0 0 1 .01 8"
            />
          </svg>
          {/* <p>Mi Cuenta</p> */}
        </a>
      </nav>
    </>
  );
}

export default NavComponent;
