using Domain_Library.Models;
using Domain_Library.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure_Library.Services.Custom_Services.DirectorServices
{
    public  interface IDirectorService
    {
        Task<ICollection<directorviewmodel>> GetAll();
        Task<directorviewmodel> Get(int id);

        director GetLast();
        Task<bool> Insert(directorinsertmodel directorinsertmodel);
        Task<bool> Update(directorupdatemodel directorupdatemodel);
        Task<bool> Delete (int id);

        Task<director> Find(Expression<Func<director, bool>> match);
    }
}
