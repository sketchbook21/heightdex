import React from "react";
import InfoIcon from "../icons/InfoIcon";

const Footer = () => {
  return (
    <div className="d-flex footer mt-auto py-3 px-3 bg-dark justify-content-between">
      HeightDex
      <div className="align-self-center mr-2 finger">
        <InfoIcon />
      </div>
    </div>
  );
};

export default Footer;
