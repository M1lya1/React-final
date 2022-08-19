import { useState, useEffect } from "react"
import { URL } from "../redux/GQL"
import Input from "antd/lib/input"
import Button from "antd/lib/button"
import { connect } from 'react-redux';
import actionUserUpdate from "../redux/actions/actionUserUpdate";
import Dropzone from "react-dropzone";
import {actionAvatar} from '../redux/actions/actionUpload'


const ProfileEdit = ({props,newAvatar, onAvatar,onUserUpdate}) => {
    const {_id,avatar, nick,} = props
    const {nickName, setNickName} = useState(nick || '')
    const {isAvatar, setIsAvatar} = useState(avatar || [])
    useEffect(() => {
		if (newAvatar) {
			setIsAvatar(newAvatar);
		}
	}, [newAvatar]);

    const deleteImg = (_id) => {
		setIsAvatar([]);
	};

    const Update = () => {
		let image;
		if (isAvatar) {
			image = { _id: isAvatar._id };
		}
		const result = {
			_id: _id,
			nick: nickName,
			...(image ? { avatar: image } : {}),
		};
		onUserUpdate(result);
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
									
									<p>Drag 'n' drop some files here, or click to select files</p>
								</div>
							</section>
						)}
					</Dropzone>
        </div>
        {isAvatar ?
        <div>
            <button onClick={() => deleteImg()}>X</button>
            <img
			src={`${URL}${isAvatar.url}`}
			// srcSet={`${URL}${isAvatar.url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
			alt="img"
		/>
        </div>
        : <></>}
         <Input type='text' placeholder='nick name' value={nickName} onChange={(e) => setNickName(e.target.value)}/>
         <Button onClick={Update}>Change profile</Button>
    </div>
}

const CProfileEdit = connect(state => ({props: state?.aboutMe?.payload, newAvatar: state?.promise?.Avatar?.payload}, 
                                        {onAvatar: actionAvatar},
                                        {onUserUpdate: actionUserUpdate}))(ProfileEdit)

export default CProfileEdit
