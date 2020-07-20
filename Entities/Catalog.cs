using System;
using System.Collections.Generic;

namespace iCollect.Entities
{
    public partial class Catalog
    {
        public Catalog()
        {
            AlbumCatalogs = new HashSet<AlbumCatalogs>();
            Sets = new HashSet<Sets>();
        }

        public int CatalogId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int? CatalogTypeId { get; set; }
        public bool? IsActive { get; set; }

        public virtual CatalogTypes CatalogType { get; set; }
        public virtual ICollection<AlbumCatalogs> AlbumCatalogs { get; set; }
        public virtual ICollection<Sets> Sets { get; set; }
    }
}
