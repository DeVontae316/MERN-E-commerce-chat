import React, { useState } from "react";

const Input = ({ onChange }) => {
  return <input onChange={onChange} type="text" placeholder="name" />;
};

export default Input;
