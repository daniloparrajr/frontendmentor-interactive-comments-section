import Avatar from "./Avatar";
import {useState} from 'react';

const CommenfForm = ({user, commentId, onSubmit}) => {
	const [content, setContent] = useState('');

	const onFormSubmit = (e) => {
		e.preventDefault();
		onSubmit(content, commentId);
		setContent('');
	}

	return (
		<form onSubmit={(e) => {
			onFormSubmit(e);
		}}
			  className="bg-white p-4 mb-4 rounded-lg p-4 flex flex-wrap justify-between items-center lg:items-start lg:py-7 lg:px-6">
			<textarea required value={content} onChange={(e) => {
				setContent(e.target.value)
			}}
					  className="focus:border-moderate-blue focus-visible:outline-moderate-blue text-grayish-blue px-6 py-3 border border-light-gray block w-full lg:w-auto lg:grow lg:order-2 rounded-lg mb-4 lg:mx-4 lg:mb-0"
					  rows="3" placeholder="Add a comment…"></textarea>
			<Avatar user={user} extraClasses="lg:w-10 lg:order-start lg:grow-0"/>
			<input type="submit" value="SEND"
				   className="btn bg-moderate-blue py-3 px-8 rounded-lg lg:order-last lg:grow-0"/>
		</form>
	)
}

export default CommenfForm;