import { useEffect } from "react"
import Card from "./Card";
import {actionAllAd, actionClearAd} from '../redux/actions/actionAllAd'
import { useDispatch, useSelector } from 'react-redux';
import Loading from "./Loading";
import { useParams } from "react-router-dom";



const SearchPage = ({match: {params: {search}}}) => {
  //  const search = useParams()
  
  const categories = useSelector(state => state?.promise?.AllAd?.payload)
  const status = useSelector(state => state?.promise?.AllAd?.status)
  const dispatch = useDispatch()

  useEffect(() => {
        dispatch(actionAllAd(search));
		return function clear() {
			dispatch(actionClearAd());
		}
    },[search, dispatch])
   

    return <>
    
    <div className='container'>
      {status === "FULFILLED" ? categories.map((cat => <Card cat={cat} key={cat._id}/>)) : <Loading/>}
    </div>
    
    </>
}


export default SearchPage
