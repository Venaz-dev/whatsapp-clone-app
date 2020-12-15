import React, { useEffect } from "react";
import store from "../store/store";
import { useProxy } from "valtio";
import Loader from "./spinner/loader";
import ImageSlider from "./image/imageSlider"

const Layout = ({ children }) => {
  const snapshot = useProxy(store);

  useEffect(() => {
   
  }, [])
  
  return (
    <div>
        {/* <Loader /> */}
      <div>{children} </div>
      {snapshot.loading && <Loader />}
      {snapshot.slider && <ImageSlider/>}
    </div>
  );
};

export default Layout;
