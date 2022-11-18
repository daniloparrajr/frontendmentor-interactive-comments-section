import data from './data/data.json';
import CommentsSection from './components/CommentsSection';
import {useState} from 'react';

const getComments = () => {
	let localComments = localStorage.getItem('comments');

	if (localComments) {
		localComments = JSON.parse(localComments);
	} else {
		data.comments.sort((a, b) => b.score - a.score);
		localComments = JSON.stringify(data.comments);
		localStorage.setItem('comments', localComments);
	}

	return localComments;
}

function App() {
	const [comments, setComments] = useState(getComments());

	const updateComment = (id, key, value) => {
    const newComment = [...comments];

    function recursiveUpdate(comment) {
      if (comment.id === id) {
        comment[key] = value;
        return true;
      } else if ( 'replies' in comment ) {
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

	return (
		<main className="py-8 px-4">
			<CommentsSection
        comments={comments}
        currentUser={data.currentUser}
        onUpVoteComment={upVoteComment}
				onDownVoteComment={downVoteComment}
        onEditCommentContent={editCommentContent}
      />
		</main>
	);
}

export default App;
