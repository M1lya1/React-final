import { Navigate, Redirect, Route, Routes, Switch } from "react-router-dom";
import CProfile from "./Profile";
import CContainer from "./Container";
import CCardPage from "./CardPage";
import CLoginForm from "./LoginForm";
import CRegistrationForm from "./Registration";
import {CEditCard, CCreateCard} from './CreateCard'
import CProfileEdit from "./ProfileEdit";


const AuthElement = () => (<Switch>
          <Route path='/profile' component={CProfile}/>
          <Route path='/profile/:_id' component={CProfileEdit}/>
          <Route path='/createCard' component={CCreateCard}/>
          <Route path='/editCard/:id' component={CEditCard}/>
          <Route path='/main' component={CContainer}/>
          <Route path='/main/:_id' component={CCardPage}/>
		  <Redirect from='/' to='/main'/>
</Switch>)

const PrivateRoute = ({ element: Element, ...rest }) => {
	const isUser = !!localStorage.authToken;
	return (
		
		<Route
			{...rest}
			render={({props}) =>
				isUser ? (
					<Element  />
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
    <PrivateRoute element={AuthElement} path='/'/>
</Switch>

export default Content
