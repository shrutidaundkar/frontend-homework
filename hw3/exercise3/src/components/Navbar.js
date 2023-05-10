import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <ul>
        <h1>House of Dragons</h1>
        <NavLink to="/home">Home</NavLink>
        <NavLink to="/search">Search</NavLink>
        <NavLink to="/houses">Houses</NavLink>
      </ul>
    </nav>
  );
}

export default Navbar;
