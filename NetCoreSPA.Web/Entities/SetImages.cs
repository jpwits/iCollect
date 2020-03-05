using System;
using System.Collections.Generic;

namespace iCollect.Entities
{
    public partial class SetImages
    {
        public int Id { get; set; }
        public string Heading { get; set; }
        public short? PageNo { get; set; }
        public string Path { get; set; }
        public int SetId { get; set; }
        public int ImageId { get; set; }
        public byte[] Thumbnail { get; set; }
        public byte[] Image { get; set; }
        public bool? IsActive { get; set; }
        public int? Position { get; set; }
        public string Type { get; set; }

        public virtual Sets Set { get; set; }
    }
}
