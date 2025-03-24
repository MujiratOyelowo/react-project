import { Link } from "react-router-dom"; 
 
function Navigation() { 
  return ( 
    <nav className="main-menu"> 
      <Link to="/">Peaks & Spices</Link> 
      <Link to="/menu">Menu</Link> 
      <Link to="/reservation">Reservation</Link> 
      <Link to="/contact">Contact Us</Link>
      <Link to="/about">About</Link>
    </nav> 
  ); 
}
export default Navigation;