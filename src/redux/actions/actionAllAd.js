import gql from "../GQL"
import { actionPromise } from "./actions";

const actionAllAd = () => async (dispatch) => {
    const gqlQuery = `
    query allAd($query:String){
            AdFind(query: $query){
                _id 
                images{url}
                title
                tags
                price
            }
        }`;

        const gqlPromise = await gql(gqlQuery, {query: JSON.stringify([{}])});
        const action = actionPromise('AllAd', gqlPromise)
          dispatch(action)
        
        
}


export default actionAllAd

     
