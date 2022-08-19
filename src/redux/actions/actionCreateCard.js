import {actionPromise, actionFulfilled} from './actions'
import gql from '../GQL';
import { history } from '../../App';


const actionCreateCard = (Ad) => async (dispatch) => {
	const gqlQuery = `mutation addCom($Ad:AdInput){
	        		AdUpsert(ad: $Ad){_id}
					}`;
	const gqlPromise = gql(gqlQuery, { Ad });
	const action = actionPromise("createAd", gqlPromise);
	const result = await dispatch(action);
	if (result) {
		history.push(`/main/${result._id}`);
		dispatch(actionFulfilled("Upload", []));
	}
};

export default actionCreateCard
