using Infrastructure.Generic;
using Jlob.OpenErpNet;

namespace Infrastructure.Models
{
    [OpenErpMap("enk.port")]
    class Port : BaseModel
    {
        [OpenErpMap("id")]
        public int ID { get; set; }
        [OpenErpMap("name")]
        public string Name { get; set; }
    }
}
