
import { actionPromise } from "./actions"
import gql from "../GQL"


const actionUser = (_id) => async (dispatch) => {

    const gqlQuery = 
        `query userFindOne($query:String!){
            UserFindOne(query:$query){
                _id createdAt login nick avatar{url} 
            }   
        }`

        const gqlPromise =  await gql(gqlQuery, {query: JSON.stringify([{_id}])});
        const action = actionPromise('aboutMe', gqlPromise)
        const result = await dispatch(action)
        console.log(result);

        
}




export default actionUser
