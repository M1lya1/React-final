import { useDispatch } from "react-redux";
import { actionAddComment } from "../redux/actions/actionAddComent";
import {  Button, Comment, Form, Input} from 'antd';
import React, { useState } from 'react';
const { TextArea } = Input;


const Editor = ({ onChange, onSubmit, value }) => (
	<>
	  <Form.Item>
		<TextArea rows={4} onChange={onChange} value={value} />
	  </Form.Item>
	  <Form.Item>
		<Button htmlType="submit"  onClick={onSubmit} type="primary">
		  Add Comment
		</Button>
	  </Form.Item>
	</>
  );

const AddComment = ({ad, answerTo}) => {
	const [value, setValue] = useState('')
	const dispatch = useDispatch()

	const createComment = () => {
		const result = { text: value, ad: ad, ...(answerTo ? { answerTo: answerTo } : {}) }

		dispatch(actionAddComment(result))
        setValue('')
		
	}
	const handleSubmit = () => {
		if (!value) return;
		createComment();
	}

	const handleChange = (e) => {
		setValue(e.target.value);
	  };
	return (
		<Comment
       
        content={
          <Editor
            onChange={handleChange}
            onSubmit={handleSubmit}
            value={value}
          />
		}
		/>
	)
}

export default AddComment
