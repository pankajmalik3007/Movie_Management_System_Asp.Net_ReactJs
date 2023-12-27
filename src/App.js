
import React, { useState } from 'react';
import Navbar from './Components/Styles/Navbar';
import Sidebar from './Components/Styles/Sidebar';

import MovieTable from './Components/Movie/MovieComponent';
import Dashboard from './Components/Styles/Dashboard';
import RatingComponent from './Components/Rating/RatingComponent';
import ActorComponent from './Components/Actor/ActorComponent';
import DirectorComponent from './Components/Director/DirectorComponent'; 
import './App.css';
import ReviewerComponent from './Components/Reviewer/ReviewerComponent';

import GenresComponent from './Components/Global/GenresComponent';
import MovieCastComponent from './Components/Global/MovieCastComponent';
import MovieGenresComponent from './Components/Movie_genres/MovieGenresComponent';
import MovieDirectionComponent from './Components/MovieDirection/MovieDirectionComponent';

function App() {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [selectedOption, setSelectedOption] = useState('dashboard');

  const handleSidebarOpen = () => {
    setOpenSidebar(true);
  };

  const handleSidebarClose = () => {
    setOpenSidebar(false);
  };

  const handleSidebarClick = (option) => {
    console.log('Selected Option:', option);
    setSelectedOption(option.toLowerCase());
    setOpenSidebar(false);
  };

  return (
    <div className="App">
      <Navbar onMenuIconClick={handleSidebarOpen} />
      <Sidebar open={openSidebar} onClose={handleSidebarClose} onSidebarClick={handleSidebarClick} />
      <div className="content">
        {selectedOption === 'dashboard' && <Dashboard />}
        {selectedOption === 'movies' && <MovieTable />}
        {selectedOption === 'rating' && <RatingComponent />}
        {selectedOption === 'actors' && <ActorComponent />}
        {selectedOption === 'directors' && <DirectorComponent />} 
        {selectedOption === 'reviewers' && <ReviewerComponent />} 
        
        {selectedOption === 'genres' && <GenresComponent />} 
        {selectedOption === 'moviecasts' && <MovieCastComponent />}
        {selectedOption === 'moviegenres' && <MovieGenresComponent />}
        {selectedOption === 'moviedirection' && <MovieDirectionComponent />}
       
      </div>
    </div>
  );
}

export default App;
