using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain_Library.ViewModels
{
    public class directorviewmodel
    {
        public int Id { get; set; }
        public string dir_firstname { get; set; }
        public string dir_lastname { get; set; }

        public DateTime dir_dob { get; set; }
    }
    public class directorinsertmodel
    {
        public string dir_firstname { get; set; }
        public string dir_lastname { get; set; }

        public DateTime dir_dob { get; set; }
    }
    public class directorupdatemodel : directorinsertmodel
    {
        public int Id { get; set; }
    }
}
