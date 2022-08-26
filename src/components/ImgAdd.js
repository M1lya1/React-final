import React from 'react'
import { connect } from "react-redux";
import { useState, useEffect } from "react";
import { actionUploadFiles } from '../redux/actions/actionUpload';
import Dropzone from "react-dropzone";
import { Box, ImageListItem, IconButton } from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";




const ImgAdd = ({ onUpload, onImages, images, newImages }) => {
// 	const [isImages, setIsImages] = useState(images)
    
//     useEffect(() => {
// 		if (isImages.length !== 0) {
// 			const images = [];
// 			if (isImages) {
// 				for (let image of isImages) {
// 					const imgId = { _id: image._id };
// 					images.push(imgId);
// 				}
// 			}
// 			onImages(images);
// 		}
// 	}, [isImages])

//     useEffect(() => {
// 		if (newImages) {
// 			if (!isImages.length) {
// 				setIsImages(newImages);
// 			}
// 			if (isImages.length) {
// 				setIsImages([...isImages, ...newImages]);
// 			}
// 		}
// 	}, [newImages]);

//   return (
    
//     <>
// 			<Dropzone
// 				onDrop={(acceptedFiles) => {
// 					onUpload(acceptedFiles);
// 				}}
// 			>
// 				{({ getRootProps, getInputProps }) => (
// 					<section>
// 						<div
// 							style={{
// 								border: "6px double #0f6dba",
// 								textAlign: "center",
// 								margin: "10px 15px",
// 								padding: "4px 8px",
// 							}}
// 							{...getRootProps()}
// 						>
// 							<input {...getInputProps()} />
// 							{/* <AddPhotoAlternateIcon color="primary" fontSize="large" /> */}
// 							<p>Нажмите на иконку или перетяните ваши изображения</p>
// 						</div>
// 					</section>
// 				)}
// 			</Dropzone>
//             </>
//   )



const [thisImages, setThisImages] = useState(images);

	useEffect(() => {
		if (thisImages.length !== 0) {
			const images = [];
			if (thisImages) {
				for (let image of thisImages) {
					const imgId = { _id: image._id };
					images.push(imgId);
				}
			}
			onImages(images);
		}
	}, [thisImages]);

	useEffect(() => {
		if (newImages) {
			if (!thisImages.length) {
				setThisImages(newImages);
			}
			if (thisImages.length) {
				setThisImages([...thisImages, ...newImages]);
			}
		}
	}, [newImages]);

  

	return (
		<>
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
			<Box>
				
			</Box>
		</>
	);
}

// const CImgAdd = connect(state => ({ newImages: state.promise?.isUpLoaded?.payload}), {onUpload: actionUploadImg})(ImgAdd)
const CImgAdd = connect(state => ({ newImages: state.promise?.isUpLoaded?.payload}), {onUpload: actionUploadFiles})(ImgAdd)

export default CImgAdd

