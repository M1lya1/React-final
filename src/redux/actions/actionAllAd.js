import gql from "../GQL"
import { actionPromise} from "./actions";


const actionAllAd = (search) => async (dispatch, getState) => {

    const oldState = getState().promise?.AllAd?.payload || [];
    const skip = oldState.length;


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

        const newAd = await gql(gqlQuery, {query: JSON.stringify([
                        search ? {$or: [{ title: `/${search}/` }, { description: `/${search}/` }] } : {},
                        {sort: [{ _id: 1 }],
                        skip: [skip],
                        limit: [10],
                     }
                    ])
                });
        const action = actionPromise('AllAd', [...oldState, ...newAd])
          dispatch(action)
        
        
}

const actionClearAd = () => (dispatch) => {
	dispatch(actionPromise("AllAd", []));
};
export  {actionAllAd, actionClearAd}

     
