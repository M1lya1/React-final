import React, {useEffect} from 'react'
import {actionAllAd, actionClearAd} from '../redux/actions/actionAllAd'
import store from '../redux/store/store'
import Card from './Card'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'



const Container = ({categories, status, onIdChange, removeAd}) => {
  
  useEffect(() => {
		window.onscroll = function () {
			if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 150) {
				onIdChange();
			}
		};
		onIdChange();

		return () => {
			window.onscroll = 0;
			removeAd();
		};
	}, []);

  
  return (
    <div className='container'>
      {status === "FULFILLED" ? categories.map((cat => <Card cat={cat} key={cat._id}/>)) : <p>loading</p>}
    </div>
  )
}
const CContainer = connect(state => ({categories: state?.promise?.AllAd?.payload, status: state?.promise?.AllAd?.status}),
        {onIdChange: actionAllAd, removeAd: actionClearAd})(Container)
export default CContainer
