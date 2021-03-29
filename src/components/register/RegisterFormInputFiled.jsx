import { Input, Tooltip } from "@material-ui/core";
import React from "react";

function RegisterFormInputFiled({ title, type, value, handleFunction }) {
  return (
    <Tooltip title={title} aria-label={title}>
      <Input
        type={type}
        value={value}
        id={`${title}Id`}
        aria-describedby={title}
        placeholder={title}
        onChange={handleFunction}
      />
    </Tooltip>
  );
}

export default RegisterFormInputFiled;
