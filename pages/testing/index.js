import React from "react";

const Index = () => {
  return (
    <div className="testing">
      <div className="mockups">
        {/* <div className="mockup-1"></div>
        <div className="mockup-2"></div>
        <div className="mockup-3"></div> */}
        {/* <div> */}
        <img src="https://media.giphy.com/media/ZYPdh6bDo8GgNvcR3w/source.gif"/>
        {/* <iframe src="https://giphy.com/embed/ZYPdh6bDo8GgNvcR3w" width="480"  frameBorder="0" class="giphy-embed" allowFullScreen></iframe> */}
        {/* </div> */}
      </div>
      <div className="cards">
        <div className="card-holder">
          <div className="card">
            <p>Available courses</p>
            <div>
              <p>React.Js</p>
              <p>Flutter</p>
              <p>Figma Design</p>
            </div>
          </div>
          <div className="card-back"></div>
        </div>
        <div className="card-holder">
          <div className="card-2"></div>
          <div className="card-back-2"></div>
        </div>
      </div>
      <div className="d-cards">
        <div className="card"></div>
        <div className="card"></div>
        <div className="card"></div>
      </div>
    </div>
  );
};

export default Index;
