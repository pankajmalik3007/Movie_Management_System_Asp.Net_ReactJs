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

namespace Infrastructure_Library.Services.Custom_Services.Movie_CastServices
{
    public class Movi_CastService : IMovi_CastService
    {
        private IRepository<movie_cast> _repository;
        private readonly MainDbContext _context;
        public Movi_CastService(IRepository<movie_cast> repository, MainDbContext context)
        {
            _repository = repository;
            _context = context;
        }

        public Task<movie_cast> Find(Expression<Func<movie_cast, bool>> match)
        {
            throw new NotImplementedException();
        }

        public async Task<ICollection<movie_castviewmodel>> GetAll()
        {
            ICollection<movie_castviewmodel> moviegenresViewModels = new List<movie_castviewmodel>();
            ICollection<movie_cast> movie_Genres = await _context.movie_cast
                  .Include(mg => mg.actor)
                  .Include(mg => mg.movie)
                  .ToListAsync();
            foreach (movie_cast movie in movie_Genres)
            {
                movie_castviewmodel movieViewModel = new()
                {
                    Id = movie.Id,
                    act_id = movie.act_id,
                    mov_id = movie.mov_id,
                    role = movie.role,
                    mov_title = movie.movie?.mov_title,
                    act_firstname = movie.actor?.act_firstname

                };
                moviegenresViewModels.Add(movieViewModel);
            }
            return moviegenresViewModels;
        }

        public async Task<bool> Insert(EventInputModel model)
        {
            var user = await _context.actors.FirstOrDefaultAsync(u => u.act_firstname == model.Act_Name);
            var movie = await _context.movie.FirstOrDefaultAsync(u => u.mov_title == model.Movie_name);

            if (user == null || movie == null)
            {
                return false; 
            }

            var movieCast = new movie_cast
            {
                act_id = user.Id,
                mov_id = movie.Id,
                role = model.Role,
            };

            await _repository.Insert(movieCast);
            return true;
        }

      /*  public async Task<bool> Update(movie_castupdatemodel model)
        {

            movie_cast cast = await _repository.Get(model.Id);
            if(cast != null)
            {
                cast.act_id = model.act_id;
                cast.mov_id = model.mov_id;
                cast.role = model.role;
                var res = await _repository.Update(cast);
                return res;
                
            }
            else
            {
                return false;
            }
        }*/
      public async Task<bool> Update(EventInputModel1 model)
        {
            var user = await _context.actors.FirstOrDefaultAsync(u => u.act_firstname == model.Act_Name);
            var movie = await _context.movie.FirstOrDefaultAsync(u => u.mov_title == model.Movie_name);

            if (user == null || movie == null)
            {
                return false;
            }
            movie_cast cast = await _repository.Get(model.Id);
            if (cast != null)
            {
                cast.act_id = user.Id;
                cast.mov_id = movie.Id;
                cast.role = model.Role;
                var res = await _repository.Update(cast);
                return res;
            }
            return false;
        }
        public async Task<movie_castviewmodel> Get(int id)
        {
            var res = await _repository.Get(id);
            if(res == null)
            {
                return null;
            }
            else
            {
                movie_castviewmodel movie_Castviewmodel = new()
                {
                    Id = res.Id,
                    act_id = res.act_id,
                    mov_id = res.mov_id,
                };
                return movie_Castviewmodel;
            }
        }

        public async Task<bool> Delete(int id)
        {
            movie_cast res = await _repository.Get(id);
            if (res != null)
            {
                return await _repository.Delete(res);
            }
            else
            {
                return true;
            }
        }

        public class EventInputModel
        {
            public string Act_Name { get; set; }
            public string Movie_name { get; set; }

            public string Role { get; set; }
        }
        public class EventInputModel1
        {
            public int Id { get; set; }
            public string Act_Name { get; set; }
            public string Movie_name { get; set; }

            public string Role { get; set; }
        }

    }
}
