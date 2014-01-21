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

        private void AddRowNumbersToTraffics(List<Traffic> traffics)
        {
            for (var i = 1; i <= traffics.Count; i++)
            {
                traffics[i - 1].RowNumber = i;
            }
        }
	}
}