import { useState, useEffect } from "react"
import { URL } from "../redux/GQL"
import Input from "antd/lib/input"
import Button from "antd/lib/button"
import { connect } from 'react-redux';
import actionUserUpdate from "../redux/actions/actionUserUpdate";
import Dropzone from "react-dropzone";
import {actionUploadAvatar} from '../redux/actions/actionUpload'


const ProfileEdit = ({props,newAvatar, onAvatar,onUpdate}) => {
    const {_id,avatar, nick} = props
   
	const [thisNick, setThisNick] = useState(nick || "");
	const [thisAvatar, setThisAvatar] = useState(avatar || []);
    useEffect(() => {
		if (newAvatar) {
			setThisAvatar(newAvatar);
		}
	}, [newAvatar]);

    const deleteImg = (_id) => {
		setThisAvatar([]);
	};

    
	const userUpdata = () => {
		let image;
		if (thisAvatar) {
			image = { _id: thisAvatar._id };
		}
		const result = {
			_id: _id,
			nick: thisNick,
			...(image ? { avatar: image } : {}),
		};
		onUpdate(result);
	};

    return <div>
        <div>
		<Dropzone
						maxFiles={1}
						onDrop={(acceptedFiles) => {
							onAvatar(acceptedFiles);
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
									{/* <AddPhotoAlternateIcon color="primary" fontSize="large" /> */}
									<p>Нажмите на иконку или перетяните ваши изображения</p>
								</div>
							</section>
						)}
					</Dropzone>
        </div>
        {thisAvatar ?
        <div>
            <button onClick={() => deleteImg()}>X</button>
            <img
			src={`${URL}${thisAvatar.url}`}
			
			alt="img"
		/>
        </div>
        : <></>}
         <Input type='text' placeholder='nick name' value={thisNick} onChange={(e) => setThisNick(e.target.value)}/>
         <Button onClick={userUpdata}>Change profile</Button>
    </div>
}

const CProfileEdit = connect(state => ({props: state.promise?.userInfo?.payload, newAvatar: state.promise?.isAvatar?.payload }), 
                                        {onAvatar: actionUploadAvatar,
											onUpdate: actionUserUpdate})(ProfileEdit)

export default CProfileEdit
