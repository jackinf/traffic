using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using Core;

namespace TrafficMVC
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            OpenErpConnection.Connect("http://jevgenir.cloudapp.net:8069", "2014_jan_18", "admin", "adminka25");
            //OpenErpConnection.Connect("http://localhost:8069", "test", "admin", "admin");
            AreaRegistration.RegisterAllAreas();
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
        }
    }
}
