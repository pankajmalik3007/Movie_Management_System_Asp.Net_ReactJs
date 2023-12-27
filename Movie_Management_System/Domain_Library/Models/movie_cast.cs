using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Domain_Library.Models
{
    public class movie_cast : BaseEntity
    {
        public int act_id { get; set; }
        public int mov_id { get; set; }

        public string role { get; set; }
        [JsonIgnore]

        public actor actor { get; set; }

        public movie movie { get; set; }
    }
}
