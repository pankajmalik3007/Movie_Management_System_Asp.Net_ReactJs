using Domain_Library.Models;
using Domain_Library.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure_Library.Services.Custom_Services.RatingServices
{
    public interface IReviewerService
    {
        Task<ICollection<reviewerviewmodel>> GetAll();
        Task<reviewerviewmodel> Get(int id);
        Task<bool> Insert(reviewinsertmodel model);
        Task<bool> Update(reviewupdatemodel model);
        Task<bool> Delete(int id);
        Task<reviewer> Find(Expression<Func<reviewer , bool>> predicate);
    }
}
