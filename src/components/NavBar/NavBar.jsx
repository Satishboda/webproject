import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import "./navbar.css";
import { Menu, Wrong } from "../Elements";
import { UserContext } from "../../Auth";

const Options = ()=>{
  const { state } = useContext(UserContext);
  if(state.user){
    return (
      <ul className="desktopMenu">
      <li> <NavLink to="/">Home</NavLink>  </li>
      <li> <NavLink to="/staff">Employee</NavLink> </li>
      <li> <NavLink to="/dashboard">Dashboard</NavLink> </li>
      <li> <NavLink to="/logout">Logout</NavLink> </li>
    </ul>
    )
  }
  return (
    <ul className="desktopMenu">
    <li> <NavLink to="/">Home</NavLink>  </li>
    <li> <NavLink to="/staff">Employee</NavLink> </li>
    <li> <NavLink to="/login">Login</NavLink> </li>
  </ul>
  )
}
const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const updateMenu = () => {
    if (menuOpen) {
      setMenuOpen(false);
      return;
    }
    setMenuOpen(true);
  };
  const { state } = useContext(UserContext);
  return (
    <nav className="navbar jsb pd-5">
      <div className="title pd-5">Employee</div>

      <div className="items pd-5">
        <Options/>
        {menuOpen ? (
          <Wrong onClick={updateMenu} />
        ) : (
          <Menu onClick={updateMenu} />
        )}
        <ul className={menuOpen ? "mobileMenu" : "hide"}>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/staff">Employee</NavLink>
          </li>
          <li>
            {
              state.user?
              <NavLink to="/dashboard">Dashboard</NavLink>:
              <NavLink to="/login">Login</NavLink>
            }
          </li>
        </ul>
      </div>
    </nav>
  );
};
export default NavBar;
