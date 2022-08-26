import { Navigate, Redirect, Route, Routes, Switch } from "react-router-dom";
import CProfile from "./Profile";
import CContainer from "./Container";
import CCardPage from "./CardPage";
import CLoginForm from "./LoginForm";
import CRegistrationForm from "./Registration";
import {CEditCard, CCreateCard} from './CreateCard'
import CProfileEdit from "./ProfileEdit";
import CSearchPage from "./SeachPage";


const AuthElement = () => (<Switch>
          <Route exact path='/profile' component={CProfile}/>
          <Route exact path='/main' component={CContainer}/>
          <Route path='/createCard' component={CCreateCard}/>
          <Route exact path="/editCard/:_id" component={CEditCard}/>
		  <Route path="/search/:search" component={CSearchPage}/>
          <Route path="/main/:_id" component={CCardPage}/>
          <Route path="/profile/edit" component={CProfileEdit}/>
		  <Redirect from='/' to='/main'/>
</Switch>)

const PrivateRoute = ({ component: Element, ...rest }) => {
	const isUser = !!localStorage.authToken;
	return (
		
		<Route
			{...rest}
			render={({props}) =>
				isUser ? (
					<Element  {...props}/>
				) : (
					<Redirect
						to={{
							pathname: "/login",
							
						}}/>
				)
			}
		/>
		
	);
};

const Content = () => <Switch>
    <Route path='/login' component={CLoginForm}/>
    <Route path='/Registration' component={CRegistrationForm}/>
    <PrivateRoute  path='/' component={AuthElement}/>
</Switch>

export default Content
