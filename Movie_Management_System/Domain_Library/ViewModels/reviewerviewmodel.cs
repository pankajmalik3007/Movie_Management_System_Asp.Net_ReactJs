using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain_Library.ViewModels
{
    public class reviewerviewmodel
    {
        public int Id { get; set; }
        public string rev_name { get; set; }
        public DateTime rev_dob { get; set; }
        public string rev_address { get; set; }
        public string rev_country { get; set; }
        public string rev_state { get; set; }
        public string rev_city { get; set; }
        public int rev_pincode { get; set; }
        public string rev_phone_no { get; set; }
    }
    public class reviewinsertmodel
    {
       
        public string rev_name { get; set; }
        public DateTime rev_dob { get; set; }
        public string rev_address { get; set; }
        public string rev_country { get; set; }
        public string rev_state { get; set; }
        public string rev_city { get; set; }
        public int rev_pincode { get; set; }
        public string rev_phone_no { get; set; }
    }
    public class reviewupdatemodel : reviewinsertmodel
    {
        public int Id { get; set; }
    }
}
