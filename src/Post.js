import React from 'react'
import "./Post.css"
import Avatar from "@material-ui/core/Avatar"

function Post() {
	return (
		<div className="post">
			<div className="post__header">
				<Avatar className="post__avatar" alt="George" src="/static/images/avatar/1.jpg" />
				<h3 className="post__username">Username</h3>
			</div>
			{/* header -> avatar + username */}

			<img className="post__image" src="https://wallpaperaccess.com/full/119615.jpg" 
				alt=""/>
			{/* image */}
			{/* like comment  */}
			<h4 className="post__text"><span className="post__username">Username: </span> beach vacation</h4>
			{/* username + caption */}

		</div>
	)
}

export default Post
