import { useEffect } from "react"
import Card from "./Card";
import {actionAllAd, actionClearAd} from '../redux/actions/actionAllAd'
import {connect} from 'react-redux'



const SearchPage = ({match: {params: {search}}, onSearch, removeAd, categories, status}) => {
    useEffect(() => {
        onSearch(search);
		return function clear() {
			removeAd();
		}
    },[search])
    useEffect(() => {
		window.onscroll = function () {
			if (window.innerHeight + window.scrollY >= document.body.scrollHeight) {
				onSearch(search);
			}
		};

		return () => {
			window.onscroll = 0;
			removeAd();
		};
	}, []);

    return <>
    
    <div className='container'>
      {status === "FULFILLED" ? categories.map((cat => <Card cat={cat} key={cat._id}/>)) : <p>loading</p>}
    </div>
    
    </>
}

const CSearchPage = connect(state => ({categories: state?.promise?.AllAd?.payload, status: state?.promise?.AllAd?.status}),
            {onSearch: actionAllAd,
            removeAd: actionClearAd}
            )(SearchPage)

export default CSearchPage
