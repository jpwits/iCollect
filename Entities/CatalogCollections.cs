using System;
using System.Collections.Generic;

namespace iCollect.Entities
{
    public partial class CatalogCollections
    {
        public int CatalogId { get; set; }
        public int CollectionId { get; set; }
        public bool? IsMaster { get; set; }

        public virtual Catalog Catalog { get; set; }
        public virtual Collections Collection { get; set; }
    }
}
