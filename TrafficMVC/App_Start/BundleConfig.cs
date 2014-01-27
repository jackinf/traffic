using System.Web;
using System.Web.Optimization;

namespace TrafficMVC
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js",
                      "~/Scripts/respond.js"));

            bundles.Add(new StyleBundle("~/bundles/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/site.css"));

            bundles.Add(new ScriptBundle("~/bundles/Scripts/angular").Include(
                "~/Scripts/angular.js",
                "~/Scripts/angular-route.js",
                "~/Scripts/angular-resource.js",
                "~/Scripts/app.js"));

            bundles.Add(new StyleBundle("~/bundles/Content/helpers").Include(
                "~/Content/flick/jquery-ui-1.10.4.custom.min.css"));

            bundles.Add(new ScriptBundle("~/bundles/Scripts/helpers").Include(
                "~/Scripts/helpers/sugar.js",
                "~/Scripts/helpers/jquery-ui-1.10.4.autocomplete.min.js"));
        }
    }
}
