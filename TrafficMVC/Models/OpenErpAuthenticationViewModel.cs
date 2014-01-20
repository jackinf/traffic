using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TrafficMVC.Models
{
    public class OpenErpAuthenticationViewModel
    {
        public string Url { get; set; }
        public string Database { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string ErrorMessage { get; set; }
    }
}