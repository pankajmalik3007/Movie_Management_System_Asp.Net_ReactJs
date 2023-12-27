using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Domain_Library.Models
{
    public class rating: BaseEntity
    {
        public int mov_id { get; set; }
        public int rev_id { get; set; }
        public int rev_stars { get; set; }
       
        [JsonIgnore]
        public movie movie { get; set; }

        public reviewer reviewer { get; set; }
    }
}
