import Comment from './Comment';
import CommenfForm from "./CommentForm";
import {useAutoAnimate} from '@formkit/auto-animate/react'

const Comments = ({
					  comments,
					  currentUser,
					  onUpVoteComment,
					  onDownVoteComment,
					  onEditCommentContent,
					  onAddComment,
					  onAddReply,
					  onShowModal
				  }) => {
	const [parent] = useAutoAnimate();

	return (
		<section className="max-w-[45.625rem] mx-auto" aria-label="#commentsSectionHeading">
			<h2 id="commentsSectionHeading" className="sr-only">Comments sections</h2>
			<div className="mb-4" ref={parent}>
				{comments.map(comment => (
					<Comment
						key={comment.id}
						details={comment}
						currentUser={currentUser}
						onUpVote={onUpVoteComment}
						onDownVote={onDownVoteComment}
						onEditContent={onEditCommentContent}
						onAddReply={onAddReply}
						onShowModal={onShowModal}
					/>
				))}
			</div>
			<CommenfForm onSubmit={onAddComment} user={currentUser}/>
		</section>
	);
}

export default Comments;
