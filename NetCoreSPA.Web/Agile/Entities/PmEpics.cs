using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace iCollect.NW_Entities
{
    public partial class PmEpics
    {
        public PmEpics()
        {
            PmProjectEpicLink = new HashSet<PmProjectEpicLink>();
        }

        public int PmEpicId { get; set; }
        public string PmEpicName { get; set; }

        [JsonIgnore]
        public virtual ICollection<PmProjectEpicLink> PmProjectEpicLink { get; set; }
    }
}
