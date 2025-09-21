import React from "react";
import UserProfileCard from "./UserProfileCard";

function App() {
  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
      <UserProfileCard
        name="Raj surani"
        email="rajsurani039@gmail.com"
        profilePicture=""
        phone="+91 9974648768"
        address="Surat, India"
        bio="you think you know me !! think agin."
        joinedDate="September 2025"
      />
    </div>
  );
}

export default App;