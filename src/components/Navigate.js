import { Navigate, Redirect, Route, Routes, Switch,  } from "react-router-dom";
import Profile from "./Profile";
import Container from "./Container";
import CardPage from "./CardPage";
import LoginForm from "./LoginForm";
import RegistrationForm from "./Registration";
import {EditCard, CreateCard} from './CreateCard'
import ProfileEdit from "./ProfileEdit";
import SearchPage from "./SeachPage";



const AuthElement = () => (<Switch>
          <Route exact path='/profile' component={Profile}/>
          <Route  exact path='/main' component={Container}/>
          <Route path='/createCard' component={CreateCard}/>
          <Route  exact path="/editCard/:_id" component={EditCard}/>
		  <Route path="/search/:search" component={SearchPage}/>
          <Route path="/main/:_id" component={CardPage}/>
          <Route path="/profile/edit" component={ProfileEdit}/>
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
    <Route path='/login' component={LoginForm}/>
    <Route path='/Registration' component={RegistrationForm}/>
    <PrivateRoute  path='/' component={AuthElement}/>
</Switch>


export default Content
