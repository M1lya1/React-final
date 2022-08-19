import { useState } from "react";
import { useDispatch } from "react-redux";
import actionAddComment from "../redux/actions/actionAddComment";
import 'antd/dist/antd.css';
import { Avatar, Button, Comment, Form, Input, List } from 'antd';


const AddComment = ({props, answerTo}) => {
    const dispatch = useDispatch()
    const [comment, setComment] = useState('')

    const createComment = () => {
        const result = {text: comment, props, ...(answerTo ? answerTo : {})}
        dispatch(actionAddComment(result))
        setComment('')
    }
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
    return <div>
         <Editor
            onChange={(e) => setComment(e.target.value)}
            onSubmit={() => createComment()}
    
            value={comment}
          />

    </div>
}

export default AddComment
