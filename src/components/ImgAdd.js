import React from 'react'
import { useState, useEffect } from "react";
import { actionUploadFiles } from '../redux/actions/actionUpload';
import Dropzone from "react-dropzone";
import { Box, ImageListItem, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { URL } from '../redux/GQL';



const CImgAdd = ({ onImages, images }) => {

	const newImages = useSelector(state => state.promise?.isUpLoaded?.payload)
	const dispatch = useDispatch()

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

	const handleOnDragEnd = (result) => {
		console.log(result);
		if (!result.destination) return;
		const items = Array.from(thisImages);
		const [reorderedItem] = items.splice(result.source.index, 1);
		items.splice(result.destination.index, 0, reorderedItem);

		setThisImages(items);
	};

	const imgRemove = (id) => {
		const imgUpdata = thisImages.filter((image) => image._id !== id);
		setThisImages(imgUpdata);
	};

	return (
		<>
			
			<Dropzone
				onDrop={(acceptedFiles) => {
					dispatch(actionUploadFiles(acceptedFiles));
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
		
		</>
	);
}



export default CImgAdd

