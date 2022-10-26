import Input from 'antd/lib/input/Input'
import Button from 'antd/lib/button'
import React, { useEffect, useState } from 'react'
import {  useDispatch, useSelector } from 'react-redux'
import actionCreateCard from '../redux/actions/actionCreateCard'
import CImgAdd from './ImgAdd'
import actionAdById from '../redux/actions/actionAdFind'
import Loading from './Loading'
import { clearUploadImg } from '../redux/actions/actionUpload'




const CreateCard = ({  props={}}) => {
  const dispatch = useDispatch()

    const {_id, images, title, description, tags, address, price} = props
    const [isTitle, setIsTitle] = useState(title || '')
    const [isTags, setIsTags] = useState(tags || '')
    const [isAddress, setIsAddress] = useState(address || "");
    const [isImages, setIsImages] = useState([])
    const [isDescription, setIsDescription] = useState(description || '')
    const [isPrice, setIsPrice] = useState(price || '')

   
    const onImages = (images) => {
      if (!!images) {
        setIsImages(images);
      }
    }

    useEffect(() => {
      return () => {
        dispatch(clearUploadImg());
      };
    }, [dispatch]);

    const createCard = () => {
      const images = [];
      if (isImages) {
        for (let image of isImages) {
          const imgId = { _id: image._id };
          images.push(imgId);
        }
      }
 
      const Ad = {
        ...(_id ? { _id: _id } : {}),
        ...(images.length ? { images: images } : {}),
        tags: isTags,
        title: isTitle,
        description: isDescription,
        price: +isPrice,
        ...(isAddress.length !== 0 ? { address: isAddress } : {}),
      };
      
      
      dispatch(actionCreateCard(Ad));
    }

   


  return (
    <div className='create'>
        <h3 className='create__title'>{_id ? "Edit card" : "Create new card"}</h3>
        <div className='create__img'>
          {isImages.map(img => <div>{img.name}</div>)}
          <CImgAdd images={images || []} onImages={onImages}/>
        
          
        </div>
        <div className='create__input'>
        <Input type='text' placeholder='title' value={isTitle} onChange={(e) => setIsTitle(e.target.value)}/>
        <Input type='text' placeholder='tag' value={isTags} onChange={(e) => setIsTags(e.target.value)}/>
        <Input type='textarea' placeholder='description' value={isDescription} onChange={(e) => setIsDescription(e.target.value)}/>
        <Input type='text' placeholder='address' value={isAddress} onChange={(e) => setIsAddress(e.target.value)}/>
        <Input type='number' placeholder='price' value={isPrice} onChange={(e) => setIsPrice(e.target.value)}/>
        </div>
        <Button onClick={() => createCard()}>{_id ? "Edit" : "Create"}</Button>

    </div>
  )
}




const EditCard = ({match: {params: {_id}}}) => {
  const props = useSelector(state => state.promise?.AdById?.payload)
  const dispatch = useDispatch()
  useEffect(() => {
		dispatch(actionAdById(_id))
	}, [_id,dispatch])
 
	return props ? <CreateCard  props={props} /> : <Loading/>;
}


export  {EditCard, CreateCard}

