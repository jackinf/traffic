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

        public ActionResult SaveChanges(int id, string name)
        {
            try
            {
                var traffic = OpenErpConnection.GetConnection().GetEntity<Traffic>(c => c.ID == id);
                if (traffic != null)
                {
                    traffic.Name = name;
                    OpenErpConnection.GetConnection().UpdateEntity(traffic);
                }
                return Json(new {Success = true, Traffic = traffic});
            }
            catch
            {
                return Json(new {Success = false});
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