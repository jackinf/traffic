using System;
using System.Web.Mvc;
using Core;
using Infrastructure.Models;
using TrafficMVC.Commands;

namespace TrafficMVC.Controllers
{
    public class TrafficController : Controller
    {
        //
        // GET: /Traffic/
        public ActionResult Index()
        {
            if (!IsLoggedIn())
                return RedirectToAction("Authenticate", "Home");
            //return View(OpenErpConnection.GetConnection().GetEntities<Traffic>(c => true));
            return View("DynamicList");
        }

        //
        // GET: /Traffic/DynamicList
        public ActionResult DynamicList()
        {
            if (!IsLoggedIn())
                return RedirectToAction("Authenticate", "Home");
            return View();
        }

        //
        // GET: /Traffic/Details/5
        public ActionResult Details(int id)
        {
            if (!IsLoggedIn())
                return RedirectToAction("Authenticate", "Home");

            var traffic = new Traffic {ID = id};
            return View(OpenErpConnection.GetConnection().GetEntity<Traffic>(e => e.ID == traffic.ID));
        }

        //
        // GET: /Traffic/Create
        public ActionResult Create()
        {
            if (!IsLoggedIn())
                return RedirectToAction("Authenticate", "Home");
            return View();
        }

        //
        // POST: /Traffic/Create
        [HttpPost]
        public ActionResult Create(Traffic traffic)
        {
            try
            {
                var now = DateTime.Now;
                traffic.UpdateDate = string.Format("{0}/{1}/{2} {3}:{4}:{5}", now.Year, now.Month, now.Day, now.Hour,
                    now.Minute, now.Second);
                OpenErpConnection.GetConnection().AddEntity(traffic);
                return RedirectToAction("Index");
            }
            catch (Exception ex)
            {
                return View();
            }
        }

        //
        // GET: /Traffic/Edit/5
        public ActionResult Edit(int id)
        {
            if (!IsLoggedIn())
                return RedirectToAction("Authenticate", "Home");
            var traffic = new Traffic { ID = id };
            return View(OpenErpConnection.GetConnection().GetEntity<Traffic>(e => e.ID == traffic.ID));
        }

        //
        // POST: /Traffic/Edit/5
        [HttpPost]
        public ActionResult Edit(Traffic traffic)
        {
            try
            {
                var now = DateTime.Now;
                traffic.UpdateDate = string.Format("{0}/{1}/{2} {3}:{4}:{5}", now.Year, now.Month, now.Day, now.Hour,
                    now.Minute, now.Second);
                OpenErpConnection.GetConnection().UpdateEntity(traffic);
                return RedirectToAction("Index");
            }
            catch (Exception ex)
            {
                return View();
            }
        }

        //
        // GET: /Traffic/Delete/5
        public ActionResult Delete(int id)
        {
            if (!IsLoggedIn())
                return RedirectToAction("Authenticate", "Home");
            var traffic = new Traffic { ID = id };
            return View(OpenErpConnection.GetConnection().GetEntity<Traffic>(e => e.ID == traffic.ID));
        }

        //
        // POST: /Traffic/Delete/5
        [HttpPost]
        public ActionResult Delete(Traffic traffic)
        {
            try
            {
                OpenErpConnection.GetConnection().DeleteEntity(traffic);
                return RedirectToAction("Index");
            }
            catch (Exception ex)
            {
                return View();
            }
        }

        public ActionResult ParseMarineTrafficData(string imo)
        {
            var cmd = new SearchMarineTraffic(imo);
            cmd.Execute();
            return Json(cmd.marineTrafficData, JsonRequestBehavior.AllowGet);
        }

        private bool IsLoggedIn()
        {
            //var loggedIn = Session["loggedin"];
            //return loggedIn != null && ((bool)loggedIn);
            return true;
        }
    }
}
