using System;
using System.Collections.Generic;

namespace IMIS.Web.DAL
{
    public partial class PmProjectFeaturesLink
    {
        public int PmProjectId { get; set; }
        public int PmFeatureId { get; set; }

        public virtual PmFeatures PmFeature { get; set; }
        public virtual PmProjects PmProject { get; set; }
    }
}
