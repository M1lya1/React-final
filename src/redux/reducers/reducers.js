function jwtDecode(token){
    try{
        return JSON.parse(atob(token.split('.')[1]))
    }
    catch (e) {

    }
}


function promiseReducer(state, {type, status, name, payload, error}){ 
    if (state === undefined){
        return {}
    }
    if (type === 'PROMISE'){
        return {
            ...state,
            [name]: {status, payload ,error}
        }
    }
    return state 
}

function authReducer(state={}, {type, token}){
    if (type === 'AUTH_LOGIN'){
        const payload = jwtDecode(token)
        if (payload)
            return {token, payload}
    }
    if (type === 'AUTH_LOGOUT'){
        return {}
    }
    return state
}
export {promiseReducer, authReducer}
