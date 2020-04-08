using System;
using System.Collections.Generic;

namespace iCollect.Entities
{
    public partial class Items
    {
        public Items()
        {
            UserItems = new HashSet<UserItems>();
        }

        public int ItemId { get; set; }
        public string Description { get; set; }
        public int SetId { get; set; }
        public byte[] Thumbnail { get; set; }
        public byte[] DelImage { get; set; }
        public bool? IsActive { get; set; }
        public int? Position { get; set; }
        public string Type { get; set; }
        public string Denominator { get; set; }
        public decimal? Mass { get; set; }
        public string MetalContent { get; set; }
        public decimal? Dimention { get; set; }
        public string Weight { get; set; }
        public int? ImageIdA { get; set; }
        public int? ImageIdB { get; set; }
        public byte[] ThumbnailA { get; set; }
        public byte[] ThumbnailB { get; set; }

        public virtual Images ImageIdANavigation { get; set; }
        public virtual Images ImageIdBNavigation { get; set; }
        public virtual Sets Set { get; set; }
        public virtual ICollection<UserItems> UserItems { get; set; }
    }
}
