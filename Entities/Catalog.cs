using System;
using System.Collections.Generic;

namespace iCollect.Entities
{
    public partial class Catalog
    {
        public Catalog()
        {
            CatalogCollections = new HashSet<CatalogCollections>();
            Sets = new HashSet<Sets>();
        }

        public int CatalogId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int? CatalogTypeId { get; set; }
        public bool? IsActive { get; set; }
        public DateTime? SStartDate { get; set; }
        public DateTime? SEndDate { get; set; }

        public virtual CatalogTypes CatalogType { get; set; }
        public virtual ICollection<CatalogCollections> CatalogCollections { get; set; }
        public virtual ICollection<Sets> Sets { get; set; }
    }
}
