import React from "react";
import loader from "../../public/assets/icons/loading.svg";

const Loader = () => {
  return (
    <div className="spinner-container">
      <img src={loader} />
    </div>
  );
};

export default Loader;
