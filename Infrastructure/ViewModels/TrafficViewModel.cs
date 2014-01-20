namespace Infrastructure.ViewModels
{
    public class TrafficViewModel
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string IMO { get; set; }
        public int ShipType { get; set; }
        public string MMSI { get; set; }
        public double GrossTonnage { get; set; }
        public double DeathWeightTonnage { get; set; }
        public int YearOfBuild { get; set; }
        public string Builder { get; set; }
        public int FlagID { get; set; }
        public int HomePortID { get; set; }
        public string ClassSociety { get; set; }
        public string ManagerAndOwner { get; set; }
        public string FormerNames { get; set; }
    }
}
