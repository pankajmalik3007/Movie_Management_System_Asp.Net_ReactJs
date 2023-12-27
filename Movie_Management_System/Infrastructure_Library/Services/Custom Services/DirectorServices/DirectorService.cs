using Domain_Library.Models;
using Domain_Library.ViewModels;
using Infrastructure_Library.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Numerics;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure_Library.Services.Custom_Services.DirectorServices
{
    public class DirectorService : IDirectorService
    {
        private readonly IRepository<director> _repository;
        public DirectorService(IRepository<director> repository)
        {
            _repository = repository;
        }
        public async Task<bool> Delete(int Id)
        {
            if (Id != null)
            {
                director actor = await _repository.Get(Id);
                if (actor != null)
                {

                    return await _repository.Delete(actor);
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

        public async Task<director> Find(Expression<Func<director, bool>> match)
        {
            return await _repository.Find(match);
        }

        public async Task<directorviewmodel> Get(int id)
        {
            var director = await _repository.Get(id);
            if(director == null)
            {
                return null;
            }
            else
            {
                directorviewmodel directorviewmodel = new()
                {
                    Id = director.Id,
                    dir_firstname = director.dir_firstname,
                    dir_lastname = director.dir_lastname,
                    dir_dob = DateTime.Now

                };
                return directorviewmodel;
            }
        }

        public async Task<ICollection<directorviewmodel>> GetAll()
        {
           ICollection<directorviewmodel> directorviewmodels = new List<directorviewmodel>();
            ICollection<director> directors = await _repository.GetAll();

            foreach(director director in directors)
            {
                directorviewmodel directorviewmodel = new()
                {
                    Id = director.Id,
                    dir_firstname = director.dir_firstname,
                    dir_lastname = director.dir_lastname,
                    dir_dob = director.dir_dob,
                };
                directorviewmodels.Add(directorviewmodel);
            }
            return directorviewmodels;
        }

        public director GetLast()
        {
            return _repository.GetLast();
        }

        public Task<bool> Insert(directorinsertmodel directorinsertmodel)
        {
            director director = new()
            {
                dir_firstname = directorinsertmodel.dir_firstname,
                dir_lastname = directorinsertmodel.dir_lastname,
                dir_dob = DateTime.Now

            };
            return _repository.Insert(director);
            
        }

        public async Task<bool> Update(directorupdatemodel directorupdatemodel)
        {
          director director = await _repository.Get(directorupdatemodel.Id);
            if(director != null)
            {
                director.dir_firstname = directorupdatemodel.dir_firstname;
                director.dir_lastname = directorupdatemodel.dir_lastname;
                director.dir_dob = directorupdatemodel.dir_dob;
                var result = await _repository.Update(director);
                return result;
            }
            else
            {
                return false;
            }

        }
    }
}
