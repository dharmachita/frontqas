import React from 'react'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
  width: '400px',
  height: '400px'
};

const Map=({lat, lng})=>{
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_API_MAP
  })

  const [map, setMap] = React.useState(null)
  
  const center = {
      lat: lat,
      lng: lng
  }

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={3}
        onLoad={onLoad}
        onUnmount={onUnmount}
        mapTypeId="satellite" 

      >
        { /* Child components, such as markers, info windows, etc. */ }
       <Marker
            position={center}
        />
      </GoogleMap>
  ) : <></>
}

export default React.memo(Map)