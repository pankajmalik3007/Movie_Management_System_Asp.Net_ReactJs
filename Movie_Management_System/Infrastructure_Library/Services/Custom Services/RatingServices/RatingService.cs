using Domain_Library.Models;
using Domain_Library.ViewModels;
using Infrastructure_Library.Context;
using Infrastructure_Library.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure_Library.Services.Custom_Services.RatingServices
{
    public class RatingService : IRatingService
    {
        private readonly IRepository<rating> _repository;
        private readonly MainDbContext _context;

        public RatingService(IRepository<rating> repository, MainDbContext context)
        {
            _repository = repository;
            _context = context;
        }

        public async Task<ICollection<ratingviewmodel>> GetAll()
        {
           ICollection<ratingviewmodel> ratingviewmodels = new List<ratingviewmodel>();
            ICollection<rating> ratings = await _repository.GetAll();
            foreach(rating rating in ratings)
            {
                ratingviewmodel ratingviewmodel = new()
                {
                    Id = rating.Id,
                    mov_id = rating.Id,
                    rev_id = rating.Id,
                    rev_stars = rating.rev_stars,
                };
                ratingviewmodels.Add(ratingviewmodel);
            }
            return ratingviewmodels;
        }
        /*public async Task<bool> InsertRating(RatingInputModel inputModel)
        {
            if (inputModel.RevStars < 1 || inputModel.RevStars > 5)
            {
                return false;
            }

            var existingReviewer = await _context.reviewer.FindAsync(inputModel.RevId);

            if (existingReviewer == null)
            {
                return false;
            }

            var newRating = new rating
            {
                mov_id = inputModel.MovId,
                rev_id = inputModel.RevId,
                rev_stars = inputModel.RevStars,
            };

            _context.rating.Add(newRating);
            await _context.SaveChangesAsync();


            var movie = await _context.movie.FindAsync(inputModel.MovId);

            if (movie != null)
            {
                await _context.Entry(movie).Collection(m => m.mov_rating).LoadAsync();

                if (movie.mov_rating != null && movie.mov_rating.Any())
                {
                    int sumOfStars = movie.mov_rating.Sum(r => r.rev_stars);
                    movie.num_of_rating = (float)sumOfStars / movie.mov_rating.Count;
                }
                else
                {
                    movie.num_of_rating = 0;
                }

                await _context.SaveChangesAsync();
            }
            return true;
        }*/
        public async Task<bool> InsertRating(RatingInputModel inputModel)
        {
            if (inputModel.RevStars < 1 || inputModel.RevStars > 5)
            {
                return false;
            }

            var existingReviewer = await _context.reviewer.FirstOrDefaultAsync(r => r.rev_name == inputModel.RevName);

            if (existingReviewer == null)
            {
                return false;
            }

            var movie = await _context.movie.FirstOrDefaultAsync(m => m.mov_title == inputModel.MovTitle);

            if (movie == null)
            {
                return false;
            }

            var newRating = new rating
            {
                mov_id = movie.Id,  
                rev_id = existingReviewer.Id,   
                rev_stars = inputModel.RevStars,
            };

            _context.rating.Add(newRating);
            await _context.SaveChangesAsync();

           
            await _context.Entry(movie).Collection(m => m.mov_rating).LoadAsync();

            if (movie.mov_rating != null && movie.mov_rating.Any())
            {
                int sumOfStars = movie.mov_rating.Sum(r => r.rev_stars);
                movie.num_of_rating = (float)sumOfStars / movie.mov_rating.Count;
            }
            else
            {
                movie.num_of_rating = 0;
            }

            await _context.SaveChangesAsync();

            return true;
        }

    }
}

