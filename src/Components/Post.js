import React, { useState, useEffect } from "react";
import "./Post.css";

import { Input, Avatar, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined';
import firebase from "firebase";
import { db } from "../firebase";

const useStyles = makeStyles((theme) => ({
  postButton: {
    color: "#6082a3",
  },
}));

function Post(props) {
  const { imageUrl, username, caption, postId, user } = props;
  const classes = useStyles();

  const [comments, setComments] = useState([]);
  const [addComment, setAddComment] = useState("");
  const [postLiked, setPostLiked] = useState(false);

  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy("timestamp", "asc")
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

    db.collection("posts").doc(postId).collection("comments").add({
      text: addComment,
      username: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setAddComment("");
    console.log("this does run");
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
      <div className="post__icons">
        {postLiked ? (
          <FavoriteIcon
            className="post__icon"
            onClick={() => setPostLiked(false)}
            style={{ color: 'red' }}
          />
        ) : (
          <FavoriteBorderIcon
            className="post__icon"
            onClick={() => setPostLiked(true)}
          />
        )}
        <ChatBubbleOutlineIcon className="post__icon"/>
        <ShareOutlinedIcon className="post__icon" />
      </div>
      <h4 className="post__text">
        <span className="post__username">{username} </span> {caption}
      </h4>
      {comments.map((comment) => (
        <p key={comment.timestamp} className="post__comments">
          <span className="post__username">{comment.username}</span>{" "}
          {comment.text}
        </p>
      ))}

      <form className="post__commentBar" onSubmit={postComment}>
        <Input
          className="post__input"
          placeholder="Add Comment..."
          value={addComment}
          onChange={(e) => setAddComment(e.target.value)}
        />
        {addComment ? (
          <Button className="post__button" onClick={postComment}>
            Post
          </Button>
        ) : (
          <Button className={classes.postButton} disabled>
            Post
          </Button>
        )}
      </form>
    </div>
  );
}

export default Post;
