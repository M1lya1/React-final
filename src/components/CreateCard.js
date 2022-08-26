import Input from 'antd/lib/input/Input'
import Button from 'antd/lib/button'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import actionCreateCard from '../redux/actions/actionCreateCard'
import { history } from '../App'
import CImgAdd from './ImgAdd'
import actionAdById from '../redux/actions/actionAdFind'
import { clearUploadImg } from '../redux/actions/actionUpload'


const CreateCard = ({onCreateCard, clearImg, props={}}) => {
    const {_id, images, title, description, tags, address, price} = props
    const [isTitle, setIsTitle] = useState(title || '')
    const [isTags, setIsTags] = useState(tags || '')
    const [isAddress, setIsAddress] = useState(address || "");
    const [isImages, setIsImages] = useState([])
    const [isDescription, setIsDescription] = useState(description || '')
    const [isPrice, setIsPrice] = useState(price || '')

   
    const onImages = (imagesData) => {
      if (!!imagesData) {
        setIsImages(imagesData);
      }
    };

    const createCard = () => {
      const images = [];
      if (isImages) {
        for (let image of isImages) {
          const imgId = { _id: image._id };
          images.push(imgId);
        }
      }
      const result = {
        ...(_id ? { _id: _id } : {}),
        ...(images.length ? { images: images } : {}),
        tags: isTags,
        title: isTitle,
        description: isDescription,
        price: +isPrice,
        ...(isAddress.length !== 0 ? { address: isAddress } : {}),
      };
      console.log(result);
      onCreateCard(result);
    }

   


  return (
    <div className='create'>
        <h3 className='create__title'>Create new card</h3>
        <div className='create__img'>
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


const CCreateCard = connect(null,{onCreateCard: actionCreateCard, clearImg: clearUploadImg })(CreateCard)

const EditCard = ({match: {params: {_id}}, onIdChange, props, myId}) => {
  useEffect(() => {
		onIdChange(_id);
	}, [_id,onIdChange])

 
	return  <CreateCard props={props} /> ;
}

const CEditCard = connect(state => ({props: state.promise?.AdById?.payload, myId: state.aboutMe?.payload?._id}),{onIdChange: actionAdById})(EditCard)
export  {CEditCard, CCreateCard}

