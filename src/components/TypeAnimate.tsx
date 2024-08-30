"use client";

import React, { useState } from "react";
import { TypeAnimation } from "react-type-animation";

const TypeAnimate = () => {
  return (
    <TypeAnimation
      preRenderFirstString={true}
      sequence={["M", 1000, "Monye", 1000, "MonyeType.", 1000]}
      speed={50}
      style={{ fontSize: "2em" }}
    />
  );
};

export default TypeAnimate;
