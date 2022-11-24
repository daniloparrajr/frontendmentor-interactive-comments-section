import {ReactComponent as IconPlus} from '../images/icon-plus.svg';
import {ReactComponent as IconMinus} from '../images/icon-minus.svg';
import {ReactComponent as IconReply} from '../images/icon-reply.svg';
import {ReactComponent as IconDelete} from '../images/icon-delete.svg';
import {ReactComponent as IconEdit} from '../images/icon-edit.svg';
import Avatar from "./Avatar";
import {useState} from 'react';
import {useAutoAnimate} from '@formkit/auto-animate/react';
import CommentForm from './CommentForm';
import ReactTimeAgo from 'react-time-ago'

const Comment = ({details, currentUser, onUpVote, onDownVote, onEditContent, onAddReply, onShowModal}) => {
	const {id, content, createdAt, score, user, replyingTo, replies} = details;
	const [isEdit, setIsEdit] = useState(false);
	const [isReplying, setIsReplying] = useState(false);
	const [commentContent, setCommentContent] = useState(content);
	const date = new Date(createdAt);
	const [parent] = useAutoAnimate();

	const renderCurrentUserLabel = () => {
		return (
			<span className="text-white text-xs bg-moderate-blue px-1.5 py-0.5 ml-2 rounded-sm">you</span>
		);
	}

	const renderReplyButton = () => {
		return (
			<button onClick={() => {
				setIsReplying(!isReplying)
			}} className={`text-moderate-blue flex items-center transition-opacity hover:opacity-70 ${isReplying && 'opacity-70'}`}>
				<IconReply className="mr-2"/>
				<span className="font-medium">Reply</span>
			</button>
		);
	}

	const renderUserButtons = () => {
		return (
			<div className="flex">
				<button onClick={() => onShowModal(id)} className="text-soft-red flex items-center mr-6 transition-opacity hover:opacity-70">
					<IconDelete className="mr-2"/>
					<span className="font-medium">Delete</span>
				</button>
				<button onClick={() => {
					setIsEdit(!isEdit)
				}} className={`text-moderate-blue flex items-center transition-opacity hover:opacity-70 ${isEdit && 'opacity-70'}`}>
					<IconEdit className="mr-2"/>
					<span className="font-medium">Edit</span>
				</button>
			</div>
		);
	}

	const renderReplies = (replies) => {
		replies.sort((a, b) => b.score - a.score);
		return (
			<>
				{replies.map((reply) => <Comment key={reply.id} details={reply} currentUser={currentUser}
												 onUpVote={onUpVote} onDownVote={onDownVote}
												 onEditContent={onEditContent} onAddReply={onAddReply}
												 onShowModal={onShowModal}/>)}
			</>
		);
	}

	const renderReplyingto = () => {
		return (
			<span className="text-moderate-blue font-medium mr-1.5">@{replyingTo}</span>
		)
	}

	const renderScore = () => {
		return (
			<div className="bg-very-light-gray rounded-[10px] flex items-center lg:flex-col">
				<button onClick={() => {
					onUpVote(id, score)
				}} className="p-3.5"><IconPlus/><span className="sr-only">Upvote comment</span></button>
				<span className="text-moderate-blue font-medium lg:py-[3px] lg:px-1">{score}</span>
				<button onClick={() => {
					onDownVote(id, score)
				}} className="p-3.5"><IconMinus/><span className="sr-only">Down-vote comment</span></button>
			</div>
		)
	}

	const renderContent = () => {
		return (
			<p className="text-grayish-blue">{replyingTo && renderReplyingto()}{content}</p>
		);
	}

	const onEditContentFormSubmit = (e) => {
		e.preventDefault();
		onEditContent(id, commentContent);
		setIsEdit(!isEdit);
	}

	const renderEditForm = () => {
		return (
			<form onSubmit={(e) => {
				onEditContentFormSubmit(e);
			}}>
				<textarea required rows="3"
						  className="block border border-light-gray border w-full h-auto rounded-lg py-3 px-6 text-grayish-blue mb-4 focus-visible:outline-moderate-blue"
						  onChange={(e) => {
							  setCommentContent(e.target.value)
						  }} defaultValue={content}></textarea>
				<button className="btn px-5 block ml-auto">UPDATE</button>
			</form>
		);
	}

	const onSubmitCommentForm = (content, commentId) => {
		onAddReply(content, commentId);
		setIsReplying(false);
	}

	return (
		<article>
			<div className="bg-white p-4 mb-4 rounded-lg lg:p-6 lg:flex relative lg:items-start">
				<div className="lg:order-last lg:grow">
					<header className="flex flex-wrap items-center mb-4">
						<Avatar user={user} extraClasses="mr-4"/>
						<p className="font-bold text-dark-blue">{user.username}</p>
						{currentUser.username === user.username && renderCurrentUserLabel()}
						<p className="text-grayish-blue ml-4"><ReactTimeAgo date={date} locale="en-US" timeStyle="round-minute"/></p>
					</header>
					{isEdit ? renderEditForm() : renderContent()}
				</div>
				<div className="flex justify-between items-center lg:items-start mt-4 lg:mt-0 lg:order-start lg:mr-6 lg:grow-0">
					{renderScore()}
					<div className="lg:absolute lg:z-20 lg:top-6 lg:right-6">
						{currentUser.username !== user.username ? renderReplyButton() : renderUserButtons()}
					</div>
				</div>
			</div>

			<div className="pl-4 lg:ml-10.5 lg:pl-10.5 border-l-2 lg:border-l-3 border-light-gray" ref={parent}>
				{isReplying && <CommentForm commentId={id} user={currentUser} onSubmit={onSubmitCommentForm}/>}

				{replies && renderReplies(replies)}
			</div>
		</article>
	);
}

export default Comment;