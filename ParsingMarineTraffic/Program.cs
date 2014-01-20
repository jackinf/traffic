using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using HtmlAgilityPack;

namespace ParsingMarineTraffic
{
    class Program
    {
        static void Main(string[] args)
        {
            WebClient client = new WebClient();
            String htmlCode = client.DownloadString("http://maritime-connector.com/ship/9100932/");

            HtmlDocument document = new HtmlDocument();
            document.LoadHtml(htmlCode);
            HtmlNodeCollection collection = document.DocumentNode.SelectNodes("//tr");
            foreach (HtmlNode tr in collection)
            {
                if (tr.HasChildNodes)
                {
                    foreach (var th in tr.SelectNodes("th"))
                    {
                        string target = th.InnerHtml;
                        Console.Write(target + ": ");
                    }

                    foreach (var td in tr.SelectNodes("td"))
                    {
                        string target = td.InnerHtml;
                        Console.WriteLine(target);
                    }
                }
            }

            //Console.WriteLine(htmlCode);
            Console.ReadKey();
        }
    }
}
