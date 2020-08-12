import React from "react";
import { Modal, Input, Button } from "@material-ui/core";

function Login(props) {
  const {
    modalStyle,
    classes,
    openLogin,
    setOpenLogin,
    email,
    setEmail,
    password,
    setPassword,
    handleLogin,
  } = props;

  return (
    <div>
      <Modal open={openLogin} onClose={() => setOpenLogin(false)}>
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
              placeholder="Password"
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" onClick={handleLogin}>
              Submit
            </Button>
          </form>
        </div>
      </Modal>
    </div>
  );
}

export default Login;
