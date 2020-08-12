import React, { useState } from 'react'
import { Modal, Input, Button } from "@material-ui/core"
import { storage, db } from "../firebase"
import firebase from "firebase" 

function NewPost(props) {

	const {
    modalStyle,
		classes,
		user,
		openNewPost,
		setOpenNewPost,
  } = props;

	const [caption, setCaption] = useState('');
	const [image, setImage] = useState(null);
	const [progress, setProgress] = useState('');

	const handleChange = (e) => {
		if(e.target.files[0]) {
			setImage(e.target.files[0]);
		}
	}

	const handleSubmitPost = (e) => {
		e.preventDefault();
		const uploadTask = storage.ref(`images/${image.name}`).put(image)

		uploadTask.on("state_changed", (snapshot) => {
			//progress function ...
			const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
			setProgress(progress);
			},
			(error) => {
				console.error(error);
			},
			() => {
				storage
					.ref("images")
					.child(image.name)
					.getDownloadURL()
					.then(url => {
						//posting image in db
						db.collection("posts").add({
							timestamp: firebase.firestore.FieldValue.serverTimestamp(),
							caption: caption,
							imageUrl: url,
							username: user.displayName
						});
						setProgress(0);
						setCaption('');
						setImage(null);
						setOpenNewPost(false);
					})
			}
		)
  };

	return (
		<div>
			{console.log(user)}
			<Modal open={openNewPost} onClose={() => setOpenNewPost(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className="app__signup">
            <center>
              <img
								style={{display: 'block'}}
                className="app__headerImage"
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                alt="insta logo"
              />
            </center>
						<Input type="file" onChange={handleChange}/>
						<Input
              placeholder="Enter a caption"
              type="text"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            />
							{progress > 0 ? <progress value={progress} max="100"/> : null}
            <Button type="submit" onClick={handleSubmitPost}>
              Submit
            </Button>
          </form>
        </div>
      </Modal>
		</div>
	)
}

export default NewPost
