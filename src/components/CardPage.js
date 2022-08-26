import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { Carousel } from 'antd';
import { connect, useSelector } from 'react-redux';
import actionAdById from '../redux/actions/actionAdFind'
import AddComment from './AddComment';
import CComment from './Comment';
import {Card, Stack} from "@mui/material";

const contentStyle = {
  height: '400px',
  width: '100%',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};


const Page = ({ props: { _id, owner, images, createdAt, title, description, tags, address, price }}) => {
    
    
    const userId = useSelector((state) => state.promise?.aboutMe?.payload?._id)
    const ownerId = owner._id
    const date = new Date(+createdAt)
  
   
  return (<div className='card__page'>
    <div className='card__page-container'>
        {images ? (
        <Carousel >
           {images.map(image =>  <div>
                <img src={`http://marketplace.node.ed.asmer.org.ua/${image.url}`} key={image._id} style={contentStyle}/>
            </div>) 
}
            
        </Carousel>
        
) : <p>[]</p>}
       
        <div> 
        {userId === ownerId ?
        <Link to={`/editCard/${_id}`}>
            <button className='edit__card'>edit card</button>
            </Link>
				 : <p> </p>}
        </div>
        <div className='card__page-date'>
            <p>date: {date.toLocaleString("ru-RU", {
								year: "numeric",
								month: "long",
								day: "numeric",
							})}</p>
        </div>
        {tags ? <div className='card__page-tag'> {tags.map(tag => <p key={Math.random()}>{tag}</p>)}</div> : <></>}
        <div className='card__page-title'>
            <p> {title}</p>
        </div>
        <div className='card__page-description'>
            <p>Description: {description}</p>
        </div>
        
        {address ? <div className='card__page-contacts'>Address: {address}</div> : <></>}
        <div className='card__page-price'>
           <p> Price: ${price}</p>
        </div>
       
        <Card sx={{ mt: 1, pb: 2 }}>
					<AddComment ad={{ _id: _id }} />
					<Stack spacing={1}>
						<CComment _id={_id} />
					</Stack>
				</Card>
    </div>
    </div>
  )
}


const CardPage = ({
	match: {
		params: { _id },
	},
	onCardId,
	props
}) => {
    console.log(_id);
    useEffect(() => {
		onCardId(_id);
	}, [_id, onCardId]);
    return <div>
        {props ? <div> {!!props ? <Page props={props} /> : <p>oops</p>}</div> : <p>Loading</p>}
    </div>  
}

const CCardPage = connect((state) => ({props: state.promise?.AdById?.payload}), {onCardId: actionAdById})(CardPage)

export default CCardPage
