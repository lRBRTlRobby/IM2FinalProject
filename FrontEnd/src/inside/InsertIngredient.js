import React from "react";
import NavBar from "../components/NavBar";
import { useUser } from "../UserProvider";
import { useEffect } from "react";
import "./InsertIngredient.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function InsertIngredient() {
  const { recipe } = useUser();
  const navigate = useNavigate();
  console.log("Recipe: ", recipe);
  const handleInsert = () => {
    const name = document.getElementById("ingredientname").value;
    const quantity = document.getElementById("quantity").value;
    const measurement = document.getElementById("measurement").value;
    const resID = recipe.id ? recipe.id : recipe.recipe_id;
    if (name === "" || quantity === "" || measurement === "") {
      alert("Please fill all the fields");
      return;
    }
    axios
      .post("http://localhost:5000/recipe/ingredients", {
        recipeid: resID,
        name: name,
        quantity: quantity,
        measurement: measurement,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    const confirmMore = window.confirm(
      "INGREDIENT WAS ADDED. Do you want to add more?"
    );
    if (confirmMore) {
      window.location.reload();
    } else {
      alert("Now Redirecting to Insert Instructions page");
      setTimeout(() => {
        navigate("/InsertInstruction");
      }, 1500);
    }
  };
  return (
    <>
      <div className="insertingredient-body">
        <NavBar />
        <div className="insertingredient-mid">
          <div className="insertingredient-container">
            <h1 className="insertingredient-title">Insert an Ingredient</h1>
            <hr className="insertingredient-hr" />
            <div className="insertingredient-form-container">
              <p className="insertingredient-label">Ingredient Name</p>
              <input
                type="text"
                className="insertingredient-input"
                placeholder="Name of Ingredient"
                id="ingredientname"
              ></input>
              <div className="insertingredient-input-twor">
                <div>
                  <p className="insertingredient-label">Quantity</p>
                  <input
                    type="number"
                    className="insertingredient-inputt"
                    id="quantity"
                  ></input>
                </div>
                <div>
                  <p className="insertingredient-label">Measurement</p>
                  <input
                    type="text"
                    className="insertingredient-inputtt"
                    id="measurement"
                  ></input>
                </div>
              </div>
              <hr className="insertingredient-hr" />
              <button
                className="insertingredient-button"
                onClick={handleInsert}
              >
                Insert
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
