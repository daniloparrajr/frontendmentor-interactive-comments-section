import Comment from './Comment';
import CommenfForm from "./CommentForm";

const Comments = ({comments, currentUser, onUpVoteComment, onDownVoteComment}) => {
	return (
		<section className="max-w-[45.625rem] mx-auto" aria-describedby="#commentsSectionHeading">
			<h2 id="commentsSectionHeading" className="sr-only">Comments sections</h2>
			<div className="mb-4">
				{comments.map(comment=>(
					<Comment
						key={comment.id}
						details={comment}
            onUpVote={onUpVoteComment}
            onDownVote={onDownVoteComment}
						currentUser={currentUser}
					/>
				))}
			</div>
			<CommenfForm user={currentUser} />
		</section>
	);
}

export default Comments;
