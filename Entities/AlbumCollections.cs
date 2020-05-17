using System;
using System.Collections.Generic;

namespace iCollect.Entities
{
    public partial class AlbumCollections
    {
        public int CollectionId { get; set; }
        public int AlbumId { get; set; }

        public virtual Albums Album { get; set; }
        public virtual Collections Collection { get; set; }
    }
}
