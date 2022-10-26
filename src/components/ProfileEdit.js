import { useState, useEffect } from "react"
import { URL } from "../redux/GQL"
import Input from "antd/lib/input"
import Button from "antd/lib/button"
import {  useDispatch, useSelector } from 'react-redux';
import actionUserUpdate from "../redux/actions/actionUserUpdate";
import Dropzone from "react-dropzone";
import {actionUploadAvatar} from '../redux/actions/actionUpload'
import {DeleteOutlined} from '@ant-design/icons' 


const ProfileEdit = () => {
	const props = useSelector(state => state.promise?.aboutMe?.payload)
	const newAvatar = useSelector(state => state.promise?.isAvatar?.payload)
	const dispatch = useDispatch()
	
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
		dispatch(actionUserUpdate(result))
	};

    return <div className="profile__edit">
        <div className="profile__edit-drop">
		<Dropzone
						maxFiles={1}
						onDrop={(acceptedFiles) => {
							dispatch(actionUploadAvatar(acceptedFiles));
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
								
									<p>Нажмите на иконку или перетяните ваши изображения</p>
								</div>
							</section>
						)}
					</Dropzone>
        </div>
        {thisAvatar ?
        <div className="profile__edit-avatar">
            
            <img
			src={`${URL}${thisAvatar.url}`}
			
			alt="img"
		/>
		
		<DeleteOutlined style={{fontSize: '25px'}} onClick={() => deleteImg()}/>
        </div>
        : <></>}
         <p> Enter new name: <Input style={{maxWidth: '400px'}} type='text' placeholder='nick name' value={thisNick} onChange={(e) => setThisNick(e.target.value)}/></p>
         <Button style={{width: '150px', margin: '0 auto'}} onClick={userUpdata}>Change profile</Button>
    </div>
}


export default ProfileEdit
