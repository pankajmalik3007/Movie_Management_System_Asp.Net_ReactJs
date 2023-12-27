using Domain_Library.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure_Library.Services.Custom_Services.MovieDirectionServices
{
    public interface IMovieDirection
    {
        Task<ICollection<movie_directionviewmodel>> GetAll();
        Task<movie_directionviewmodel> Get(int id);
        Task<bool> Insert(movie_directionInsertmodel model);
        Task<bool> Update(movie_directionupdatemodel model);
        Task<bool> Delete(int id);
    }
}
