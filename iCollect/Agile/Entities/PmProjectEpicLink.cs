using System;
using System.Collections.Generic;

namespace IMIS.Web.DAL
{
    public partial class PmProjectEpicLink
    {
        public int PmProjectId { get; set; }
        public int PmEpicId { get; set; }

        public virtual PmEpics PmEpic { get; set; }
        public virtual PmProjects PmProject { get; set; }
    }
}
