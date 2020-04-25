﻿using System;
using System.Collections.Generic;

namespace iCollect.Entities
{
    public partial class Albums
    {
        public int AlbumId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string UserId { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
    }
}
