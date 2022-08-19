import React, {useEffect} from 'react'
import actionAllAd from '../redux/actions/actionAllAd'
import store from '../redux/store/store'
import Card from './Card'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'



const Container = ({categories, status, onIdChange}) => {
  useEffect(() => {
    onIdChange()
  }, [])
  
  return (
    <div className='container'>
      {status === "FULFILLED" ? categories.map((cat => <Card cat={cat} key={cat._id}/>)) : <p>error</p>}
    </div>
  )
}
const CContainer = connect(state => ({categories: state?.promise?.AllAd?.payload, status: state?.promise?.AllAd?.status}),{onIdChange: actionAllAd})(Container)
export default CContainer
