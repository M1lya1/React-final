import Logo from "./Logo";
import { actionAuthLogout } from "../redux/actions/actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import SearchElement from "./SearchElement";



const Header = ({user, onLogout}) => {
  
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

  
  const CHeader = connect(state => ({user: state.auth?.payload?.sub}),{onLogout: actionAuthLogout})(Header)

  export default CHeader;
