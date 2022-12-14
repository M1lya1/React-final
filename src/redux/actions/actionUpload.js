import { uploadURL } from "../GQL";
import { actionPromise, actionFulfilled } from "./actions";



const fileUpload = (data) => {
	const formData = new FormData();
	formData.append("photo", data);
	return fetch(uploadURL, {
		method: "POST",
		headers: localStorage.authToken ? { Authorization: "Bearer " + localStorage.authToken } : {},
		body: formData,
	})
		.then((res) => res.json())
		.then((data) => data);
};

const actionUploadFiles = (file) => async (dispatch) => {
	const files = [];
	for (let i = 0; i < file.length; i++) {
		files.push(fileUpload(file[i]));
	}
	const action = actionPromise("isUpLoaded", Promise.all(files).then((res) => res));
	await dispatch(action);
};

const actionUploadAvatar = (file) => async (dispatch) => {
	const action = actionPromise("isAvatar", fileUpload(file[0]));
	await dispatch(action);
};

const clearUploadImg = () => (dispatch) => {
	dispatch(actionFulfilled("isUpLoaded", []));
};

export { actionUploadFiles, actionUploadAvatar, clearUploadImg };
