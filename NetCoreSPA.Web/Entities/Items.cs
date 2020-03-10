using System;
using System.Collections.Generic;

namespace iCollect.Entities
{
    public partial class Items
    {
        public int ImageId { get; set; }
        public string Description { get; set; }
        public short? DelPageNo { get; set; }
        public string DelPath { get; set; }
        public int SetId { get; set; }
        public int DelImageId { get; set; }
        public byte[] Thumbnail { get; set; }
        public byte[] Image { get; set; }
        public bool? IsActive { get; set; }
        public int? Position { get; set; }
        public string Type { get; set; }

        public virtual Sets Set { get; set; }
    }
}
