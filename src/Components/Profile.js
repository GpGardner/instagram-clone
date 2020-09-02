import React from 'react';
import {Input} from '@material-ui/core';
import './Profile.css'

function Profile() {
	return (
		<div className="container" >
			<div className="profile">
				<h4 className="profile__header">Please add an avatar photo</h4>
				<Input type="file" />
				</div>
		</div>
	)
}

export default Profile
