using System.Web.Mvc;
using Core;
using Infrastructure.Models;
using TrafficMVC.Models;

namespace TrafficMVC.Controllers
{
    public class HomeController : Controller
    {
        [HttpGet]
        public ActionResult Authenticate()
        {
            return View(new OpenErpAuthenticationViewModel());
        }

        [HttpPost]
        public ActionResult Authenticate(OpenErpAuthenticationViewModel viewModel)
        {
            try
            {
                OpenErpConnection.Connect(viewModel.Url, viewModel.Database, viewModel.Username, viewModel.Password);
                OpenErpConnection.GetConnection().GetEntities<Traffic>(c => true);  // if this fails then connection is invalid
                Session["loggedin"] = true;
                return RedirectToAction("Index", "Traffic");
            }
            catch
            {
                Session["loggedin"] = false;
                return View(viewModel);
            }
        }

        [HttpGet]
        public ActionResult Disconnect()
        {
            Session["loggedin"] = null;
            return RedirectToAction("Authenticate");
        }
    }
}