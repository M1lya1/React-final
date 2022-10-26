import gql from "../GQL"
import { actionPromise } from "./actions";



const actionAdById = (_id) => async (dispatch) => {
	const queryPromise = gql(
		`query adOne($query:String!){
            AdFindOne(query:$query){
				_id owner{_id login} images{_id
					url
					originalFileName}
            createdAt 
			title 
			description
            tags
            address
            price
			comments{_id}
		}
	}`,
		{ query: JSON.stringify([{ _id }]) }
	);

	const action =  actionPromise("AdById", queryPromise);
	await dispatch(action);
}
export default actionAdById;
