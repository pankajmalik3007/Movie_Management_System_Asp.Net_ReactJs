using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain_Library.ViewModels
{
    public class movie_genresviewmodel
    {
        public int Id { get; set; }
        public int mov_id { get; set; }
        public int gen_id { get; set; }
        public string mov_title { get; set; }
        public string gen_title { get; set; }
    }
    public class movie_genresinsertmodel
    {
      
        public string Movie_name { get; set; }
        public string Gen_title { get; set; }
    }
    public class movie_genresupdatemodel : movie_genresinsertmodel
    {

        public int Id { get; set; }
    }
}
