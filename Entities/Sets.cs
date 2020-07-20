using System;
using System.Collections.Generic;

namespace iCollect.Entities
{
    public partial class Sets
    {
        public Sets()
        {
            Items = new HashSet<Items>();
        }

        public int SetId { get; set; }
        public int? CatalogId { get; set; }
        public int? Year { get; set; }
        public string Description { get; set; }
        public DateTime? Date { get; set; }
        public string Range { get; set; }
        public string CatCode { get; set; }
        public string SetType { get; set; }
        public bool? IsActive { get; set; }
        public string Series { get; set; }

        public virtual Catalog Catalog { get; set; }
        public virtual ICollection<Items> Items { get; set; }
    }
}
