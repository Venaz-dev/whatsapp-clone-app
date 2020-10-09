import React from "react";
import loader from "../../public/assets/icons/loading.svg";

const Spinner = () => {
  return (
    <div className="spinner-container">
      {/* <img src={loader} /> */}
      <div className="contact-loading">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
};

export default Spinner;
