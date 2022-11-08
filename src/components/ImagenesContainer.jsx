import React from 'react';
import SimpleImageSlider from "react-simple-image-slider";

const ImagenesContainer = ({url}) => {
    return ( 
        <div>
            <SimpleImageSlider
                width={400}
                height={269}
                images={url}
                showBullets={true}
                showNavs={true}
            />
        </div>
     );
}
 
export default ImagenesContainer;



