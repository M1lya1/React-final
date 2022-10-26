import AddComment from "./AddComment";
import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch} from 'react-redux'
import { actionComment} from '../redux/actions/actionAddComent'
import sortComments from "../redux/actions/sortComment";
import 'antd/dist/antd.css'
import {  Input } from 'antd';
import  { useState } from 'react';
import { CaretRightOutlined } from '@ant-design/icons';
import { Collapse } from 'antd'


const { Panel } = Collapse;
const { TextArea } = Input;

const Answers = ({answers}) => {


	return (<Collapse
		bordered={false}
		defaultActiveKey={['1']}
		expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
		className="site-collapse-custom-collapse"
	  >
		<Panel header={'answers ' + ' ' + answers.length}>
		{answers.map(answer => <Comments comment={answer} key={answer._id}/>)}
		</Panel>
		</Collapse>
		
)}

const Comments = ({comment}) => {
	const {_id, owner, createdAt, text, ad, answerTo, answers} = comment

	const [show, setShow] = useState(false)

	const date = new Date(+createdAt)

	const user = (owner) => {
				if (owner?.nick) return owner.nick;
		
				return owner.login;
			}
			const userName = user(owner)

	const addCom = () => {
		if(show === true) {setShow(false)} else setShow(true)
		
	}
	return (
		<>
		<div className="comment__container">
		<div className="comment">
			<div className="comment__info">
				<div className="comment__user">
					<p>comment by {userName}</p>
				</div>
				<div className="comment__date">
					<p>{date.toLocaleString("ru-RU", {
						year: "numeric",
						month: "long",
						day: "numeric",
					})}</p>
				</div>
			</div>
			<div className="comment__text">
				{text ? <p>{text}</p> : "no text"}
			</div>
			<div className='comment__reply' onClick={addCom}>reply to</div>
		</div>
		{show && <AddComment ad={ad} answerTo={{ _id: _id }}/>}
		{!!answers ? <Answers  answers={answers}/> : null}
		</div>
		</>
		
		
	)
}


const CommentsAll = ({comments}) => {
		const commentsTree = sortComments(comments)
		
		return <>
			{!!commentsTree && commentsTree.map(comment => <Comments comment={comment} key={comment._id}/>)  }
		</>
}
const CommentsRender = ({ _id}) => {

  
  const comments = useSelector(state => state?.promise?.getComments?.payload?.comments)
  const dispatch = useDispatch()  
  useEffect(() => {
	dispatch(actionComment(_id))
  },[_id, dispatch])
  return (
    <>
	{comments && <CommentsAll comments={comments}/>}
    </>
  );
};

export default CommentsRender;
