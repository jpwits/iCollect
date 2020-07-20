using System;
using System.Collections.Generic;

namespace iCollect.Entities
{
    public partial class AlbumCatalogs
    {
        public int CatalogId { get; set; }
        public int AlbumId { get; set; }

        public virtual Albums Album { get; set; }
        public virtual Catalog Catalog { get; set; }
    }
}
