using Domain_Library.Models;
using Domain_Library.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure_Library.Services.Custom_Services.MovieServices
{
    public interface IMovieService
    {
        Task<ICollection<movieviewmodel>> GetAll();
        Task<movieviewmodel> GetById(int id);
        movie GetLast();
        Task<bool> Insert(movieinsertmodel movieinsertmodel);
        Task<bool> Update(movieupdatemodel movieupdatemodel);
        Task<bool> Delete(int id);
        Task<movie> Find(Expression<Func<movie, bool>> match);
    }
}
