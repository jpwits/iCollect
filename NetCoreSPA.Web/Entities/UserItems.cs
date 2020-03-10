using System;
using System.Collections.Generic;

namespace iCollect.Entities
{
    public partial class UserItems
    {
        public string UserId { get; set; }
        public int? ItemId { get; set; }

        public virtual Items Item { get; set; }
    }
}
