import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import "./ComponentStyle.css";
import { Link } from "react-router-dom";
import axios from "axios";
export default function RecipeCard(props) {
  // const handleDelete = () => {
  //   axios
  //     .delete(`http://localhost:5000/recipes/${props.eventid}`)
  //     .then((response) => {
  //       console.log(response.data);
  //       alert("Recipe deleted successfully!");
  //       setTimeout(() => {
  //         window.location.reload();
  //       }, 1000);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  const handleDelete = () => {
    axios
      .delete(`http://localhost:5000/recipes/delete/${props.eventid}`)
      .then((response) => {
        console.log(response.data);
        alert("Recipe deleted successfully!");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  console.log("props: ", props);
  return (
    <Card
      sx={{
        maxWidth: 345,
        margin: "10px",
        backgroundColor: "#FFE1A6",
      }}
    >
      <button
        className="deletebtn"
        title="delete recipe?"
        onClick={handleDelete}
      >
        X
      </button>
      <div>
        <CardHeader title={props.recipename} sx={{ textAlign: "center" }} />
        <CardMedia
          component="img"
          height="194"
          image="/images/img.png"
          alt="Paella dish"
        />
        <CardContent>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ textAlign: "center" }}
          >
            {props.description}
          </Typography>
        </CardContent>
        <div className="viewbtn-container" style={{ textAlign: "center" }}>
          <Link to={`/DisplayRecipe/${props.eventid}`}>
            <button className="viewbtn" style={{ margin: "10px" }}>
              View
            </button>
          </Link>
        </div>
      </div>
    </Card>
  );
}
