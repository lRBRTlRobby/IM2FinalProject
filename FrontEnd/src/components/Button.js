import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

export default function ButtonComp(props) {
  return (
    <>
      <Button
        variant="contained"
        sx={{ margin: "10px", width: "218px" }}
        onClick={props.click}
      >
        {props.buttonname}
      </Button>
    </>
  );
}
