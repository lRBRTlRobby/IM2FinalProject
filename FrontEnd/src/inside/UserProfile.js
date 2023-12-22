import React from "react";
import "./UserProfile.css";
import { useState } from "react";
import { useUser } from "../UserProvider";
import axios from "axios";
import NavBar from "../components/NavBar";
export default function UserProfile() {
  const { user } = useUser();
  const [defaultPass, setDefaultPass] = useState(user.password);
  const toggleEditPass = () => {
    if (document.getElementById("userprofile-input-password").disabled) {
      document.getElementById("userprofile-input-password").disabled = false;
      document.getElementById(
        "userprofile-input-password"
      ).style.backgroundColor = "#e6e6e6";
    } else {
      document.getElementById("userprofile-input-password").disabled = true;
      //   document.getElementById(
      //     "userprofile-input-password"
      //   ).style.backgroundColor = "#D9D9D9";
    }
  };
  const handleSavePassword = async () => {
    try {
      if (
        document.getElementById("userprofile-input-password").value ===
        user.password
      ) {
        alert("New password cannot be the same as the current password");
        return;
      }
      await axios.put(`http://localhost:5000/users/${user.userid}`, {
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        password: document.getElementById("userprofile-input-password").value,
      });
      alert("Password updated successfully");
      //   window.location.reload();
    } catch (error) {
      console.error("There was a problem with the Updated information:", error);
    }
  };
  return (
    <>
      <NavBar />
      <div className="userprofile-wrapper">
        <div className="userprofile-container">
          <h1 className="userprofile-title">User Profile</h1>
          <hr />
          <div className="row">
            <p>Firstname</p>
            <input className="info-box" value={user.firstname} readOnly></input>
          </div>
          <div className="row">
            <p>Lastname</p>
            <input className="info-box" value={user.lastname} readOnly></input>
          </div>
          <div className="row">
            <p>Email</p>
            <input className="info-box" value={user.email} readOnly></input>
          </div>
          <div className="row">
            <p>Password</p>
            <input
              id="userprofile-input-password"
              className="info-box"
              value={defaultPass}
              type="password"
              onChange={(e) => setDefaultPass(e.target.value)}
              disabled
            ></input>
            <img
              className="userprofile-changebtn"
              src="/images/editbtn.png"
              title="Change Password?"
              alt="Change Password"
              onClick={toggleEditPass}
            ></img>
          </div>
          <div className="row">
            <br />
            <hr />
            <button className="savebtn" onClick={handleSavePassword}>
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
