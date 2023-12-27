using Domain_Library.Models;
using Domain_Library.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure_Library.Services.Custom_Services.Movie_GenresServices
{
    public interface IMovie_Generes
    {
        Task<ICollection<movie_genresviewmodel>> GetAll();
        Task<movie_genresviewmodel> Get(int id);
        Task<bool> Insert(movie_genresinsertmodel model);
        Task<bool> Update(movie_genresupdatemodel model);
        Task<bool> Delete(int id);

    }
}
