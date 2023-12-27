using Domain_Library.Models;
using Domain_Library.ViewModels;
using Infrastructure_Library.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure_Library.Services.Custom_Services.GenresServices
{
    public class GenresService : IGenresService
    {
        private readonly IRepository<genres> _genres;
        public GenresService(IRepository<genres> genres)
        {
            _genres = genres;
        }

        public async Task<bool> Delete(int id)
        {
           if(id!= null)
            {
                genres genres = await _genres.Get(id);
                {
                    if(genres!= null)
                    {
                        return await _genres.Delete(genres);
                    }
                    else
                    {
                        return false;
                    }
                }
             }
            return false;
        }

        public async Task<genres> Find(Expression<Func<genres, bool>> predicate)
        {
            return await _genres.Find(predicate);
        }

        public async Task<genresviewmodel> Get(int id)
        {
            var res = await _genres.Get(id);
            if (res == null)
            {
                return null;
            }
           
            else
            {
                genresviewmodel genresviewmodel = new()
                {
                  
                    Id = res.Id,
                    gen_title = res.gen_title,
                };
                return genresviewmodel;
            }
        }

        public async Task<ICollection<genresviewmodel>> GetAll()
        {
           ICollection<genresviewmodel> genresviewmodels = new List<genresviewmodel>();
            ICollection<genres> genres = await _genres.GetAll();
            foreach(genres genres1 in genres)
            {
                genresviewmodel genresviewmodel = new()
                {
                    Id = genres1.Id,
                    gen_title = genres1.gen_title,
                };
                genresviewmodels.Add(genresviewmodel);
            }
            return genresviewmodels;
        }

        public async Task<bool> Insert(genresinsertmodel genresinsertmodel)
        {
            genres genres = new()
            {
                gen_title =genresinsertmodel.gen_title,
            };
            return await _genres.Insert(genres);
        }

        public async Task<bool> Update(genresupdatemodel genresupdatemodel)
        {
            var genres1 = await _genres.Get(genresupdatemodel.Id);
            if(genres1 != null)
            {
                genres1.gen_title = genresupdatemodel.gen_title;
                var res = await _genres.Update(genres1);
                return res;
            }
            else
            {
                return false;
            }
        }
    }
}
