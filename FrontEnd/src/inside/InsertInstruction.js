import React, { useEffect, useState } from "react";
import "./InsertInstruction.css";
import NavBar from "../components/NavBar";
import { useUser } from "../UserProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function InsertInstruction() {
  const { recipe } = useUser();
  const navigate = useNavigate();
  console.log("Recipe: ", recipe);
  const handleInsert = () => {
    const stepnumber = document.getElementById("stepnumber").value;
    const description = document.getElementById("description").value;
    const resID = recipe.id ? recipe.id : recipe.recipe_id;
    if (stepnumber === "" || description === "") {
      alert("Please fill all the fields");
      return;
    }
    axios
      .post("http://localhost:5000/recipe/instructions", {
        recipeid: resID,
        stepnum: stepnumber,
        description: description,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    const confirmMore = window.confirm(
      "INSTRUCTION WAS ADDED. Do you want to add more?"
    );
    if (confirmMore) {
      window.location.reload();
    } else {
      alert("RECIPE CREATED. NOW REDIRECTING TO HOME PAGE");
      setTimeout(() => {
        navigate("/home");
      }, 1500);
    }
  };

  const [instructions, setInstructions] = useState([]);

  useEffect(() => {
    const resID = recipe.id ? recipe.id : recipe.recipe_id;
    axios
      .get(`http://localhost:5000/recipes/instructions/${resID}`)
      .then((response) => {
        const data = response.data;
        console.log("Response", data);
        // const instruction = data.find((instruction) => instruction.instruction_id == recipe.instructionId);
        setInstructions(data);
        console.log("Response Instructions", data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <NavBar />
      <div className="insertinstruction-body">
        <div className="insertinstruction-mid">
          <div className="insertinstruction-form-container">
            <h1 className="insertinstruction-title">Insert an Instruction</h1>
            <hr className="insertinstruction-hr" />
            <div className="insertinstruction-line">
              <div className="insertinstruction-line">
                <p>Step Number</p>
                <input
                  type="number"
                  className="insertinstruction-input"
                  id="stepnumber"
                  value={instructions.length + 1}
                  disabled
                />
              </div>
              <div className="insertinstruction-line">
                <p>Description</p>
                <textarea
                  type="text"
                  className="insertinstruction-inputt"
                  id="description"
                />
              </div>
            </div>
            <hr className="insertinstruction-hr" />
            <button className="insertinstruction-button" onClick={handleInsert}>
              Add Instruction
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
