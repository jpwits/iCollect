using System;
using System.Collections.Generic;

namespace iCollect.Entities
{
    public partial class CollectionTypes
    {
        public CollectionTypes()
        {
            Collections = new HashSet<Collections>();
        }

        public int CollectionTypeId { get; set; }
        public string Type { get; set; }

        public virtual ICollection<Collections> Collections { get; set; }
    }
}
