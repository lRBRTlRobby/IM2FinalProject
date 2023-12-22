import { Button, Container, Grid, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import NavBar from '../components/NavBar';

export default function EditInstruction() {
    const ingreId = useParams();
    const [instructions, setInstructions] = useState([]);

    useEffect(() => {
        axios
            .get(`http://localhost:5000/recipes/instructions/${ingreId.recipeId}`)
            .then((response) => {
                const data = response.data;
                console.log("Response", data);
                const instruction = data.find((instruction) => instruction.instruction_id == ingreId.instructionId);
                setInstructions(instruction);
                console.log("Response Instructions", instruction);
                console.log("RecipeId: ", ingreId.recipeId);
                console.log("IngreId: ", ingreId.instructionId);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const [formData, setFormData] = useState({
        description: '',
        recipe_id: '',
        stepnum: '',

    });

    useEffect(() => {
        setFormData({
            description: instructions.step_instruction || '',
            recipe_id: ingreId.recipeId || '',
            stepnum: instructions.step_number || '',
        });
    }, [instructions]);

    console.log("FormData: ", formData);
    console.log("RecipeId: ", ingreId.recipeId);

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

            const response = await axios.put(`http://localhost:5000/recipes/instructions/${instructions.instruction_id}`, formData);

            alert('Instructions updated successfully!');
            window.location.reload();
        } catch (error) {
            console.error('Error updating user profile:', error);
        }
    };

    console.log("Instructions: ", instructions.instruction_id);

    // const handleUpdateProfile = async () => {
    //     try {

    //         const response = await axios.put(`http://localhost:5000/recipes/ingredients/${ingredients.ingredient_id}`, {
    //             recipe_id: formData.recipe_id,
    //             name: formData.name,
    //             quantity: formData.quantity,
    //             measurement: formData.measurement,
    //         });

    //         alert('Profile updated successfully!');
    //     } catch (error) {
    //         console.error('Error updating user profile:', error);
    //     }
    // };

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
                                <h1 style={{ textAlign: 'center', textTransform: 'uppercase' }}>INSTRUCTION</h1>
                            </div>
                            <div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginLeft: '2rem', marginRight: '2rem' }}>
                                    <h3>{instructions.step_number}: &nbsp;</h3>
                                    <TextField
                                        id="description"
                                        label={instructions.step_instruction ? '' : 'Quantity'}
                                        value={formData.description}
                                        onChange={(e) => handleTextChange('description', e.target.value)}
                                        variant="outlined"
                                        sx={{ width: '100%' }}
                                    />
                                </div>

                            </div>
                            <div style={{ display: 'flex', justifyContent: 'center', }}>
                                <Button variant="contained" onClick={handleUpdateProfile} >Update Instruction</Button>
                            </div>

                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}
