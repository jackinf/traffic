using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Helpers;
using System.Web.Mvc;
using Core;
using Infrastructure.Models;

namespace TrafficMVC.Controllers
{
    public class DemoController : Controller
    {
        public ActionResult AutoComplete()
        {
            OpenErpConnection.Connect("http://jevgenir.cloudapp.net:8069", "2014_jan_18", "admin", "adminka25");
            return View();
        }

        public ActionResult GetOwners()
        {
            var connection = OpenErpConnection.GetConnection();
            var owners = connection.GetEntities<Traffic>(c => true).Where(c => c.Owner != null).Distinct().ToList();
            return Json(new { results = owners }, JsonRequestBehavior.AllowGet);
        }
	}
}