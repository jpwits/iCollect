using System;
using System.Collections.Generic;

namespace iCollect.NW.NW_Entities
{
    public partial class Sets
    {
        public Sets()
        {
            SetImages = new HashSet<SetImages>();
        }

        public int SetId { get; set; }
        public int? ImageId { get; set; }
        public string Year { get; set; }
        public string Description { get; set; }
        public DateTime? Date { get; set; }
        public string Range { get; set; }
        public string CatCode { get; set; }

        public virtual ICollection<SetImages> SetImages { get; set; }
    }
}
