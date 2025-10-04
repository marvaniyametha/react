import React from "react";
import UserProfileCard from "./UserProfileCard";

function App() {
  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
      <UserProfileCard
        name="metha marvaniya"
        email="methamarvaniya07@gmail.com"
        profilePicture="public/mee.jpg"
        phone="+91 9879675006"
        address="Surat, India"
        bio="heart of code, soul of design."
        joinedDate="September 2025"
      />
    </div>
  );
}

export default App;