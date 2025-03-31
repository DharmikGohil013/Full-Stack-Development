// Movie Collection Manager

// Create an array of movie objects with fields like title, genre, rating, and release year.
const movies = [
  {
      title: "The Shawshank Redemption",
      genre: "Drama",
      rating: 9.3,
      releaseYear: 1994
  },
  {
      title: "The Dark Knight",
      genre: "Action",
      rating: 9.0,
      releaseYear: 2008
  },
  {
      title: "Inception",
      genre: "Sci-Fi",
      rating: 8.8,
      releaseYear: 2010
  },
  {
      title: "The Matrix",
      genre: "Sci-Fi",
      rating: 8.7,
      releaseYear: 1999
  },
  {
      title: "Pulp Fiction",
      genre: "Crime",
      rating: 8.9,
      releaseYear: 1994
  }
];

// Function to add a new movie to the collection
const addMovie = (movie) => {
  movies.push(movie);
};

// Function to list all movies in a specific genre
const listMoviesByGenre = (genre) => {
  const genreMovies = movies.filter(movie => movie.genre === genre);
  let output = '';
  genreMovies.forEach(movie => {
      output += `<div>Title: ${movie.title} (${movie.releaseYear}), Rating: ${movie.rating}</div>`;
  });
  document.getElementById("sciFiMovies").innerHTML = output;
};

// Function to find the highest-rated movie in the collection
const findHighestRatedMovie = () => {
  const highestRatedMovie = movies.reduce((highest, current) => 
      (current.rating > highest.rating ? current : highest)
  );
  document.getElementById("highestRatedMovie").innerHTML = 
      `Highest Rated Movie: "${highestRatedMovie.title}", Rating: ${highestRatedMovie.rating}`;
};

// Function to use map() to create a list of all movie titles
const getAllMovieTitles = () => {
  return movies.map(movie => movie.title).join(", ");
};

// Function to find movies released after a specific year using filter()
const findMoviesReleasedAfterYear = (year) => {
  return movies.filter(movie => movie.releaseYear > year);
};

// Display Results
document.getElementById("movieTitles").innerHTML = getAllMovieTitles();

const filteredMovies = findMoviesReleasedAfterYear(2000);
let filteredMoviesOutput = '';
filteredMovies.forEach(movie => {
  filteredMoviesOutput += `<div>- ${movie.title} (${movie.releaseYear})</div>`;
});
document.getElementById("releasedAfter2000").innerHTML = filteredMoviesOutput;

// Example of adding a new movie
addMovie({
  title: "Interstellar",
  genre: "Sci-Fi",
  rating: 8.6,
  releaseYear: 2014
});

// List all Sci-Fi movies
listMoviesByGenre("Sci-Fi");

// Find and log the highest-rated movie
findHighestRatedMovie();
