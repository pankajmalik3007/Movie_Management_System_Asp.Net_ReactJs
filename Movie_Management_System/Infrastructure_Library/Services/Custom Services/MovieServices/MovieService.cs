using Domain_Library.Models;
using Domain_Library.ViewModels;
using Infrastructure_Library.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure_Library.Services.Custom_Services.MovieServices
{
    public class MovieService : IMovieService
    {

        private readonly IRepository<movie> _repository;
        public MovieService(IRepository<movie> repository)
        {
            _repository = repository;
        }
        public async Task<bool> Delete(int id)
        {
          if(id != null)
            {
                movie movie = await _repository.Get(id);
                if(movie != null)
                {
                    return await _repository.Delete(movie);
                }
                else 
                { 
                    return false; 
                }
            }
            else
            {
                return false;
            }
        }

        public  Task<movie> Find(Expression<Func<movie, bool>> match)
        {
            return _repository.Find(match);
        }

        public async Task<ICollection<movieviewmodel>> GetAll()
        {
          ICollection<movieviewmodel> result = new List<movieviewmodel>();
            ICollection<movie> movies = await _repository.GetAll();
            foreach(movie movie in movies)
            {
                movieviewmodel movieviewmodel = new()
                {
                    Id = movie.Id,
                    mov_title = movie.mov_title,
                    mov_year = movie.mov_year,
                    mov_time = movie.mov_time,
                    mov_language = movie.mov_language,
                    mov_dt_rel = movie.mov_dt_rel,
                    mov_rel_country = movie.mov_rel_country,
                    num_of_rating = movie.num_of_rating,

                };
                result.Add(movieviewmodel);
            }
            return result;
        }

        public async Task<movieviewmodel> GetById(int id)
        {
           movie movie = await _repository.Get(id);
            if(movie == null)
            {
                return (null);
            }
            movieviewmodel result = new()
            {
                Id = movie.Id,
                mov_title = movie.mov_title,
                mov_year = movie.mov_year,
                mov_time = movie.mov_time,
                mov_language = movie.mov_language,
                mov_dt_rel = movie.mov_dt_rel,
                mov_rel_country = movie.mov_rel_country,

            };
            return result;
        }

        public movie GetLast()
        {
            return _repository.GetLast();
        }

        public Task<bool> Insert(movieinsertmodel movieinsertmodel)
        {
            movie movie1= new()
            {
                mov_title = movieinsertmodel.mov_title,
                mov_year = movieinsertmodel.mov_year,
                mov_time = movieinsertmodel.mov_time,
                mov_language = movieinsertmodel.mov_language,
                mov_dt_rel = movieinsertmodel.mov_dt_rel,
                mov_rel_country = movieinsertmodel.mov_rel_country,
            };
            return _repository.Insert(movie1);
        }

        public async Task<bool> Update(movieupdatemodel movieupdatemodel)
        {
            movie movie = await _repository.Get(movieupdatemodel.Id);
            if(movie != null)
            {
                movie.mov_title = movieupdatemodel.mov_title;
                movie.mov_year = movieupdatemodel.mov_year;
                movie.mov_time = movieupdatemodel.mov_time;
                movie.mov_language = movieupdatemodel.mov_language;
                movie.mov_dt_rel = movieupdatemodel.mov_dt_rel;
                movie.mov_rel_country = movieupdatemodel.mov_rel_country;
                var res = await _repository.Update(movie);
                return res;
            }
            else
            {
                return false;
            }
        }
    }
}
