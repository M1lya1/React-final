import Logo from "./Logo";
import {  useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SearchElement from "./SearchElement";



const Header = () => {

  const user = useSelector(state => state.auth?.payload?.sub)
  
    return( 
    <div className="header">
      <Link to='/'><Logo/></Link>
      <SearchElement/>
      <div className="header__container">
        
        <Link to="/createCard"><button className="header__button">Create card</button></Link>
        <Link to='/profile'  ><button className="header__button">profile</button></Link>
        
      </div>
    </div>
  )}

  
  
  export default Header;
