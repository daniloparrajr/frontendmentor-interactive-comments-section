import { ReactComponent as IconPlus } from '../images/icon-plus.svg';
import { ReactComponent as IconMinus } from '../images/icon-minus.svg';
import { ReactComponent as IconReply } from '../images/icon-reply.svg';
import { ReactComponent as IconDelete } from '../images/icon-delete.svg';
import { ReactComponent as IconEdit } from '../images/icon-edit.svg';
import Avatar from "./Avatar";

const Comment = ( { details, currentUser, onUpVote, onDownVote } ) => {
  const {content, createdAt, score, user, replyingTo } = details;

	const renderCurrentUserLabel = () => {
		return (
			<span className="text-white text-xs bg-moderate-blue px-1.5 py-0.5 ml-2 rounded-sm">you</span>
		);
	}

	const renderReplyButton = () => {
		return (
			<button className="text-moderate-blue flex items-center">
				<IconReply className="mr-2" />
				<span className="font-medium">Reply</span>
			</button>
		);
	}

	const renderUserButtons = () => {
		return (
			<div className="flex">
				<button className="text-soft-red flex items-center mr-6">
					<IconDelete className="mr-2" />
					<span className="font-medium">Delete</span>
				</button>
				<button className="text-moderate-blue flex items-center">
					<IconEdit className="mr-2" />
					<span className="font-medium">Edit</span>
				</button>
			</div>
		);
	}

	const renderReplies = (replies) => {
		return (
			<div className="pl-4 border-l-2 border-light-gray">
				{replies.map((reply)=> <Comment key={reply.id} details={reply} currentUser={currentUser} onUpVote={onUpVote} onDownVote={onDownVote}/>)}
			</div>
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
        <button onClick={()=>{onUpVote(details.id, details.score)}} className="p-3.5"><IconPlus/></button>
        <span className="text-moderate-blue font-medium lg:py-[3px]">{score}</span>
        <button onClick={()=>{onDownVote(details.id, details.score)}} className="p-3.5"><IconMinus/></button>
      </div>
		)
  }

	return (
		<article>
			<div className="bg-white p-4 mb-4 rounded-lg lg:p-6 lg:flex relative lg:items-start">
				<div className="lg:order-last lg:grow">
          <header className="flex flex-wrap items-center mb-4">
            <Avatar user={user} extraClasses="mr-4" />
            <p className="font-bold text-dark-blue">{user.username}</p>
            {currentUser.username === user.username && renderCurrentUserLabel()}
            <p className="text-grayish-blue ml-4">{createdAt}</p>
          </header>
          <p className="text-grayish-blue mb-4">
            {replyingTo && renderReplyingto()}
            {content}
          </p>
        </div>
				<div className="flex justify-between lg:order-start lg:mr-6 lg:grow-0">
					{renderScore()}
          <div className="lg:absolute lg:z-50 lg:top-6 lg:right-6">
					  {currentUser.username !== user.username ? renderReplyButton() : renderUserButtons()}
          </div>
				</div>
			</div>

			{details.replies && renderReplies(details.replies)}
		</article>
	);
}

export default Comment;