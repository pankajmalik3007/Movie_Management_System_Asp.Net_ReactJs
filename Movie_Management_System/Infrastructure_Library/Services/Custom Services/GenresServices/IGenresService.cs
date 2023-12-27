using Domain_Library.Models;
using Domain_Library.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure_Library.Services.Custom_Services.GenresServices
{
    public interface IGenresService
    {
        Task<ICollection<genresviewmodel>> GetAll();
        Task<genresviewmodel> Get(int id);
        Task<bool> Insert(genresinsertmodel genresinsertmodel);
        Task<bool> Update(genresupdatemodel genresupdatemodel);
        Task<bool> Delete(int id);
        Task<genres> Find(Expression<Func<genres, bool>> predicate);
    }
}
