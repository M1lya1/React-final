import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { Carousel } from 'antd';
import { connect, useSelector } from 'react-redux';
import actionAdFindOne from '../redux/actions/actionAdFind'
import AddComment from './AddComment';
import CComment from './Comment';

const contentStyle = {
  height: '500px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};


const Page = ({ props}) => {
    const { _id, owner, images, createdAt, title, description, tags, address, price } = props

    
    const userId = useSelector((state) => state.userInfo?.payload?._id)
    const ownerId = owner._id
    const date = new Date(+createdAt)
  
   
  return (
    <div className='cardPage__container'>
        <Carousel >
            <div>
                <h3 style={contentStyle}>1</h3>
            </div>
            <div>
                <h3 style={contentStyle}>2</h3>
            </div>
            <div>
                <h3 style={contentStyle}>3</h3>
            </div>
            <div>
                <h3 style={contentStyle}>4</h3>
            </div>
        </Carousel>
        <div> 
        {userId === ownerId ?
        <Link to={`/edit/${_id}`}>
            edit card
            </Link>
				 : <p> </p>}
        </div>
        <div className='cardPage__date'>
            <p>date: {date.toLocaleString("ru-RU", {
								year: "numeric",
								month: "long",
								day: "numeric",
							})}</p>
        </div>
        <div className='cardPage__title'>
            <p>title: {title}</p>
        </div>
        <div className='cardPage__description'>
            <p>Description</p>
        </div>
        <div className='cardPage__contacts'>
            <p>contacts</p>
        </div>
        <div>
            <AddComment props={{_id}}/>
        </div>
        <div>
            <CComment _id={_id}/>
        </div>
    </div>
  )
}

const CardPage = ({match: {params: {_id}}, props, onCardId}) => {
    useEffect(() => {
      
        onCardId(_id)
      }, [_id, onCardId])
    return <div>
        {props ? <div><Page props={props}/></div> : <p>Loading</p>}
    </div>  
}

const CCardPage = connect(state => ({props: state?.promise?.AdFindOne?.payload}, {onCardId: actionAdFindOne}))(CardPage)

export default CCardPage
