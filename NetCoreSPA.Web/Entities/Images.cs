using System;
using System.Collections.Generic;

namespace iCollect.Entities
{
    public partial class Images
    {
        public int ImageId { get; set; }
        public int? ItemId { get; set; }
        public byte[] Image { get; set; }

        public virtual Items Item { get; set; }
    }
}
