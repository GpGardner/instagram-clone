import React, { useState, useEffect } from "react";
import "./Post.css";
import { Input, Avatar, Button } from "@material-ui/core";
import { db } from "./firebase";

function Post(props) {
  const { imageUrl, username, caption, postId } = props;

  const [comments, setComments] = useState({});
  const [addComment, setAddComment] = useState("");

  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }
    return () => {
      unsubscribe();
    };
  }, [postId]);

  const postCommet = (e) => {};

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

      <form className="post__commentBar">
        <Input
          className="post__input"
          placeholder="Add Comment..."
          onChange={(e) => setAddComment(e.target.value)}
        />
        {addComment ? (
          <Button className="post__button">Post</Button>
        ) : (
          <Button className="post__button" disabled>
            Post
          </Button>
        )}
      </form>
    </div>
  );
}

export default Post;
