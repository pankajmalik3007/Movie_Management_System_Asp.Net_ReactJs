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

namespace Infrastructure_Library.Services.Custom_Services.MovieDirectionServices
{
    public class MovieDirection : IMovieDirection
    {
        private readonly IRepository<movie_direction> _repository;
        private readonly MainDbContext _mainDbContext;


        public MovieDirection(IRepository<movie_direction> repository , MainDbContext mainDbContext)
        {
            _repository = repository;
            _mainDbContext = mainDbContext;
        }

        public async Task<bool> Delete(int id)
        {
            var res = await _repository.Get(id);
            if (res == null)
            {
                return false;
            }
            else
            {
                return await _repository.Delete(res);
            }
        }

        public async Task<movie_directionviewmodel> Get(int id)
        {
            var movie_Direction = await _repository.Get(id);
            if(movie_Direction == null)
            {
                return null;
            }
            else
            {
                movie_directionviewmodel movie_Direction1 = new()
                {
                    Id = movie_Direction.Id,
                    dir_id = movie_Direction.dir_id,
                    mov_id = movie_Direction.mov_id,
                };
                return movie_Direction1;
            }
        }
       public async Task<ICollection<movie_directionviewmodel>> GetAll()
        {
            ICollection<movie_directionviewmodel> moviegenresViewModels = new List<movie_directionviewmodel>();
            ICollection<movie_direction> movie_Genres = await _mainDbContext.movie_direction
                  .Include(mg => mg.director)
                  .Include(mg => mg.movie)
                  .ToListAsync();
            foreach (movie_direction movie in movie_Genres)
            {
                movie_directionviewmodel movieViewModel = new()
                {
                    Id = movie.Id,
                    dir_id = movie.dir_id,
                    mov_id = movie.mov_id,
                   
                    mov_title = movie.movie?.mov_title,
                    dir_firstname = movie.director?.dir_firstname

                };
                moviegenresViewModels.Add(movieViewModel);
            }
            return moviegenresViewModels;
        }

        public async Task<bool> Insert(movie_directionInsertmodel model)
        {
            var gen = await _mainDbContext.directors.FirstOrDefaultAsync(e => e.dir_firstname == model.dir_firstname);
            var mov = await _mainDbContext.movie.FirstOrDefaultAsync(e => e.mov_title == model.mov_title);

            if(gen == null || mov == null)
            {
                return false;
            }
            else
            {
                movie_direction movie_Direction = new()
                {
                    dir_id = gen.Id,
                    mov_id = mov.Id,
                };
                return await _repository.Insert(movie_Direction);
            }
        }

        public async Task<bool> Update(movie_directionupdatemodel model)
        {
            var gen = await _mainDbContext.directors.FirstOrDefaultAsync(e => e.dir_firstname == model.dir_firstname);
            var mov = await _mainDbContext.movie.FirstOrDefaultAsync(e => e.mov_title == model.mov_title);

            if (gen == null || mov == null)
            {
                return false;
            }
            else
            {
                movie_direction movie_Direction = await _repository.Get(model.Id);
                if (movie_Direction != null)
                {
                    movie_Direction.dir_id = gen.Id;
                    movie_Direction.mov_id = mov.Id;
                };
                return await _repository.Update(movie_Direction);
            }
        }
    }
}
