import React, { useState, useEffect } from "react";
import "./App.css";
import Post from "./Post";
import SignUp from "./Components/SignUp";
import Login from "./Components/Login";
import NewPost from "./Components/NewPost";
import { db, auth, storage } from "./firebase";

import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

function App() {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [posts, setPosts] = useState([]);
  const [openLogin, setOpenLogin] = useState(false);
  const [openSignUp, setOpenSignUp] = useState(false);
  const [openNewPost, setOpenNewPost] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });

    return () => {
      //perform cleanup actions
      unsubscribe();
    };
  }, [user, username]);

  useEffect(() => {
    db.collection("posts").orderBy('timestamp', 'desc').onSnapshot((snapshot) =>
      setPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          post: doc.data(),
        }))
      )
    );
  }, []);

  const handleSignUp = (e) => {
    e.preventDefault();

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username,
        });
      })
      .catch((error) => alert(error.message));

    setEmail("");
    setUsername("");
    setPassword("");
    setOpenSignUp(false);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message));

    setEmail("");
    setPassword("");
    setOpenLogin(false);
  };

  return (
    
    <div className="app">
      {console.log(user)}
      <SignUp
        openSignUp={openSignUp}
        setOpenSignUp={setOpenSignUp}
        modalStyle={modalStyle}
        classes={classes}
        email={email}
        setEmail={setEmail}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        handleSignUp={handleSignUp}
      />

      <Login
        openLogin={openLogin}
        setOpenLogin={setOpenLogin}
        modalStyle={modalStyle}
        classes={classes}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        handleLogin={handleLogin}
      />

      <NewPost
        user={user}
        openNewPost={openNewPost}
        setOpenNewPost={setOpenNewPost}
        modalStyle={modalStyle}
        classes={classes}
      />

      {/* using bem convention */}
      <div className="app__header">
        <img
          className="app__headerImage"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt="insta logo"
        />
        {user ? (
          <div className="app__loggedInContainer">
            <Button onClick={() => setOpenNewPost(true)}>New Post</Button>
            <Button onClick={() => auth.signOut()}>Log Out</Button>
          </div>
        ) : (
          <div className="loginContainer">
            <Button onClick={() => setOpenSignUp(true)}>Sign Up</Button>
            <Button onClick={() => setOpenLogin(true)}>Login</Button>
          </div>
        )}
      </div>
      {/* Header */}
      <center>
        {posts.map(({ id, post }) => (
          <Post
            key={id}
            username={post.username}
            caption={post.caption}
            imageUrl={post.imageUrl}
          />
        ))}
      </center>
      {/* Posts */}

      {/* Comments */}
    </div>
  );
}

export default App;
