using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Domain_Library.Models
{
    public class movie : BaseEntity
    {
        public string mov_title { get; set; }
        public string mov_year { get; set; }
        public string mov_time { get; set; }
        public string mov_language { get; set; }
        public DateTime mov_dt_rel { get; set; }

        public string mov_rel_country { get; set; }

        public float? num_of_rating { get; set; }
        [JsonIgnore]

        public virtual List<movie_cast> mov_casts { get; set; }
        public virtual List<movie_direction> mov_directions { get; set; }

        public virtual List<movie_genres> mov_genres { get; set;}

        public virtual List<rating> mov_rating { get; set; }
    }
}
