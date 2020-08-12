import React from "react";
import { Modal, Input, Button } from "@material-ui/core";

function SignUp(props) {
  const {
    modalStyle,
    classes,
    openSignUp,
    setOpenSignUp,
    email,
    setEmail,
    username,
    setUsername,
    password,
    setPassword,
    handleSignUp,
  } = props;

  return (
    <div>
      <Modal open={openSignUp} onClose={() => setOpenSignUp(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className="app__signup">
            <center>
              <img
                className="app__headerImage"
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                alt="insta logo"
              />
            </center>
            <Input
              placeholder="Email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="Username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              placeholder="Password"
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" onClick={handleSignUp}>
              Submit
            </Button>
          </form>
        </div>
      </Modal>
    </div>
  );
}

export default SignUp;
