<div align="center">

# Traffic

### ASP.NET MVC app for scraping and managing marine vessel data

[![C#](https://img.shields.io/badge/C%23-512BD4?style=for-the-badge&logo=csharp&logoColor=white)](https://learn.microsoft.com/dotnet/csharp/)
[![ASP.NET MVC](https://img.shields.io/badge/ASP.NET%20MVC%205-512BD4?style=for-the-badge&logo=dotnet&logoColor=white)](https://dotnet.microsoft.com/apps/aspnet/mvc)
[![AngularJS](https://img.shields.io/badge/AngularJS-DD0031?style=for-the-badge&logo=angularjs&logoColor=white)](https://angularjs.org/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)](https://getbootstrap.com/)
[![HtmlAgilityPack](https://img.shields.io/badge/HtmlAgilityPack-000000?style=for-the-badge&logoColor=white)](https://html-agility-pack.net/)
[![Repo](https://img.shields.io/badge/GitHub-jackinf%2Ftraffic-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/jackinf/traffic)

</div>

## Overview

Traffic is an ASP.NET MVC 5 web application for collecting and managing marine vessel
information. Given a ship's IMO number, it scrapes vessel details (name, ship type, MMSI,
gross tonnage, deadweight, year of build, builder, flag, home port, owner, and more) from
[maritime-connector.com](http://maritime-connector.com) using HtmlAgilityPack, and persists
the records through an OpenERP backend connection. The web UI, built with AngularJS and
Bootstrap, lets you browse, create, edit, and delete vessel entries behind a simple
authentication gate.

## Features

- Scrape vessel data from a public maritime database by IMO number (`SearchMarineTraffic` command).
- Duplicate detection against already-stored vessels before saving.
- CRUD views for vessel records (Index, Details, Create, Edit, Delete, dynamic list).
- AngularJS-powered dynamic list with AJAX endpoints (`AjaxController`).
- Authentication gate guarding the vessel management area (`HomeController` / `Authenticate`).
- Rich vessel model covering IMO, MMSI, tonnage, flag, home port, class society, manager, and owner.
- Standalone console scraper (`ParsingMarineTraffic`) for ad-hoc IMO lookups.

## Tech Stack

| Area | Technology |
| --- | --- |
| Language | C# (.NET Framework 4.5) |
| Web framework | ASP.NET MVC 5, Razor |
| Frontend | AngularJS 1.2, jQuery, Bootstrap 3, Modernizr |
| HTML scraping | HtmlAgilityPack |
| Serialization | Newtonsoft.Json |
| Data backend | OpenERP (via `Jlob.OpenErpNet`) |
| Bundling | ASP.NET Web Optimization, WebGrease |

## Getting Started

### Prerequisites

- Windows with the .NET Framework 4.5 developer pack
- Visual Studio 2013 or newer (the solution targets the VS 2013 format)
- IIS or IIS Express to host the MVC app
- A reachable OpenERP instance for data persistence

### Installation

```bash
git clone https://github.com/jackinf/traffic.git
cd traffic
```

Open `Traffic.sln` in Visual Studio and restore NuGet packages (Visual Studio restores them
automatically on build, or run **Restore NuGet Packages** from the solution context menu).

### Running

- **Web app** — Set `TrafficMVC` as the startup project and run it (F5) to launch the site in
  IIS Express. Configure the OpenERP connection in `Core/OpenErpConnection.cs` and the app
  settings in `TrafficMVC/Web.config`.
- **Console scraper** — Set `ParsingMarineTraffic` as the startup project and run it to fetch
  and print vessel details for the hard-coded IMO in `ParsingMarineTraffic/Program.cs`.

> Note: this is a Visual Studio / MSBuild solution with no Makefile or CLI build scripts;
> build and run through Visual Studio (or `msbuild Traffic.sln`).

## Project Structure

```
traffic/
├── Core/                   # OpenERP connection bootstrap
├── Infrastructure/         # Domain models (Traffic, Flag, Port, ShipType) and view models
├── ParsingMarineTraffic/   # Standalone console scraper (HtmlAgilityPack)
├── TrafficMVC/             # ASP.NET MVC web app (controllers, views, AngularJS scripts)
└── Traffic.sln             # Visual Studio solution
```
