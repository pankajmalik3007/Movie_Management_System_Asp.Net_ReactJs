using Domain_Library.Models;
using Domain_Library.ViewModels;
using Infrastructure_Library.Context;
using Infrastructure_Library.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure_Library.Services.Custom_Services.Movie_GenresServices
{
    public class Movie_Generes : IMovie_Generes
    {
        public readonly IRepository<movie_genres> _repository;
        private readonly MainDbContext _context;


        public Movie_Generes(IRepository<movie_genres> repository, MainDbContext context)
        {
            _repository = repository;
            _context = context;
        }

        public async Task<bool> Delete(int id)
        {
            var movie_Genres = await _repository.Get(id);
            if (movie_Genres != null)
            {
                return await _repository.Delete(movie_Genres);
            }
            else
            {
                return false;
            }

        }

        public async Task<movie_genresviewmodel> Get(int id)
        {
            var res = await _repository.Get(id);
            if (res == null)
            {
                return null;
            }
            else
            {
                movie_genresviewmodel genresviewmodel = new()
                {
                    Id = res.Id,
                    mov_id = res.mov_id,
                    gen_id = res.gen_id,

                };
                return genresviewmodel;
            }
        }

        public async Task<ICollection<movie_genresviewmodel>> GetAll()
        {
            ICollection<movie_genresviewmodel> moviegenresViewModels = new List<movie_genresviewmodel>();
            ICollection<movie_genres> movie_Genres = await _context.movie_genres
                  .Include(mg => mg.genres)
                  .Include(mg => mg.movie)
                  .ToListAsync();
            foreach (movie_genres movie in movie_Genres)
            {
                movie_genresviewmodel movieViewModel = new()
                {
                    Id = movie.Id,
                    mov_id = movie.mov_id,
                    gen_id = movie.gen_id,
                    mov_title = movie.movie?.mov_title,
                    gen_title = movie.genres?.gen_title
                    
                };
                moviegenresViewModels.Add(movieViewModel);
            }
            return moviegenresViewModels;
        }

        public async Task<bool> Insert(movie_genresinsertmodel model)
        {
            var user = await _context.movie.FirstOrDefaultAsync(u => u.mov_title == model.Movie_name);
            var movie = await _context.genres.FirstOrDefaultAsync(u => u.gen_title == model.Gen_title);

            if (user == null || movie == null)
            {
                return false;
            }

            var movieCast = new movie_genres
            {
               mov_id = user.Id,
               gen_id = movie.Id,
               
            };

            await _repository.Insert(movieCast);
            return true;
        }

        public async Task<bool> Update(movie_genresupdatemodel model)
        {
            var movie = await _context.movie.FirstOrDefaultAsync(u => u.mov_title == model.Movie_name);
            var Genres = await _context.genres.FirstOrDefaultAsync(u => u.gen_title == model.Gen_title);
          

            if (Genres == null || movie == null)
            {
                return false;
            }
            movie_genres cast = await _repository.Get(model.Id);
            if (cast != null)
            {
                cast.gen_id = Genres.Id;
                cast.mov_id = movie.Id;
               
                var res = await _repository.Update(cast);
                return res;
            }
            return false;
        }
    }
    }

