using Domain_Library.Models;
using Domain_Library.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using static Infrastructure_Library.Services.Custom_Services.Movie_CastServices.Movi_CastService;

namespace Infrastructure_Library.Services.Custom_Services.Movie_CastServices
{
    public interface IMovi_CastService
    {
        Task<ICollection<movie_castviewmodel>> GetAll();
        Task<movie_castviewmodel> Get(int id);
        Task<bool> Insert(EventInputModel model);
        /* Task<bool> Update(movie_castupdatemodel model);*/
        Task<bool> Update(EventInputModel1 model);
        Task<bool> Delete(int id);
        Task<movie_cast> Find(Expression<Func<movie_cast, bool>> match);
    }
}
