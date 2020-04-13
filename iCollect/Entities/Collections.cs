using System;
using System.Collections.Generic;

namespace iCollect.Entities
{
    public partial class Collections
    {
        public Collections()
        {
            Sets = new HashSet<Sets>();
        }

        public int CollectionId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        public virtual ICollection<Sets> Sets { get; set; }
    }
}
