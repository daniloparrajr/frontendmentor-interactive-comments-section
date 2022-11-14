const Avatar = ({user, extraClasses}) => {
	return (
		<img className={`w-8 block ${extraClasses}`} src={user.image.png} alt={user.username}/>
	);
}

export default Avatar;