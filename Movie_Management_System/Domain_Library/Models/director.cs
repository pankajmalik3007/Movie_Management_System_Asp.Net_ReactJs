using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Domain_Library.Models
{
    public  class director : BaseEntity
    {
        public string dir_firstname { get ; set; }
        public string dir_lastname { get ; set; }

        public DateTime dir_dob { get ; set; }
        [JsonIgnore]
        public virtual List<movie_direction> movie_directions { get; set; }
    }
}
