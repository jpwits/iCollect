using System;
using System.Collections.Generic;

namespace iCollect.Entities
{
    public partial class CatalogTypes
    {
        public CatalogTypes()
        {
            Catalog = new HashSet<Catalog>();
        }

        public int CatalogTypeId { get; set; }
        public string Type { get; set; }

        public virtual ICollection<Catalog> Catalog { get; set; }
    }
}
