using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain_Library.ViewModels
{
    public class movie_castviewmodel
    {
        public int Id { get; set; }
        public int act_id { get; set; }
        public int mov_id { get; set; }
        public string act_firstname { get; set; }
        public string mov_title { get; set; }
        public string role { get; set; }

    }

    public class movie_castinsertmodel
    {
        public int act_id { get; set; }
        public int mov_id { get; set; }
        public string role { get; set; }

    }
    public class movie_castupdatemodel : movie_castinsertmodel
    {
        public int Id { get; set; }
    }
}
