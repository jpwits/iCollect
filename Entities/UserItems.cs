using System;
using System.Collections.Generic;

namespace iCollect.Entities
{
    public partial class UserItems
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public int ItemId { get; set; }
        public int? Quantity { get; set; }
        public int? CollectionId { get; set; }

        public virtual Collections Collection { get; set; }
        public virtual Items Item { get; set; }
    }
}
