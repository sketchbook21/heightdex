import React from "react";
import InfoIcon from "../icons/InfoIcon";

const Footer = () => {
  return (
    <div className="d-flex footer justify-content-between py-3 bg-dark">
      <span className="invisible">a</span>
      HeightDex
      <div className="align-self-center finger">
        <InfoIcon />
      </div>
    </div>
  );
};

export default Footer;
