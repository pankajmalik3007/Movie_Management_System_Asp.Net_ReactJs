
import { configureStore } from '@reduxjs/toolkit';
import movieReducer from './Components/Movie/MovieSlice';
import ratingReducer from './Components/Rating/RatingSlice';
import actorReducer from './Components/Actor/ActorSlice';
import directorReducer from './Components/Director/DirectorSlice';
import reviewerReducer from './Components/Reviewer/ReviewerSlice';
import genresReducer from './Components/Global/GlobalSlice';
import movieCastReducer from './Components/Global/MovieCastSlice';
import movieGenresReducer  from './Components/Movie_genres/MovieGenresSlice';
import movieDirectionReducer from './Components/MovieDirection/MovieDirectionSlice';
const store = configureStore({
  reducer: {
    movies: movieReducer,
    ratings: ratingReducer,
    actors: actorReducer,
    directors: directorReducer,
    reviewers: reviewerReducer,
    genres: genresReducer,
    movieCasts: movieCastReducer,
    movieGenres: movieGenresReducer,
    movieDirection: movieDirectionReducer,
   
  },
});

export default store;
