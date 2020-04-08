using System;
using System.Collections.Generic;

namespace iCollect.Entities
{
    public partial class Images
    {
        public Images()
        {
            ItemsImageIdANavigation = new HashSet<Items>();
            ItemsImageIdBNavigation = new HashSet<Items>();
        }

        public int ImageId { get; set; }
        public int? DelItemId { get; set; }
        public byte[] Image { get; set; }
        public string Type { get; set; }

        public virtual ICollection<Items> ItemsImageIdANavigation { get; set; }
        public virtual ICollection<Items> ItemsImageIdBNavigation { get; set; }
    }
}
