import { useState, useEffect, useCallback, useMemo } from "react";
import "./App.css";

function MovieView() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [movieDetails, setMovieDetails] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [lastSearch, setLastSearch] = useState("movie");

  const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
  const BASE_URL = "https://www.omdbapi.com";

  // Unified fetch function
  const fetchMovies = useCallback(
    async (query, page) => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(
          `${BASE_URL}/?apikey=${API_KEY}&s=${query}&type=movie&page=${page}`
        );
        const data = await response.json();

        if (data.Response === "True") {
          setMovies(data.Search || []);
          setTotalResults(parseInt(data.totalResults) || 0);
          setCurrentPage(page);
          setLastSearch(query);
        } else {
          setError(data.Error || "No movies found");
          setMovies([]);
          setTotalResults(0);
        }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch movies");
      } finally {
        setLoading(false);
      }
    },
    [API_KEY, BASE_URL]
  );

  // Initial load - only runs once on mount
  useEffect(() => {
    fetchMovies("movie", 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Search handler
  const searchMovies = useCallback(
    (e, page = 1) => {
      if (e) e.preventDefault();
      const query = searchQuery.trim() || "movie";
      fetchMovies(query, page);
    },
    [searchQuery, fetchMovies]
  );

  // Page navigation
  const goToPage = useCallback(
    (page) => {
      fetchMovies(lastSearch, page);
    },
    [lastSearch, fetchMovies]
  );

  // Fetch movie details
  const fetchMovieDetails = useCallback(
    async (imdbID) => {
      try {
        const response = await fetch(
          `${BASE_URL}/?apikey=${API_KEY}&i=${imdbID}&plot=full`
        );
        const data = await response.json();
        if (data.Response === "True") {
          setMovieDetails(data);
          setSelectedMovie(imdbID);
        }
      } catch (err) {
        console.error("Failed to fetch movie details:", err);
      }
    },
    [API_KEY, BASE_URL]
  );

  const closeModal = useCallback(() => {
    setSelectedMovie(null);
    setMovieDetails(null);
  }, []);

  // Calculate pagination pages
  const paginationPages = useMemo(() => {
    const totalPages = Math.ceil(totalResults / 10);
    const pages = [];
    const maxPagesToShow = 7;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (currentPage > 3) {
        pages.push("...");
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push("...");
      }

      pages.push(totalPages);
    }

    return pages;
  }, [totalResults, currentPage]);

  const totalPages = Math.ceil(totalResults / 10);

  if (loading) return <div className="loading">Loading movies...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="movie-view">
      <h1>Movies List</h1>

      <form onSubmit={searchMovies} className="search-form">
        <input
          type="text"
          placeholder="Search for movies..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-button">
          Search
        </button>
        <button
          type="button"
          onClick={(e) => {
            setSearchQuery("popular");
            searchMovies(e);
          }}
          className="reset-button"
        >
          Show Popular
        </button>
      </form>

      <div className="movies-grid">
        {movies && movies.length > 0 ? (
          movies.map((movie) => (
            <div
              key={movie.imdbID}
              className="movie-card"
              onClick={() => fetchMovieDetails(movie.imdbID)}
              style={{ cursor: "pointer" }}
            >
              <img
                src={
                  movie.Poster && movie.Poster !== "N/A"
                    ? movie.Poster
                    : "https://placehold.co/500x750/1a1a1a/888?text=No+Image"
                }
                alt={movie.Title}
                className="movie-poster"
                onError={(e) => {
                  console.log("Image failed to load:", e.target.src);
                  e.target.onerror = null;
                  e.target.src =
                    "https://placehold.co/500x750/1a1a1a/888?text=No+Image";
                }}
              />
              <div className="movie-info">
                <h3>{movie.Title}</h3>
                <p className="release-date">Year: {movie.Year || "N/A"}</p>
                <p className="rating">🎬 {movie.Type?.toUpperCase()}</p>
                <p className="overview">IMDb ID: {movie.imdbID}</p>
              </div>
            </div>
          ))
        ) : (
          <p
            style={{ color: "white", textAlign: "center", gridColumn: "1/-1" }}
          >
            No movies found. Try searching for something else.
          </p>
        )}
      </div>

      {totalResults > 10 && (
        <div className="pagination">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="pagination-button"
          >
            ← Prev
          </button>

          {paginationPages.map((page, index) => {
            if (page === "...") {
              return (
                <span key={`ellipsis-${index}`} className="pagination-ellipsis">
                  ...
                </span>
              );
            }

            return (
              <button
                key={page}
                onClick={() => goToPage(page)}
                className={`pagination-number ${
                  currentPage === page ? "active" : ""
                }`}
              >
                {page}
              </button>
            );
          })}

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage >= totalPages}
            className="pagination-button"
          >
            Next →
          </button>
        </div>
      )}

      {selectedMovie && movieDetails && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              ×
            </button>
            <div className="modal-body">
              <img
                src={
                  movieDetails.Poster && movieDetails.Poster !== "N/A"
                    ? movieDetails.Poster
                    : "https://placehold.co/300x450/1a1a1a/888?text=No+Image"
                }
                alt={movieDetails.Title}
                className="modal-poster"
              />
              <div className="modal-info">
                <h2>{movieDetails.Title}</h2>
                <p className="modal-year">
                  {movieDetails.Year} • {movieDetails.Rated} •{" "}
                  {movieDetails.Runtime}
                </p>
                <p className="modal-genre">{movieDetails.Genre}</p>
                <div className="modal-ratings">
                  <span>⭐ IMDb: {movieDetails.imdbRating}/10</span>
                  {movieDetails.Metascore !== "N/A" && (
                    <span> • 📊 Metascore: {movieDetails.Metascore}</span>
                  )}
                </div>
                <p className="modal-plot">{movieDetails.Plot}</p>
                <div className="modal-details">
                  <p>
                    <strong>Director:</strong> {movieDetails.Director}
                  </p>
                  <p>
                    <strong>Writer:</strong> {movieDetails.Writer}
                  </p>
                  <p>
                    <strong>Actors:</strong> {movieDetails.Actors}
                  </p>
                  <p>
                    <strong>Language:</strong> {movieDetails.Language}
                  </p>
                  <p>
                    <strong>Country:</strong> {movieDetails.Country}
                  </p>
                  <p>
                    <strong>Awards:</strong> {movieDetails.Awards}
                  </p>
                  <p>
                    <strong>Box Office:</strong>{" "}
                    {movieDetails.BoxOffice || "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MovieView;
