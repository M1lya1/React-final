import Logo from "./Logo";
import { actionAuthLogout } from "../redux/actions/actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";


const Header = ({onLogout}) => {
    return( 
    <div className="header">
      <Link to='/'><Logo/></Link>
      <div className="header__container">
        <input type='search'/>
        <Link to='/profile/:_id'  className="header__img"/>
        <button onClick={() => onLogout()}>Log out</button>
      </div>
    </div>
  )}

  
  const CHeader = connect(null,{onLogout: actionAuthLogout})(Header)

  export default CHeader;
