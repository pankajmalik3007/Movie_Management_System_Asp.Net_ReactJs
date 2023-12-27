using Domain_Library.Models;
using Infrastructure_Library.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure_Library.Services.Genral_Services
{
    public class Service<T> : IService<T> where T : BaseEntity
    {
        private readonly IRepository<T> _repository;
        public Service(IRepository<T> repository)
        {
            _repository = repository;
        }
        public async Task<bool> Delete(T entity)
        {
            return await _repository.Delete(entity);
        }

        public async Task<T> Find(Expression<Func<T, bool>> match)
        {
           return await _repository.Find(match);
        }

        public async Task<ICollection<T>> FindAll(Expression<Func<T, bool>> match)
        {
            return await _repository.FindAll(match);
        }

        public async Task<T> Get(int Id)
        {
          return await _repository.Get(Id);
        }

        public async Task<ICollection<T>> GetAll()
        {
            return await _repository.GetAll();
        }

        public  T GetLast()
        {
            return  _repository.GetLast();
        }

        public Task<bool> Insert(T entity)
        {
            return _repository.Insert(entity);
        }

        public Task<bool> Update(T entity)
        {
            return _repository.Update(entity);
        }
    }
}
