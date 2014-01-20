using Jlob.OpenErpNet;

namespace Core
{
    public static class OpenErpConnection
    {
        private static OpenErpService Service { get; set; }

        public static void Connect(string url, string db, string username, string password)
        {
            Service = new OpenErpService(url, db, username, password);
        }

        public static OpenErpService GetConnection()
        {
            return Service;
        }
    }
}
