﻿using Domain_Library.Models;
using Infrastructure_Library.Context;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure_Library.Repositories
{
    public class Repository<T> : IRepository<T> where T : BaseEntity
    {
        private readonly MainDbContext _applicationDbContext;
        private readonly DbSet<T> entities;
        public Repository(MainDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
            entities = _applicationDbContext.Set<T>();
        }
        public async Task<bool> Delete(T entity)
        {
           entities.Remove(entity);
            var result = await _applicationDbContext.SaveChangesAsync();
            if(result > 0)
            {
                return true;
            }
            return false;
        }

        public async Task<T> Find(Expression<Func<T, bool>> match)
        {
            return await entities.FirstOrDefaultAsync(match);
        }

        public async Task<ICollection<T>> FindAll(Expression<Func<T, bool>> match)
        {
            return await entities.Where(match).ToListAsync();
           
        }

        public async Task<T> Get(int id)
        {
            return await entities.FindAsync(id);
        }

        public async Task<ICollection<T>> GetAll()
        {
            return await entities.ToListAsync();
        }

        public T GetLast()
        {
           if(entities.ToList() != null)
            {
                return entities.ToList().LastOrDefault();
            }
            else
            {
                return entities.ToList().LastOrDefault();
            }
        }

        public async Task<bool> Insert(T entity)
        {
           entities.AddAsync(entity);
            var result = await _applicationDbContext.SaveChangesAsync();
            if(result > 0)
            {
                return true;
            }
            return false;
        }

        public async Task<bool> Update(T entity)
        {
            entities.Update(entity);
            var result = await _applicationDbContext.SaveChangesAsync();
            if (result > 0)
            {
                return true;
            }
            return false;
        }
    }
}
