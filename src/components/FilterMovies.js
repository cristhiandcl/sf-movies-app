import { useState } from "react";
import { Hint } from "react-autocomplete-hint";

function FilterMovies({ setCoordinates, getCoordinates, movies }) {
  // controlled form
  const [movieName, setMovieName] = useState("");

  const handleChange = (event) => {
    event.target.name === "movieName" &&
      setMovieName(event.target.value.toLowerCase());
  };
  //

  // Get movies title
  const movieTitles = movies.map((movie) => movie.title);
  //

  // Location Selected Filter
  const handleSend = (e) => {
    e.preventDefault();
    setCoordinates((prevCoordinates) =>
      prevCoordinates.filter(
        (coordinate) => coordinate.title.toLowerCase() === movieName
      )
    );
  };
  //

  //Filter reset
  const clearMap = () => {
    setCoordinates([]);
    movies.map((movie) => getCoordinates(movie.locations, movie.title));
    setMovieName("");
  };
  //

  // Enable or Disable Button
  const isInvalid = movieName === "";
  //

  return (
    <form onSubmit={handleSend}>
      <div className="flex flex-col pb-2 justify-center items-center space-y-2">
        <p className="text-center text-green-600 uppercase font-bold text-3xl animate-bounce">
          San Francisco Movies App
        </p>
        <p className="text-center font-bold text-xl p-4 animate-pulse">
          Here you can find the locations were SF movies scenes were filmed,
          along with some details, so feel free to check them out, just click on
          any marker or filter out if you know any movies name
        </p>
        <p className="text-center text-green-600 uppercase font-bold text-xl animate-bounce">
          Type down a movie
        </p>
        <Hint options={movieTitles} allowTabFill={true}>
          <input
            aria-label="Enter Movie name"
            className="border py-2 px-3 mt-2 mb-4 animate-pulse"
            type="text"
            placeholder="Movie Name"
            value={movieName}
            onChange={handleChange}
            name="movieName"
          />
        </Hint>
        <div className="flex space-x-4">
          <button
            className={`border-none rounded-md px-3 py-2 bg-green-900 text-white text-[1.2em] hover:scale-110 ${
              isInvalid && "cursor-not-allowed opacity-50"
            }`}
            type="submit"
            disabled={isInvalid}
          >
            Search
          </button>
          <button
            className={`border-none rounded-md px-3 py-2 bg-green-900 text-white text-[1.2em] hover:scale-110`}
            onClick={clearMap}
          >
            Clear filter
          </button>
        </div>
      </div>
    </form>
  );
}

export default FilterMovies;
