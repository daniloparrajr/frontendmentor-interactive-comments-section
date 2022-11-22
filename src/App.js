import {useState} from 'react';
import data from './data/data.json';
import CommentsSection from './components/CommentsSection';
import Modal from './components/Modal';

const getComments = () => {
	let localComments = localStorage.getItem('comments');

	if (localComments) {
		localComments = JSON.parse(localComments);
	} else {
		localComments = data.comments;
		localStorage.setItem('comments', JSON.stringify(data.comments));
	}

	return localComments;
}

function App() {
	const [comments, setComments] = useState(getComments());
	const [isModalActive, setIsModalActive] = useState(false);
	const [deleteCommentId, setDeleteCommentId] = useState(null);

	comments.sort((a, b) => b.score - a.score);

	const updateComment = (id, key, value) => {
		const newComment = [...comments];

		function recursiveUpdate(comment) {
			if (comment.id === id) {
				comment[key] = value;
				return true;
			} else if ('replies' in comment) {
				comment.replies.forEach((reply) => {
					recursiveUpdate(reply);
				});
			}

			return false;
		}

		newComment.some((comment) => {
			return recursiveUpdate(comment);
		});

		localStorage.setItem('comments', JSON.stringify(newComment));
		setComments(newComment);
	}

	const upVoteComment = (commentId, voteScore) => {
		updateComment(commentId, 'score', voteScore + 1);
	}

	const downVoteComment = (commentId, voteScore) => {
		updateComment(commentId, 'score', voteScore - 1);
	}

	const editCommentContent = (commentId, content) => {
		updateComment(commentId, 'content', content);
	}

	const addComment = (content) => {
		const newComment = {
			"id": Math.floor(Math.random() * 99999),
			"content": content,
			"createdAt": new Date(),
			"score": 0,
			"user": data.currentUser,
			"replies": []
		};

		const newComments = [...comments, newComment];

		localStorage.setItem('comments', JSON.stringify(newComments));
		setComments(newComments);
	}

	const addReply = (content, id) => {
		const newComments = [...comments];
		const newReply = {
			"id": Math.floor(Math.random() * 99999),
			"content": content,
			"createdAt": new Date(),
			"score": 0,
			"user": data.currentUser,
		};

		function recursiveUpdate(comment) {
			if (comment.id === id) {
				if ('replies' in comment) {
					comment.replies = [...comment.replies, {...newReply, replyingTo: comment.user.usermae}]
				} else {
					comment.replies = [{...newReply, replyingTo: comment.user.usermae}]
				}
				return true;
			} else if ('replies' in comment) {
				comment.replies.forEach((reply) => {
					recursiveUpdate(reply);
				});
			}

			return false;
		}

		newComments.some((comment) => {
			return recursiveUpdate(comment);
		});

		localStorage.setItem('comments', JSON.stringify(newComments));
		setComments(newComments);
	}

	const deleteComment = () => {
		const newComments = [...comments];
		let index = 0

		const recursiveDelete = (comment, parent, index) => {
			if (comment.id === deleteCommentId) {
				parent.splice(index, 1);
				return true;
			} else if ('replies' in comment) {
				index = 0;
				comment.replies.forEach((reply) => {
					recursiveDelete(reply, comment.replies, index++);
				});
			}

			return false;
		}

		newComments.some((newComment)=>{
			return recursiveDelete(newComment, newComments, index++);
		});

		localStorage.setItem('comments', JSON.stringify(newComments));
		setComments(newComments);
		setIsModalActive(false);
	}

	const showDeleteCommentModal = (id) => {
		setIsModalActive(true);
		setDeleteCommentId(id);
	}

	const hideDeleteCommentModal = () => {
		setIsModalActive(false);
		setDeleteCommentId(null);
	}

	return (
		<main className="py-8 px-4">
			<CommentsSection
				comments={comments}
				currentUser={data.currentUser}
				onUpVoteComment={upVoteComment}
				onDownVoteComment={downVoteComment}
				onEditCommentContent={editCommentContent}
				onAddComment={addComment}
				onAddReply={addReply}
				onShowModal={showDeleteCommentModal}
			/>

			{isModalActive && <Modal onHideModal={hideDeleteCommentModal} onDeleteComment={deleteComment}/>}
		</main>
	);
}

export default App;
