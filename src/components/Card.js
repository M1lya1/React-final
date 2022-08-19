import React, { useEffect } from 'react'
import { Carousel } from 'antd';
import { Link } from 'react-router-dom';
const contentStyle = {
  height: '175px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};



const Card = ({cat}) => {
 
  return (
    <Link to={`/main/${cat._id}`}>
    <div className='card'>
        {cat.images ? (
        <Carousel >
           {cat.images.map(image =>  <div>
                <img src={`http://marketplace.node.ed.asmer.org.ua/${image.url}`} key={cat._id} style={contentStyle}/>
            </div>) 
}
            
        </Carousel>
) : <p>[]</p>}
        <div className='card__title'>
           { cat.title ? <p>title: {cat.title}</p> : <p>no title</p>}
        </div>
        <div className='card__tag'>
           { cat.tags ?  cat.tags.map(tag => <p key={Math.random()}>tag: {tag},</p>) : <p></p>}
        </div>
        <div className='card__date'>
            <p>date</p>
        </div>
        <div className='card__price'>
            {cat.price ? <p>Price: {cat.price}</p> : <p>[]</p>}
        </div>
    </div>
    </Link>
  )
}



export default Card
