using System.ComponentModel;
using Infrastructure.Generic;
using Jlob.OpenErpNet;

namespace Infrastructure.Models
{
    [OpenErpMap("enk.traffic")]
    public class Traffic : BaseModel
    {
        [DisplayName("ID")]
        [OpenErpMap("id")]
        public int ID { get; set; }
        [DisplayName("Update Date")]
        [OpenErpMap("updated")]
        public string UpdateDate { get; set; }
        [DisplayName("Name")]
        [OpenErpMap("name")]
        public string Name { get; set; }
        [DisplayName("IMO")]
        [OpenErpMap("imo")]
        public string IMO { get; set; }
        [DisplayName("Ship Type")]
        [OpenErpMap("ship_type_str")]
        public string ShipType { get; set; }
        [DisplayName("MMSI")]
        [OpenErpMap("mmsi")]
        public string MMSI { get; set; }
        [DisplayName("Gross Tonnage")]
        [OpenErpMap("gross_tonnage")]
        public double GrossTonnage { get; set; }
        [DisplayName("DWT")]
        [OpenErpMap("death_weight_tonnage")]
        public double DeathWeightTonnage { get; set; }
        [DisplayName("Year of build")]
        [OpenErpMap("year_of_build")]
        public int YearOfBuild { get; set; }
        [DisplayName("Builder")]
        [OpenErpMap("builder")]
        public string Builder { get; set; }
        [DisplayName("Flag")]
        [OpenErpMap("flag_str")]
        public string Flag { get; set; }
        [DisplayName("Home Port")]
        [OpenErpMap("home_port_str")]
        public string HomePort { get; set; }
        [DisplayName("Class Society")]
        [OpenErpMap("class_society")]
        public string ClassSociety { get; set; }
        //[OpenErpMap("manager_and_owner")]
        //public string ManagerAndOwner { get; set; }
        [DisplayName("Manager")]
        [OpenErpMap("manager")]
        public string Manager { get; set; }
        [DisplayName("Owner")]
        [OpenErpMap("owner")]
        public string Owner { get; set; }
        [DisplayName("Former Names")]
        [OpenErpMap("former_names")]
        public string FormerNames { get; set; }
        public int RowNumber { get; set; }
        /*
         *  Variables for replacing primary keys
         */
        //public string ShipTypeStr { get; set; }
        //public string FlagStr { get; set; }
        //public string HomePortStr { get; set; }
    }
}
