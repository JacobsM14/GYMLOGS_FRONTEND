import Nav from "./../components/navComponent/navComponent";
import './../styles/user.css';

function User() {
  return (
    <>
      <div id="userPage" className="allCont flex flex-column align-center backgroundBlack position-relative">
        <div className="showUser">

        </div>
        <Nav />
      </div>
    </>
  );
}

export default User;