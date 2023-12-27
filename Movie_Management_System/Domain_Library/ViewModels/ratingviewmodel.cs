using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain_Library.ViewModels
{
    public class ratingviewmodel
    {
        public int Id { get; set; }
        public int mov_id { get; set; }
        public int rev_id { get; set; }
        public int rev_stars { get; set; }
       
    }
    public class RatingInputModel
    {
        
        public string MovTitle { get; set; }
        public string RevName { get; set; }
        public int RevStars { get; set; }
    }

    public class ratingupdatemodel
    {
        public int Id { get; set; }
    }
}
