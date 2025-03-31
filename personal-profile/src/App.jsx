import React from "react";
import PersonalProfileCard from "./PersonalProfileCard";

function App() {
  return (
    <div>
      <h1>My Profile</h1>
      <PersonalProfileCard
        name="Dharmik Gohil"
        photo="https://via.placeholder.com/150"
        bio="A passionate full-stack developer."
      />
    </div>
  );
}

export default App;
