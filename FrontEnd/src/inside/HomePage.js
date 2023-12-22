import React from "react";
import { useUser } from "../UserProvider";
import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import "./HomePage.css";
export default function HomePage() {
  const { user } = useUser();
  useEffect(() => {
    console.log(user);
  });
  return (
    <>
      <NavBar />
      <div className="homepage">
        <div className="content">
          <div>
            <h1 className="title">Hello {user.firstname}</h1>
            <h3 className="description">
              Welcome to LetMeCook, a culinary sanctuary for those who believe
              in the magic of the kitchen. Discover a world where recipes come
              to life, and each dish tells a unique tale. LetHimCook is your
              guide to turning everyday ingredients into extraordinary stories
              on your plate.
            </h3>
          </div>
          <img src="/images/homepicture.png" className="homepicture" />
        </div>
      </div>
    </>
  );
}
