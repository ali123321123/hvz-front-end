import React, { useEffect, useState } from "react";
import Header from "../components/header/Header";
import LoginForm from "../components/login/LoginForm";
import Main from "../components/main/Main";

function LoginPage(props) {
  const [stateFromPopUp, setStateFromPopUp] = useState();
  useEffect(() => {
    if (props.location) {
      setStateFromPopUp(props.location.state);
      console.log("after set state");
    }
  }, []);
  console.log(props.location);
  return (
    <>
    <Header />
    <Main>
      <LoginForm gameId={stateFromPopUp}/>
    </Main>
    </>
  );
}

export default LoginPage;
