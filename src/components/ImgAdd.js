import React from 'react'
import { URL } from "../../data/dataGQL";
import { connect } from "react-redux";
import { useState, useEffect } from "react";
import { actionUploadImg } from '../redux/actions/actionUpload';



const ImgAdd = ({ onUpload, onImages, images, newImages }) => {
	const [isImages, setIsImages] = useState(images)
    
    useEffect(() => {
		if (isImages.length !== 0) {
			const images = [];
			if (isImages) {
				for (let image of isImages) {
					const imgId = { _id: image._id };
					images.push(imgId);
				}
			}
			onImages(images);
		}
	}, [isImages])

    useEffect(() => {
		if (newImages) {
			if (!isImages.length) {
				setIsImages(newImages);
			}
			if (isImages.length) {
				setIsImages([...isImages, ...newImages]);
			}
		}
	}, [newImages]);

  return (
    <div>
            <Dropzone
				onDrop={(acceptedFiles) => {
					onUpload(acceptedFiles);
				}}
			>
				{({ getRootProps, getInputProps }) => (
					<section>
						<div
							style={{
								border: "6px double #0f6dba",
								textAlign: "center",
								margin: "10px 15px",
								padding: "4px 8px",
							}}
							{...getRootProps()}
						>
							<input {...getInputProps()} />
							<AddPhotoAlternateIcon color="primary" fontSize="large" />
							<p>Нажмите на иконку или перетяните ваши изображения</p>
						</div>
					</section>
				)}
			</Dropzone>
    </div>
  )
}

const CImgAdd = connect(state => ({ newImages: state.promise?.Upload?.payload}, {onUpload: actionUploadImg}))(ImgAdd)

export default CImgAdd
