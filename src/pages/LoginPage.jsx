import React, { useEffect, useState } from "react";
import Header from "../components/header/Header";
import LoginForm from "../components/login/LoginForm";
import Main from "../components/main/Main";

function LoginPage(props) {
  const [stateFromPopUp, setStateFromPopUp] = useState();
  useEffect(() => {
    if (props.location) {
      setStateFromPopUp(props.location.state);
    }
  }, []);
  return (
    <>
    <Header />
    <Main>
      <LoginForm game={stateFromPopUp}/>
    </Main>
    </>
  );
}

export default LoginPage;
