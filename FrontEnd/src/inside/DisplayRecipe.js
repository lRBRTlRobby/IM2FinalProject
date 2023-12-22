import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import { Button, Container, Grid } from '@mui/material'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'

export default function DisplayRecipe() {
  const recipe_id = useParams();


  const [recipes, setRecipes] = useState([]);
  const [instructions, setInstructions] = useState([]);
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/recipes/${recipe_id.recipeId}`)
      .then((response) => {
        setRecipes(response.data);
        console.log("Response", response.data);
        console.log("RecipeId: ", recipe_id.recipeId);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/recipes/instructions/${recipe_id.recipeId}`)
      .then((response) => {
        setInstructions(response.data);
        console.log("Response Instructions", response.data);
        console.log("RecipeId: ", recipe_id.recipeId);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/recipes/ingredients/${recipe_id.recipeId}`)
      .then((response) => {
        setIngredients(response.data);
        console.log("Response Ingredients", response.data);
        console.log("RecipeId: ", recipe_id.recipeId);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);



  return (
    <div style={{}}>
      <NavBar />
      <br />
      <Container maxWidth="xl" >
        <Grid container >

          <Grid container >
            <Grid item xs={5.545} sx={{ textAlign: 'center', backgroundImage: "url('/images/display.jpg')", backgroundSize: 'cover', backgroundPositionX: 'center', backgroundPositionY: 'center', borderRadius: 10 }}>
              {/* <h1>IMAGE</h1> */}
            </Grid>
            <Grid item xs={.1} >
            </Grid>
            <Grid item xs={5.545} sx={{ backgroundColor: "#f9d8ba", borderRadius: 10, color: "#424242" }}>
              <div style={{ paddingLeft: 20 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>

                  <h2 style={{ color: '#795548', marginBottom: "0rem" }}>RECIPE</h2>
                  <Link to={`/EditRecipe/${recipe_id.recipeId}`}><Button variant="contained" sx={{ margin: "10px", marginRight: "2rem" }}>EDIT</Button></Link>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <hr style={{ margin: '10px 0', borderColor: 'black', width: '100%', marginLeft: "auto", marginRight: "1rem" }} />
                </div>


                <div style={{ marginTop: "30px" }}>
                  <p style={{ fontSize: 20 }}><b>Title: </b>{recipes.recipe_title}</p>
                  <p style={{ fontSize: 20 }}><b>Description: </b>{recipes.recipe_description}</p>
                  <p style={{ fontSize: 20 }}><b>Category: </b>{recipes.category}</p>
                  <p style={{ fontSize: 20 }}><b>Cooking Time: </b>{recipes.cooking_time}</p>
                  <p style={{ fontSize: 20 }}><b>Servings: </b>{recipes.servings}</p>
                </div>

                <div style={{ paddingLeft: 20 }}>
                  <h3 style={{ marginTop: "3rem", marginBottom: "0rem", color: '#795548' }}>INGREDIENTS</h3>
                  <div >
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <hr style={{ margin: '10px 0', borderColor: 'black', width: '100%', marginLeft: "auto", marginRight: "3.5rem" }} />
                    </div>
                    {ingredients.map((ingredient, index) => (
                      <div key={index} style={{ padding: 1, textAlign: "left" }}>
                        <p><b>Ingredient {index + 1}:</b> {ingredient.ingredient_name}  </p>
                        <p><b>Quantity:</b> {ingredient.ingredient_quantity}</p>
                        <p><b>Measurement:</b> {ingredient.ingredient_measurement}</p>
                      </div>
                    ))}
                  </div>

                  <div style={{ marginBottom: "2rem" }}>
                    <h3 style={{ marginTop: "3rem", marginBottom: "0rem", color: '#795548' }}>STEPS</h3>
                    <div >
                      <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <hr style={{ margin: '10px 0', borderColor: 'black', width: '100%', marginLeft: "auto", marginRight: "3.5rem" }} />
                      </div>

                      {instructions.map((instruction, index) => (
                        <div key={index} style={{paddingRight: 55}}>
                          <p><b>Step {instruction.step_number}:</b> {instruction.step_instruction}</p>
                        </div>
                      ))}

                    </div>

                  </div>

                </div>

              </div>
            </Grid>
          </Grid>
        </Grid>
      </Container>
      <br />
    </div>
  )
}
