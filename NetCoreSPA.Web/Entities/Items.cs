using System;
using System.Collections.Generic;

namespace iCollect.Entities
{
    public partial class Items
    {
        public Items()
        {
            Images = new HashSet<Images>();
            UserItems = new HashSet<UserItems>();
        }

        public int ItemId { get; set; }
        public string Description { get; set; }
        public int SetId { get; set; }
        public byte[] Thumbnail { get; set; }
        public byte[] Image { get; set; }
        public bool? IsActive { get; set; }
        public int? Position { get; set; }
        public string Type { get; set; }
        public string Denominator { get; set; }
        public decimal? Mass { get; set; }
        public string MetalContent { get; set; }
        public decimal? Dimention { get; set; }
        public string Weight { get; set; }

        public virtual Sets Set { get; set; }
        public virtual ICollection<Images> Images { get; set; }
        public virtual ICollection<UserItems> UserItems { get; set; }
    }
}
