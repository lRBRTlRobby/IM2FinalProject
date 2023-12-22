import React from "react";
import NavBar from "../components/NavBar";
import "./CreateRecipe.css";
import { useUser } from "../UserProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function CreateRecipe() {
  const { user, holdRecipe } = useUser();
  const navigate = useNavigate();
  const handleCreate = () => {
    const name = document.getElementById("name").value;
    const category = document.getElementById("category").value;
    const description = document.getElementById("description").value;
    const cooktime = document.getElementById("cookingtime").value;
    const servings = document.getElementById("servings").value;
    if (
      name === "" ||
      category === "" ||
      description === "" ||
      cooktime === "" ||
      servings === ""
    ) {
      alert("Please fill all the fields");
      return;
    }
    axios
      .post("http://localhost:5000/recipes", {
        user_id: user.userid,
        category: category,
        Title: name,
        Description: description,
        CookingTime: cooktime,
        Servings: servings,
        ImgSrc: "/images/img.png",
      })
      .then((response) => {
        console.log(response.data);
        holdRecipe(response.data);
        alert(
          "Recipe created successfully, You shall now input the ingredients needed for your Recipe"
        );
        setTimeout(() => {
          navigate("/InsertIngredient");
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <NavBar />
      <div className="createrecipe-body">
        <div className="createrecipe-container">
          <h1 className="createrecipe-title">Create Recipe</h1>
          <hr />
          <div className="createrecipe-form-container">
            <p className="createrecipe-label">Recipe Name</p>
            <input
              type="text"
              className="createrecipe-input"
              placeholder="Add Name"
              id="name"
            />
            <p className="createrecipe-label">Category</p>
            <input
              type="text"
              className="createrecipe-input"
              placeholder="Add Category"
              id="category"
            />
            <p className="createrecipe-label">Description</p>
            <textarea
              className="createrecipe-textarea"
              id="description"
              placeholder="Add Description about the dish"
            ></textarea>
            <div className="createrecipe-input-two">
              <div>
                <p className="createrecipe-label">Cooking Time (minutes)</p>
                <input
                  type="number"
                  className="createrecipe-inputt"
                  id="cookingtime"
                />
              </div>
              <div>
                <p className="createrecipe-label">Servings (per person)</p>
                <input
                  type="number"
                  className="createrecipe-inputt"
                  id="servings"
                />
              </div>
            </div>
            <hr />
            <button
              className="createrecipe-button"
              onClick={() => handleCreate()}
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
