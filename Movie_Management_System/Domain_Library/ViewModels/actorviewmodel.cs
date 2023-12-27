using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain_Library.ViewModels
{
    public class actorviewmodel
    {
        public int Id { get; set; }
        public string act_firstname { get; set; }
        public string act_lastname { get; set; }
        public string act_gender { get; set; }

        public DateTime act_dob { get; set; }

        public List<movie_castviewmodel> MovieCasts { get; set; }

    }

    public class actorinsertmodel
    {
        public string act_firstname { get; set; }
        public string act_lastname { get; set; }
        public string act_gender { get; set; }

        public DateTime act_dob { get; set; }

       
    }

    public class actorupdatemodel : actorinsertmodel
    {
        public int Id { get; set; }
    }
}
