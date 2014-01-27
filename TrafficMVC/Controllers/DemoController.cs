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

        public ActionResult GetOwners(string searchValue)
        {
            var connection = OpenErpConnection.GetConnection();
            var entities = connection.GetEntities<Traffic>(c => true).ToList();
            var notNullEntities = entities.Where(c => c.Owner != null).Take(20);
            var foundOwners = notNullEntities.Distinct().ToList();
            return Json(new { data = new { results = foundOwners}}, JsonRequestBehavior.AllowGet);
        }
	}
}