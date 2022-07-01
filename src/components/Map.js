import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import FilterMovies from "./FilterMovies";

function Map({ movies, setMovies }) {
  // Map Size
  const containerStyle = {
    width: "100%",
    height: "100vh",
  };
  //

  //Map Center
  const center = {
    lat: 37.733795,
    lng: -122.446747,
  };
  //

  // infoWIndows Selected item
  const [selected, setSelected] = useState({});

  const onSelect = (item) => {
    setSelected(item);
  };
  //

  //  Coordinates const
  const [coordinates, setCoordinates] = useState([]);
  //

  // Fetch all Movies' Coordinates
  useEffect(() => {
    setCoordinates([]);
    movies.map((movie) =>
      getCoordinates(
        movie.locations,
        movie.title,
        movie.release_year,
        movie.director,
        movie.writer
      )
    );
  }, [movies]);

  async function getCoordinates(address, title, releaseYear, director, writer) {
    let location = await fetch(
      "https://maps.googleapis.com/maps/api/geocode/json?address=" +
        address +
        "&key=AIzaSyBE-oM93Dep_q4LELh3JReYEvidALWyNz0"
    );
    let data = await location.json();
    let coordinate = data.results[0].geometry;
    setCoordinates((prevCoordinate) => [
      ...prevCoordinate,
      coordinate !== undefined && {
        location: coordinate.location,
        key: nanoid(),
        title,
        address,
        releaseYear,
        director,
        writer,
      },
    ]);
  }
  //

  return (
    <div className="flex">
      <div className="w-4/6">
        <LoadScript googleMapsApiKey="AIzaSyBE-oM93Dep_q4LELh3JReYEvidALWyNz0">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={12}
          >
            {coordinates.map((item) => {
              return (
                <Marker
                  key={item.key}
                  position={item.location}
                  onClick={() => onSelect(item)}
                />
              );
            })}
            {selected.location && (
              <InfoWindow
                position={selected.location}
                clickable={true}
                onCloseClick={() => setSelected({})}
              >
                <div className="text-center">
                  <p className="font-bold text-xl">{selected.title}</p>
                  <p>
                    <span className="font-bold text-sm">Address:</span>{" "}
                    {selected.address}
                  </p>
                  <p>
                    <span className="font-bold text-sm">Director:</span>{" "}
                    {selected.director}
                  </p>
                  <p>
                    <span className="font-bold text-sm">Writer:</span>{" "}
                    {selected.writer}
                  </p>
                  <p>
                    <span className="font-bold text-sm">Release year:</span>{" "}
                    {selected.releaseYear}
                  </p>
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        </LoadScript>
      </div>
      <div className="border-4 flex items-center w-2/6 bg-blue-100">
        <FilterMovies
          setCoordinates={setCoordinates}
          coordinates={coordinates}
          getCoordinates={getCoordinates}
          movies={movies}
        />
      </div>
    </div>
  );
}

export default Map;
