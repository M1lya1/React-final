import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import { Carousel } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import actionAdById from '../redux/actions/actionAdFind'
import AddComment from './AddComment';
import CommentsRender from './Comment';
import {EditOutlined, EditFilled}  from '@ant-design/icons'
import Loading from './Loading';
const contentStyle = {
  height: '400px',
  width: 'auto',
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
       <div className='card__page-carousel'> {images ? (
        <Carousel >
           {images.map(image =>  <div>
                <img src={`http://marketplace.node.ed.asmer.org.ua/${image.url}`} key={image._id} style={contentStyle} alt='img'/>
            </div>) 
}
            
        </Carousel>
        
) : <p>NO IMAGE</p>}
       </div>
        <div className='card__page-icon'> 
        {userId === ownerId ?
        <Link to={`/editCard/${_id}`} >
          
          <EditFilled style={{fontSize: '25px'}}/>
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
            <p> {description}</p>
        </div>
        
        {address ? <div className='card__page-contacts'> {address}</div> : <></>}
        <div className='card__page-price'>
           <p> ${price}</p>
        </div>
       
					<AddComment ad={{ _id: _id }} />
          <CommentsRender _id={_id} />
    </div>
    </div>
  )
}


const CardPage = ({
	match: {
		params: { _id },
	},
}) => {
    
    const props = useSelector(state => state.promise?.AdById?.payload)
    
    const dispatch = useDispatch()
    useEffect(() => {
		dispatch(actionAdById(_id));
	}, [_id, dispatch]);
    return <div>
        {props ? <div> {!!props ? <Page props={props} /> : <p>oops</p>}</div> : <Loading/>}
    </div>  
}



export default CardPage
