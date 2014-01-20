using System.Linq;
using System.Web.Mvc;
using Core;
using Infrastructure.Models;

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
                var traffics = OpenErpConnection.GetConnection().GetEntities<Traffic>(c => true).ToList();
                return Json(traffics, JsonRequestBehavior.AllowGet);
            }
            catch
            {
                return Json(new { Success = false }, JsonRequestBehavior.AllowGet);
            }
        }
	}
}