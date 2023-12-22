import * as React from "react";
import TextField from "@mui/material/TextField";

export default function InputBox(props) {
  return (
    <>
      <TextField
        id={props.idname}
        label={props.inputname}
        variant="filled"
        sx={{ backgroundColor: "white", margin: "10px" }}
        type={props.inputtype}
      />
    </>
  );
}
