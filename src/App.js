import data from './data/data.json';
import Comments from './components/Comments';

function App() {
	data.comments.sort((a, b) => b.score - a.score);

	return (
		<main className="py-8 px-4">
			<Comments comments={data.comments} currentUser={data.currentUser}/>
		</main>
	);
}

export default App;
