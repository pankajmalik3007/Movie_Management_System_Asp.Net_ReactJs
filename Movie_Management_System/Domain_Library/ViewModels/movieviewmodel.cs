using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain_Library.ViewModels
{
    public class movieviewmodel
    {
        public int Id { get; set; }
        public string mov_title { get; set; }
        public string mov_year { get; set; }
        public string mov_time { get; set; }
        public string mov_language { get; set; }
        public DateTime mov_dt_rel { get; set; }
        public float? num_of_rating { get; set; }
        public string mov_rel_country { get; set; }
    }
    public class movieinsertmodel
    {
        public string mov_title { get; set; }
        public string mov_year { get; set; }
        public string mov_time { get; set; }
        public string mov_language { get; set; }
        public DateTime mov_dt_rel { get; set; }

        public string mov_rel_country { get; set; }
    }

    public class movieupdatemodel : movieinsertmodel
    {
        public int Id { get; set; }
    }
}
