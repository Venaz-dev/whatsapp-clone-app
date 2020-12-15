import React, { useRef, useState, useEffect } from "react";
import rightArrow from "../../public/assets/icons/right_arrow.svg";
import leftArrow from "../../public/assets/icons/left_arrow.svg";
import closeIcon from "../../public/assets/icons/close_white.svg";
import store from "../../store/store";
import { useProxy } from "valtio";

const ImageSlider = () => {
  const snapshot = useProxy(store);
  const images = snapshot.gallery;
  const counterMax = images.length - 1;
  const sliderRef = useRef();
  const [counter, setCounter] = useState(0);
  const [slideImages, setImages] = useState([])

  const navigate = () => {
    sliderRef.current.style.transform = `translateX(-${snapshot.sliderCounter}00vw)`;
  };

  const addCount = () => {
    if (snapshot.sliderCounter === counterMax) {
      store.sliderCounter = 0;
      return;
    }
    ++store.sliderCounter;
  };

  const subCount = () => {
    if (snapshot.sliderCounter === 0) {
      store.sliderCounter = counterMax;
      return;
    }
    --store.sliderCounter;
  };

  //   const handleGesture = () => {
  //     if (touchendX < touchstartX) {
  //       addCount()
  //       console.log("swiped left");
  //     }
  //     if (touchendX > touchstartX) {
  //       subCount()
  //       console.log("swiped right");
  //     }
  //   };

  useEffect(() => {
    navigate();
  }, [snapshot.sliderCounter]);

  // useEffect(() => {
  //   const slides = images.filter(img => img.type !== "text")
  //   setImages(slides)
  // }, [])

  return (
    <div className="image-slider">
      <div className="image-holder" ref={sliderRef}>
        {/* {slideImages.map((image, i) => ( */}
          <div className="image">
            <img src={images} />
          </div>
        {/* ))} */}
      </div>
      {/* <button className="right-arrow" onClick={addCount}>
        <img src={rightArrow} />
      </button> */}
      {/* <button className="left-arrow" onClick={subCount}>
        <img src={leftArrow} />
      </button> */}
      <span
        className="close"
        onClick={() => {
          store.slider = false;
          store.sliderCounter = 0;
        }}
      >
        <img src={closeIcon} />
      </span>
      {/* <div className="image-dots">
        {slideImages.map((img, index) => (
          <button
            key={index}
            className={`dot ${
              snapshot.sliderCounter === index ? "active" : null
            }`}
            onClick={() => (store.sliderCounter = index)}
          />
        ))}
      </div> */}
    </div>
  );
};

export default ImageSlider;
