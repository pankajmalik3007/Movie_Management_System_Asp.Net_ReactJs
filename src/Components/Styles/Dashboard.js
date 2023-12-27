import React from 'react';
import PopcornIcon from '@mui/icons-material/LocalMovies';
import Typography from '@mui/material/Typography';

import popcornImage from '../../Images/popcorn.jpg';
import thorImage from '../../Images/Thor.jpg';
import './Dashboard.css'; 

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <Typography variant="h2" className="move-heading">
        Welcome To Movie Katta.....!
      </Typography>
      <Typography variant="subtitle1" style={{ marginBottom: '40px' }}>
      <h3>Explore the world of movies with Movie Katta.</h3> 
      </Typography>

      <div className="image-container">
        <div className="popcorn-container">
          <img src={popcornImage} alt="Popcorn" className="popcorn-image" />
          <PopcornIcon className="popcorn-icon" />
        </div>
        <div className="thor-container">
          <img src={thorImage} alt="Thor Movie" className="thor-image" />
        </div>
      </div>

      <Typography variant="subtitle1" style={{ marginBottom: '20px' }}>
        <h3>Experience the magic of cinema.</h3>
      </Typography>
    </div>
  );
};

export default Dashboard;
