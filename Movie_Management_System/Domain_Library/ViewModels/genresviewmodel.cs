using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain_Library.ViewModels
{
    public class genresviewmodel
    {
        public int Id { get; set; }
        public string gen_title { get; set; }
    }
    public class genresinsertmodel
    {
        public string gen_title { get; set; }

    }
    public class genresupdatemodel : genresinsertmodel
    {
        public int Id { get; set; }

    }
}
