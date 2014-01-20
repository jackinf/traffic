using System;
using System.Collections.Generic;
using System.Net;
using HtmlAgilityPack;
using Microsoft.Ajax.Utilities;

namespace TrafficMVC.Commands
{
    public class SearchMarineTraffic
    {
        public Dictionary<string, string> marineTrafficData;
        private string Imo;

        public SearchMarineTraffic(string imo)
        {
            marineTrafficData = new Dictionary<string, string> { {"Success", "false"} };
            Imo = imo;
        }

        public bool Execute()
        {
            if (Imo.IsNullOrWhiteSpace())
                return false;

            // Get data from page
            WebClient client = new WebClient();
            String htmlCode = client.DownloadString(string.Format("http://maritime-connector.com/ship/{0}/", Imo)); // imo = 9100932

            // Parse data
            HtmlDocument document = new HtmlDocument();
            document.LoadHtml(htmlCode);
            HtmlNodeCollection allTableRows = document.DocumentNode.SelectNodes("//tr");

            if (allTableRows == null)
                return false;

            foreach (HtmlNode tableRow in allTableRows)
            {
                if (!tableRow.HasChildNodes) continue;
                var key = "";
                var value = "";
                foreach (var tableHeaderCell in tableRow.SelectNodes("th"))
                {
                    key = tableHeaderCell.InnerHtml.Trim();
                    break;
                }

                foreach (var tableCell in tableRow.SelectNodes("td"))
                {
                    value = tableCell.InnerHtml.Trim();
                    break;
                }
                if (!key.IsNullOrWhiteSpace())
                    marineTrafficData.Add(key, value);
            }

            marineTrafficData["Success"] = "true";
            return true;
        }

    }
}