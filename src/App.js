import "./App.css";
import Map from "./components/Map";
import { useEffect, useState } from "react";

function App() {
  //Movies stack
  const [movies, setMovies] = useState([]);
  //

  // Fetch Movies
  useEffect(() => {
    fetch("https://data.sfgov.org/resource/yitu-d5am.json")
      .then((res) => res.json())
      .then((movies) =>
        setMovies(movies.filter((movie) => movie.locations !== undefined))
      );
  }, []);
  //

  return (
    <div className="App">
      <Map movies={movies} setMovies={setMovies} />
    </div>
  );
}

export default App;
