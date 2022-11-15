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

	const updateCommenht = (id, key, value) => {
	}

	const upVoteComment = (commentId, voteScore) => {
		console.log('Up voting!');
	}

	const downVoteComment = (commentId, voteScore) => {
		console.log('Down voting!');
	}

	return (
		<main className="py-8 px-4">
			<CommentsSection comments={comments} currentUser={data.currentUser} onUpVoteComment={upVoteComment}
							 onDownVoteComment={downVoteComment}/>
		</main>
	);
}

export default App;
