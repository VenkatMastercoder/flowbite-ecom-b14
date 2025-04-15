import React from "react";

import car from "../../assets/1.png";
import { beauty } from "../../assets/images";

import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const ImageComponent = () => {
  return (
    <div>
      <p>Image - React</p>
      {/* <img src={car} alt="car-images" />

      <img src={beauty} alt="car-cdn-images" /> */}

      <LazyLoadImage
        alt={beauty}
        effect="blur"
        wrapperProps={{
          // If you need to, you can tweak the effect transition using the wrapper style.
          style: { transitionDelay: "1s" },
        }}
        src={beauty}
      />
    </div>
  );
};

export default ImageComponent;
