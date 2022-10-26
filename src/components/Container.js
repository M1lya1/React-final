import React, {useEffect} from 'react'
import {actionAllAd, actionClearAd} from '../redux/actions/actionAllAd'
import Card from './Card'
import { useDispatch, useSelector} from 'react-redux'
import Loading from './Loading'
import { BackTop } from 'antd';





const Container = () => {
  
  const categories = useSelector(state => state.promise?.AllAd?.payload)
  const status = useSelector(state => state.promise?.AllAd?.status)
  const dispatch = useDispatch()

  useEffect(() => {
    window.onscroll = function () {
			if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 150) {
				dispatch(actionAllAd())
			}
		}
    dispatch(actionAllAd())
    return () => {
			window.onscroll = 0;
			dispatch(actionClearAd())
		}
  }, [dispatch])
  
  const style = {
    height: 40,
    width: 40,
    lineHeight: '40px',
    borderRadius: 4,
    backgroundColor: '#1088e9',
    color: '#fff',
    textAlign: 'center',
    fontSize: 14,
  };
  
  return (
    <div className='container'>
      
      {categories ? categories.map((cat => <Card cat={cat} key={cat._id}/>)) : <Loading/>}
      <BackTop>
       <div style={style}>UP</div>
      </BackTop>
    </div>
  )
}

export default Container
