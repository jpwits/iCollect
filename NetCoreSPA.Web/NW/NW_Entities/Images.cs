using System;
using System.Collections.Generic;

namespace iCollect.NW.NW_Entities
{
    public partial class Images
    {
        public int ImageId { get; set; }
        public int? SetId { get; set; }
        public int? CoinId { get; set; }
        public byte[] Image { get; set; }
        public bool? IsActive { get; set; }
        public int? DisplayOrder { get; set; }
        public string InitPath { get; set; }
        public byte[] Thumbnail { get; set; }
    }
}
