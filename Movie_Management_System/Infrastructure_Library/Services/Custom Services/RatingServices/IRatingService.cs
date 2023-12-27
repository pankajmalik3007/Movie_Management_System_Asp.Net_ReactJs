using Domain_Library.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure_Library.Services.Custom_Services.RatingServices
{
    public interface IRatingService
    {
        Task<ICollection<ratingviewmodel>> GetAll();
        Task<bool> InsertRating(RatingInputModel inputModel);


    }
}
