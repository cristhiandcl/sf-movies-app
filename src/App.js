import "./App.css";
import Map from "./components/Map";
import { useEffect, useState } from "react";

function App() {
  //Movies stack
  const [movies, setMovies] = useState([]);
  // const [isDone, setIsDone] = useState(false);
  //

  // Fetch Movies
  useEffect(() => {
    async function getMovies() {
      const response = await fetch(
        "https://data.sfgov.org/resource/yitu-d5am.json?$limit=800"
      );
      const movies = await response.json();
      setMovies(movies.filter((movie) => movie.locations !== undefined));
    }
    getMovies();
  }, []);
  //
  return (
    <div className="App">
      <Map movies={movies} setMovies={setMovies} />
    </div>
  );
}

export default App;
