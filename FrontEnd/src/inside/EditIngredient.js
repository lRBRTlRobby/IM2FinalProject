import { Button, Container, Grid, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import NavBar from '../components/NavBar';

export default function EditIngredient() {
    const ingreId = useParams();
    const [ingredients, setIngredients] = useState([]);

    useEffect(() => {
        axios
            .get(`http://localhost:5000/recipes/ingredients/${ingreId.recipeId}`)
            .then((response) => {
                const data = response.data;
                console.log("Response", data);
                const ingredient = data.find((ingredient) => ingredient.ingredient_id == ingreId.ingredientId);
                setIngredients(ingredient);
                console.log("Response Ingredients", ingredient);
                console.log("RecipeId: ", ingreId.recipeId);
                console.log("IngreId: ", ingreId.ingredientId);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const [formData, setFormData] = useState({
        measurement: '',
        name: '',
        quantity: '',
        recipe_id: '',

    });

    useEffect(() => {
        setFormData({
            recipe_id: ingreId.recipeId || '',
            name: ingredients.ingredient_name || '',
            quantity: ingredients.ingredient_quantity || '',
            measurement: ingredients.ingredient_measurement || '',
        });
    }, [ingredients]);

    console.log("FormData: ", formData);

    // const handleTextChange = (field, value) => {
    //     setFormData((prevData) => ({
    //         ...prevData,
    //         [`ingredient_${field}`]: value,
    //     }));
    // }

    const handleTextChange = (field, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    }


    const handleUpdateProfile = async () => {
        try {

            const response = await axios.put(`http://localhost:5000/recipes/ingredients/${ingredients.ingredient_id}`, formData);

            alert('Ingredients updated successfully!');
            window.location.reload();
        } catch (error) {
            console.error('Error updating user profile:', error);
        }
    };

    console.log("Ingredients: ", ingredients.ingredient_id);

    return (
        <>
            <NavBar />
            <br />
            <Container maxWidth="md">
                {/* <h1>{ingredients.ingredient_name}</h1> */}
                <Grid container sx={{ border: '1px solid black', backgroundColor: "#F0D1C8", borderRadius: '10px' }}>

                    <Grid container sx={{ border: '1px solid black', padding: '10px', margin: '20px' }}>
                        <Grid item xs={12}>
                            <div >
                                <h1 style={{ textAlign: 'center', textTransform: 'uppercase' }}>{ingredients.ingredient_name}</h1>
                            </div>
                            <div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginLeft: '10rem', marginRight: '10rem' }}>
                                    <h3>Quantity:</h3>
                                    <TextField
                                        id="quantity"
                                        label={ingredients.ingredient_quantity ? '' : 'Quantity'}
                                        value={formData.quantity}
                                        onChange={(e) => handleTextChange('quantity', e.target.value)}
                                        variant="outlined"
                                    />
                                </div>

                                <div style={{ display: 'flex', justifyContent: 'space-between', marginLeft: '10rem', marginRight: '10rem' }}>
                                    <h3>Measurement:</h3>
                                    <TextField
                                        id="measurement"
                                        label={ingredients.ingredient_measurement ? '' : 'Measurement'}
                                        value={formData.measurement}
                                        onChange={(e) => handleTextChange('measurement', e.target.value)}
                                        variant="outlined"
                                    />
                                </div>

                            </div>
                            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                                <Button variant="contained" onClick={handleUpdateProfile} >Update Ingredient</Button>
                            </div>

                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}
