using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain_Library.ViewModels
{
    public class movie_directionviewmodel
    {
        public int Id { get; set; }
        public int dir_id { get; set; }
        public int mov_id { get; set; }
        public string dir_firstname { get; set; }
        public string mov_title { get; set; }
    }
    public class movie_directionInsertmodel
    {
       
        public string dir_firstname  { get; set; }
        public string mov_title { get; set; }
    }
    public class movie_directionupdatemodel : movie_directionInsertmodel
    {

        public int Id { get; set; }
    }
}
