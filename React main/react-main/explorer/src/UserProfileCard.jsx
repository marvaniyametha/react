import React from "react";
import "./UserProfileCard.css";

function UserProfileCard({
  name,
  email,
  profilePicture,
  phone,
  address,
  bio,
  joinedDate,
}) {
  return (
    <div className="profile-container">
      <div className="profile-card glass">
        <div className="profile-img-wrapper">
          <img
            src={profilePicture || "me.JPG "}
            alt="Profile"
            className="profile-img"
          />
        </div>

        <h2 className="profile-name">{name}</h2>
        <p className="profile-email">{email}</p>

        <div className="profile-info">
          <p><span>📞</span> {phone}</p>
          <p><span>📍</span> {address}</p>
          <p className="bio">“{bio}”</p>
          <p className="joined">Joined: {joinedDate}</p>
        </div>
      </div>
    </div>
  );
}

export default UserProfileCard;
