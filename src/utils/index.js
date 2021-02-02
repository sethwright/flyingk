import axios from "axios";

export const getMarkers = async () => {
  const { data: locations } = await axios.get("/api/locations"); // ES6 destructuring & aliasing
  const markers = locations.map((location) => ({
    position: {
      lat: location.latitude,
      lng: location.longitude,
    },
    key: location.name,
    defaultAnimation: 2,
  }));
  return markers;
};
