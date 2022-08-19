import Input from 'antd/lib/input/Input'
import Button from 'antd/lib/button'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import actionCreateCard from '../redux/actions/actionCreateCard'
import { history } from '../App'
import CImgAdd from './ImgAdd'
useEffect

const CreateCard = ({onCreateCard, props={}}) => {
    const {_id, images, title, description, tags, address, price} = props
    const [isTitle, setIsTitle] = useState(title || '')
    const [isTags, setIsTags] = useState(tags || '')
    const [isAddress, setIsAddress] = useState(address || "");
    const [isImages, setIsImages] = useState([])
    const [isDescription, setIsDescription] = useState(description || '')
    const [isPrice, setIsPrice] = useState(price || '')

    const createCard = () => {
      const images = [];
      if (isImages) {
        for (let image of isImages) {
          const imgId = { _id: image._id };
          images.push(imgId);
        }
      }
      const result = {
        ...(_id ? { _id } : {}),
        ...(images.length ? { images } : {}),
        tags: isTags,
        title: isTitle,
        description: isDescription,
        price: +isPrice,
        ...(isAddress.length !== 0 ? { address: isAddress } : {}),
      };
      onCreateCard(result);
    }

    const onImages = (imagesData) => {
      if (!!imagesData) {
        setIsImages(imagesData);
      }
    };


  return (
    <div>
        <h3>Create new card</h3>
        <div>
          <CImgAdd images={images || []} onImages={onImages}/>
        </div>
        <Input type='text' placeholder='title' value={isTitle} onChange={(e) => setIsTitle(e.target.value)}/>
        <Input type='text' placeholder='tag' value={isTags} onChange={(e) => setIsTags(e.target.value)}/>
        <Input type='textarea' placeholder='description' value={isDescription} onChange={(e) => setIsDescription(e.target.value)}/>
        <Input type='number' placeholder='price' value={isPrice} onChange={(e) => setIsPrice(e.target.value)}/>
        <Button onClick={() => createCard()}>{_id ? "Edit" : "Create"}</Button>

    </div>
  )
}


const CCreateCard = connect(null,{onCreateCard: actionCreateCard })(CreateCard)

const EditCard = ({match: {params: {_id}, onIdChange, props}}) => {
  useEffect(() => {
		onIdChange(_id);
	}, [_id, onIdChange])

  useEffect(() => {
		if (props) {
			if (props.owner._id !== myId) {
				history.push(`/main/${props._id}`);
			}
		}
	}, [props]);
	return props ? <CreateCard props={props} /> : <>Loading</>;
}

const CEditCard = connect(state => ({props: state?.promise?.AdFindOne?.payload, myId: state?.aboutMe?.payload?._id}))(EditCard)
export  {CEditCard, CCreateCard}

