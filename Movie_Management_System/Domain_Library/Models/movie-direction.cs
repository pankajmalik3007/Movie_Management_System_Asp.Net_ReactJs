using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Domain_Library.Models
{
    public class movie_direction: BaseEntity
    {
        public int dir_id { get; set; }
        public int mov_id { get; set; }
        [JsonIgnore]

        public director director { get; set; }
        public movie movie { get; set; }
    }
}
