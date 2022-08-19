import AddComment from "./AddComment";
import React from "react";
import { useEffect } from "react";
import connect from 'react-redux'
import {actionComment} from '../redux/actions/actionAddComent'


const Comment = ({ comment: { _id, owner, createdAt, text, props, answerTo, answers } }) => {
	
	const date = new Date(+createdAt)
    const user = (owner) => {
		if (owner?.nick) return owner.nick;

		return owner.login;
	}
    return <div>
       <div> Comment: {userName}{" "}
					{date.toLocaleString("ru-RU", {
						year: "numeric",
						month: "long",
						day: "numeric",
					})}
        </div>
        {<AddComment props={props} answerTo={{ _id }}/>}
        {answers}
    </div>

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

const CComment = connect(state => ({comments: state?.promise?.Comment?.payload?.comments}, {onIdChange: actionComment}))(Comm)

export default CComment
