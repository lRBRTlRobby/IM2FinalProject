import { Button } from "@mui/material";
import InputBox from "../components/InputBox";
import "./App.css";
import ButtonComp from "../components/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { useState, useEffect } from "react";
function UserRegister() {
  const navigate = useNavigate();
  // const [users, setUsers] = useState([]);
  // useEffect(() => {}, []);

  const signup = async () => {
    try {
      const response = await axios.get("http://localhost:5000/users");
      const users = response.data;
      console.log(users);

      const firstname = document.getElementById("firstname").value;
      const lastname = document.getElementById("lastname").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      if (users.some((user) => user.email === email)) {
        alert("Email already exists");
        return;
      } else if (
        firstname === "" ||
        lastname === "" ||
        email === "" ||
        password === ""
      ) {
        alert("Please fill all the fields");
        return;
      } else {
        await axios.post("http://localhost:5000/users", {
          firstname: firstname,
          lastname: lastname,
          password: password,
          email: email,
        });
        console.log("Registration successful:");
        // Redirect or show a success message as needed
        alert("Registration successful");
        navigate("/");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      // Handle registration failure, show error message, etc.
    }
  };

  return (
    <>
      <div className="container">
        <div className="flexcenter">
          <div className="box">
            <img src="./images/appname.png" className="logo" />
            <br />
            <InputBox
              idname="firstname"
              inputname="Firstname"
              inputtype="text"
            />
            <br />
            <InputBox idname="lastname" inputname="Lastname" inputtype="text" />
            <br />
            <InputBox idname="email" inputname="Email" inputtype="text" />
            <br />
            <InputBox
              idname="password"
              inputname="Password"
              inputtype="password"
            />
            <br />
            <button className="create" onClick={() => navigate("/")}>
              Login
            </button>
            <br />
            <ButtonComp buttonname="Register" click={signup} />
            <br />
          </div>
        </div>
      </div>
    </>
  );
}

export default UserRegister;
