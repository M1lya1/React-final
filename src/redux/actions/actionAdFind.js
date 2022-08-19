import gql from "../GQL"
import { actionPromise } from "./actions";



const actionAdFindOne = ({_id}) => async (dispatch) => {
    const queryPromise = gql(
    `query AdOne($query:String!){
        AdFindOne(query: $query){
            _id 
            owner{_id login} 
            images{_id url originalFileName}
            createdAt
            title
            description
            tags 
            address
            price
            comments{
                _id owner{_id login nick} createdAt text ad {_id title} answerTo{_id}
            }
            }
        }
    }`, {query: JSON.stringify([{_id}])}
    );
    const action = actionPromise('AdFindOne', queryPromise)
    await dispatch(action);
} 

export default actionAdFindOne;
