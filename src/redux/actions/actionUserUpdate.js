import gql from "../GQL"
import { actionPromise } from "./actions";
import { history } from "../../App";




const actionUserUpdate = (user) => async (dispatch) => {
   
    const gqlQuery = `mutation userUpdate($user:UserInput){
        UserUpsert(user: $user){
            _id
            createdAt
            login
            nick
            avatar{url}
                }
                }`
    const gqlPromise = gql(gqlQuery, {user});
    const action = actionPromise('aboutMe', gqlPromise);
     await dispatch(action);
     history.push("/profile");
    
}

export default actionUserUpdate
