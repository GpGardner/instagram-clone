import React from 'react'
import "./Post.css"
import Avatar from "@material-ui/core/Avatar"

function Post(props) {
	const { imageUrl, username, caption } = props 
	return (
		
		<div className="post">
			<div className="post__header">
				<Avatar className="post__avatar" alt={username} src="/static/images/avatar/1.jpg" />
				<h3 className="post__username">{username}</h3>
			</div>
			{/* header -> avatar + username */}

			<img className="post__image" src={imageUrl}
				alt=""/>
			{/* image */}
			{/* like comment  */}
			<h4 className="post__text"><span className="post__username">{username}: </span> {caption}</h4>
			{/* username + caption */}

		</div>
	)
}

export default Post
