using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Domain_Library.Models
{
    public class movie_genres : BaseEntity
    {
        public int mov_id { get; set; }
        public int gen_id { get; set; }
        [JsonIgnore]

        public movie movie { get; set; }
        public genres genres { get; set; }
    }
}
