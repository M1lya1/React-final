import React from 'react'
import { Carousel } from 'antd';
import { Link } from 'react-router-dom';
const contentStyle = {
  height: '250px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};



const Card = ({cat: {_id, images, tags, title, price}}) => {
 
  return (
    
    <div className='card'>
        <Link to={`/main/${_id}`} style={{ textDecoration: 'none', color:'inherit'}}>
        {!!images  ? (
        <Carousel >
           {images.map(image =>  <div>
                <img src={`http://marketplace.node.ed.asmer.org.ua/${image.url}`} key={image._id || Math.random()} style={contentStyle} alt='img'/>
            </div>) 
}
            
        </Carousel>
        
) : <div className='card__noimage'>NO IMAGE</div>}
      
        
        
        <div className='card__title'>
           { title ? <p> {title}</p> : <p>no title</p>}
        </div>
        
        <div className='card__tag'>
          Category: { tags ?  tags.map(tag => <p key={Math.random()}> {tag}</p>) : <p></p>}
        </div>
        
        <div className='card__price'>
            {price ? <p>${price}</p> : <p></p>}
        </div>
        </Link>
    </div>
    
  )
}



export default Card
