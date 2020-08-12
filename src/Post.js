import React, { useState, useEffect } from "react";
import "./Post.css";
import { Input, Avatar, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import firebase from "firebase";
import { db } from "./firebase";

const useStyles = makeStyles((theme) => ({
  postButton : {
		color: "#6082a3",
	}
}));


function Post(props) {
	const { imageUrl, username, caption, postId, user } = props;
	const classes = useStyles();

  const [comments, setComments] = useState([]);
  const [addComment, setAddComment] = useState("");

  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)
				.collection("comments")
				.orderBy('timestamp', 'desc')
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }
    return () => {
      unsubscribe();
    };
  }, [postId]);

  const postComment = (e) => {
		e.preventDefault();

		db.collection("posts").doc(postId).collection('comments').add({
			text: addComment,
			username: user.displayName,
			timestamp: firebase.firestore.FieldValue.serverTimestamp()
		});

		setAddComment('');
	};

  return (
    <div className="post">
      <div className="post__header">
        <Avatar
          className="post__avatar"
          alt={username}
          src="/static/images/avatar/1.jpg"
        />
        <h3 className="post__username">{username}</h3>
      </div>
      {/* header -> avatar + username */}

      <img className="post__image" src={imageUrl} alt="" />
      {/* image */}
      {/* like comment  */}
      <h4 className="post__text">
        <span className="post__username">{username}: </span> {caption}
      </h4>
      {/* username + caption */}

			{comments.map( (comment) => (
				<p>{comment.username}: {comment.text}</p>
			))}

      <form className="post__commentBar">
        <input
          className="post__input"
          placeholder="Add Comment..."
          onChange={(e) => setAddComment(e.target.value)}
        />
        {addComment ? (
          <button className="post__button" onClick={postComment}>Post</button>
        ) : (
          <button className={classes.postButton} disabled>
            Post
          </button>
        )}
      </form>
    </div>
  );
}

export default Post;
