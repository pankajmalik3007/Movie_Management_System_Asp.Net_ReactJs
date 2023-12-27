using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Domain_Library.Models
{
    public class actor : BaseEntity
    {
        public string 	act_firstname {get; set;}
        public string act_lastname {get; set;}
        public string act_gender  { get; set;}

        public DateTime act_dob { get; set;}

        [JsonIgnore]

        public virtual List<movie_cast> movie_cast { get; set;}
    }
}
