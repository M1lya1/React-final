import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
// import 'antd/dist/antd.css';
// import { Avatar, Button, Comment, Form, Input, List } from 'antd';
import { actionAddComment } from "../redux/actions/actionAddComent";
import { Box, Button, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

// const { TextArea } = Input;


const AddComment = ({ad, answerTo}) => {

    const dispatch = useDispatch()
    const [comment, setComment] = useState('')

    const createComment = () => {
      const result = { text: comment, ad: ad, ...(answerTo ? { answerTo: answerTo } : {}) };
      console.log(result);
        dispatch(actionAddComment(result))
        setComment('')
    }

    
    return (
      <Box sx={{ padding: 1 }}>
			<TextField
				sx={{ width: "100%" }}
				id="outlined-multiline-flexible"
				label="Add comment"
				multiline
				maxRows={3}
				onChange={(e) => setComment(e.target.value)}
				value={comment}
			/>
			<Button
				sx={{ margin: "10px 0" }}
				
				variant="contained"
				color="success"
				endIcon={<SendIcon />}
				onClick={() => createComment()}
			>
				Add comment
			</Button>
		</Box>
    )
    // <div>
         {/* <Editor
            onChange={(e) => setComment(e.target.value)}
            onSubmit={() => createComment()}
    
            value={comment}
          /> */}

    // </div>
}

export default AddComment
