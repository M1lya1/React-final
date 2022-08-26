import AddComment from "./AddComment";
import React from "react";
import { useEffect } from "react";
import {connect} from 'react-redux'
import {actionComment} from '../redux/actions/actionAddComent'
import sortComments from "../redux/actions/sortComment";
import { Typography, Box, IconButton, Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ReplyIcon from "@mui/icons-material/Reply";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Container } from "@mui/system";


const Comment = ({ comment: { _id, owner, createdAt, text, ad, answerTo, answers } }) => {
	
	const date = new Date(+createdAt)
    const user = (owner) => {
		if (owner?.nick) return owner.nick;

		return owner.login;
	}
	const userName = user(owner)
    // return <div>
    //    <div> Comment: {userName}{" "}
	// 				{date.toLocaleString("ru-RU", {
	// 					year: "numeric",
	// 					month: "long",
	// 					day: "numeric",
	// 				})}
    //     </div>
    //     {<AddComment props={props} answerTo={{ _id }}/>}
    //     {answers}
    // </div>
	return (
		<Container sx={{ borderBottom: "2px solid #1178cc" }}>
			<Box>
				<Typography variant="subtitle2" color="text.secondary">
					Прокоментировано: {userName}{" "}
					{date.toLocaleString("ru-RU", {
						year: "numeric",
						month: "long",
						day: "numeric",
					})}
				</Typography>
			</Box>
			<Box sx={{ position: "relative" }}>
				<Typography sx={{ textDecoration: "none" }} gutterBottom variant="subtitle1" component="p">
					{text}
				</Typography>
				<Box sx={{ position: "absolute", right: "0", top: " 0" }}>
					
						
					 
					
				</Box>
			</Box>

			 <AddComment ad={ad} answerTo={{ _id: _id }}  />
			
		</Container>
	)
}

const Comments = ({ comments }) => {
	const commentsTree = sortComments(comments);
	return <>{!!commentsTree && commentsTree.map((comment) => <Comment comment={comment} key={comment._id} />)}</>;
};

const Comm = ({ _id, onIdChange, comments }) => {
	useEffect(() => {
		onIdChange(_id);
	}, [_id, onIdChange]);
	return comments ? <Comments comments={comments} /> : <></>;
};

const CComment = connect(state => ({comments: state?.promise?.getComments?.payload?.comments}), {onIdChange: actionComment})(Comm)

export default CComment
