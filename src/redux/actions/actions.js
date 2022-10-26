import gql from "../GQL"
import actionUser from "./actionUser"
import { history } from "../../App"

const actionPending   = name            => ({type: 'PROMISE', status: 'PENDING', name})
const actionFulfilled = (name, payload) => ({type: 'PROMISE', status: 'FULFILLED', name, payload})
const actionRejected  = (name, error)   => ({type: 'PROMISE', status: 'REJECTED', name, error})

const actionPromise = (name, promise) =>
    async dispatch => {
        dispatch(actionPending(name))
        try{
            let payload = await promise
            dispatch(actionFulfilled(name, payload))
            return payload
        }
        catch(err){
            dispatch(actionRejected(name, err))
        }
    }


    const actionAuthLogin = (token) => 
    (dispatch, getState) => {
        const oldState = getState().auth
        dispatch({type: 'AUTH_LOGIN', token})
        const newState = getState().auth
        console.log(newState);
        if (newState !== oldState){
            localStorage.authToken = token
            const id = getState().auth?.payload?.sub?.id;
	    dispatch(actionUser(id))
        }      
         
    }

const actionAuthLogout = () => 
    (dispatch) => {        
        
        dispatch({type: 'AUTH_LOGOUT'})
        localStorage.removeItem('authToken')
        history.push("/login");
       
    }

const actionFullLogin = (login, password) =>
    async (dispatch) => {
        const gqlQuery = `query log($login:String!, $password:String!){
            login(login:$login, password:$password)
        }`
        
        const gqlPromise = gql(gqlQuery, {login, password})
        const action     = actionPromise('login', gqlPromise) 
        const result     = await dispatch(action) 
        console.log(result);
        dispatch(actionAuthLogin(result))
        if (result) {
            history.push("/main");
            
        }
        
    }

const actionFullReg = (login, password) => 
    async (dispatch) => {
        const gqlQuery = `mutation register($login:String!, $password:String!){
            createUser(login:$login, password:$password){
                _id
            }
        }`
        const gqlPromise = gql(gqlQuery, {login, password})
        const action     = actionPromise('register', gqlPromise) 
        const result     = await dispatch(action)
        
        if (result) await dispatch(actionFullLogin(login, password))
      
}

    export {actionFullLogin, actionAuthLogout, actionPromise, actionFullReg, actionFulfilled}
