using System;
using System.Collections.Generic;

namespace iCollect.Entities
{
    public partial class Albums
    {
        public Albums()
        {
            AlbumCatalogs = new HashSet<AlbumCatalogs>();
            UserItems = new HashSet<UserItems>();
        }

        public int AlbumId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string UserId { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public bool? IsActive { get; set; }
        public string JsonRanges { get; set; }
        public string JsonSetTypes { get; set; }

        public virtual ICollection<AlbumCatalogs> AlbumCatalogs { get; set; }
        public virtual ICollection<UserItems> UserItems { get; set; }
    }
}
