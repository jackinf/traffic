using Infrastructure.Generic;
using Jlob.OpenErpNet;

namespace Infrastructure.Models
{
    class Flag : BaseModel
    {
        [OpenErpMap("res.country")]
        public class Country
        {
            [OpenErpMap("id")]
            public int ID { get; set; }
            [OpenErpMap("name")]
            public string Name { get; set; }
        }
    }
}
