using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Domain_Library.Models
{
    public class genres : BaseEntity
    {
        public string gen_title { get; set; }
        [JsonIgnore]

        public virtual List<movie_genres> Movie_Genres { get; set; }
    }
}
