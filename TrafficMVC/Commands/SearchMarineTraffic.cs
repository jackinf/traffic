using System;
using System.Collections.Generic;
using System.Net;
using Core;
using HtmlAgilityPack;
using Infrastructure.Models;
using Microsoft.Ajax.Utilities;

namespace TrafficMVC.Commands
{
    public class SearchMarineTraffic
    {
        public Dictionary<string, string> marineTrafficData;
        private string Imo;

        public SearchMarineTraffic(string imo)
        {
            marineTrafficData = new Dictionary<string, string> { {"Success", "false"}, {"Duplicate", "false"} };
            Imo = imo;
        }

        public bool Execute()
        {
            try
            {
                if (Imo.IsNullOrWhiteSpace())
                    return false;

                // Get data from page
                WebClient client = new WebClient();
                String htmlCode = client.DownloadString(string.Format("http://maritime-connector.com/ship/{0}/", Imo)); // imo = 9100932

                // Search all table rows
                HtmlDocument document = new HtmlDocument();
                document.LoadHtml(htmlCode);
                HtmlNodeCollection allTableRows = document.DocumentNode.SelectNodes("//tr");

                // Exit if no rows were found
                if (allTableRows == null)
                    return false;

                foreach (HtmlNode tableRow in allTableRows)
                {
                    // skip this table row if it does not contain anything
                    if (!tableRow.HasChildNodes) continue;

                    var key = "";
                    var value = "";

                    // Get header name
                    foreach (var tableHeaderCell in tableRow.SelectNodes("th"))
                    {
                        key = tableHeaderCell.InnerHtml.Trim();
                        break;
                    }

                    // Get value name
                    foreach (var tableCell in tableRow.SelectNodes("td"))
                    {
                        value = tableCell.InnerHtml.Trim();
                        break;
                    }

                    // check only if key exists, and store key-value pair
                    if (!key.IsNullOrWhiteSpace())
                        marineTrafficData.Add(key, value);
                }
            }
            catch
            {
                
            }

            marineTrafficData["Success"] = "true";

            // Check if IMO already exists
            var dublicateValue = OpenErpConnection.GetConnection().GetEntity<Traffic>(c => c.IMO == Imo);
            if (dublicateValue != null)
                marineTrafficData["Duplicate"] = "true";

            return true;
        }

    }
}