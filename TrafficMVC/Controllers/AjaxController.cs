using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using Core;
using Infrastructure.Models;
using TrafficMVC.Commands;

namespace TrafficMVC.Controllers
{
    public class AjaxController : Controller
    {
        //
        // GET: /Ajax/
        public ActionResult GetAllTraffic()
        {
            try
            {
                var traffics = OpenErpConnection.GetConnection().GetEntities<Traffic>(c => true).OrderByDescending(c => c.UpdateDate).ToList();
                AddRowNumbersToTraffics(traffics);
                return Json(traffics, JsonRequestBehavior.AllowGet);
            }
            catch
            {
                return Json(new { Success = false }, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult ParseMarineTrafficData(string imo)
        {
            var cmd = new SearchMarineTraffic(imo);
            cmd.Execute();
            return Json(cmd.marineTrafficData, JsonRequestBehavior.AllowGet);
        }

        public ActionResult SaveChanges(int id, string name, string imo, string shiptype,
            string mmsi, double gt, double dwt, int yob, string builder, string flag,
            string homeport, string cs, string manager, string owner, string fn)
        {
            try
            {
                var traffic = OpenErpConnection.GetConnection().GetEntity<Traffic>(c => c.ID == id);
                if (traffic != null)
                {
                    traffic.Name = name;
                    traffic.IMO = imo;
                    traffic.ShipType = shiptype;
                    traffic.MMSI = mmsi;
                    traffic.GrossTonnage = gt;
                    traffic.DeathWeightTonnage = dwt;
                    traffic.YearOfBuild = yob;
                    traffic.Builder = builder;
                    traffic.Flag = flag;
                    traffic.HomePort = homeport;
                    traffic.ClassSociety = cs;
                    traffic.Manager = manager;
                    traffic.Owner = owner;
                    traffic.FormerNames = fn;
                    OpenErpConnection.GetConnection().UpdateEntity(traffic);
                }
                return Json(new {Success = true, Traffic = traffic});
            }
            catch
            {
                return Json(new {Success = false});
            }

        }

        [HttpPost]
        public ActionResult DeleteRecord(int id)
        {
            try
            {
                var traffic = OpenErpConnection.GetConnection().GetEntity<Traffic>(c => c.ID == id);
                OpenErpConnection.GetConnection().DeleteEntity(traffic);
                return Json(new {Success = true}, JsonRequestBehavior.AllowGet);
            }
            catch
            {
                return Json(new {Success = false}, JsonRequestBehavior.AllowGet);
            }
        }

        private void AddRowNumbersToTraffics(List<Traffic> traffics)
        {
            for (var i = 1; i <= traffics.Count; i++)
            {
                traffics[i - 1].RowNumber = i;
            }
        }
	}
}