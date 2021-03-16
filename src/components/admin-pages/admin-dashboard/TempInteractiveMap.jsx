import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Title from "./Title";

export default function Temp() {
  const useStyles = makeStyles({
    depositContext: {
      flex: 1,
    },
  });
  const classes = useStyles();
  return (
    <>
      <Title>Interactive Map</Title>
    </>
  );
}
