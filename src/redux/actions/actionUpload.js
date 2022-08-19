import { URL } from "../GQL";
import { actionPromise, actionFulfilled } from "./actions";

const imgUpload = (data) => {
	const formData = new FormData();
	formData.append("photo", data);
	return fetch(`${URL}upload`, {
		method: "POST",
		headers: localStorage.authToken ? { Authorization: "Bearer " + localStorage.authToken } : {},
		body: formData,
	})
		.then((res) => res.json())
		.then((data) => data);
};

const actionUploadImg = (img) => async (dispatch) => {
	const allPromises = [];
	for (let i = 0; i < img.length; i++) {
		allPromises.push(imgUpload(img[i]));
	}
	const action = actionPromise("UpLoad",Promise.all(allPromises).then((res) => res));
	await dispatch(action);
};

const actionAvatar = (img) => async (dispatch) => {
	const action = actionPromise("Avatar", imgUpload(img[0]));
	await dispatch(action);
};

// const clearUploadImg = () => (dispatch) => {
// 	dispatch(actionFulfilled("UpLoad", []));
// };

export { actionUploadImg, actionAvatar };
